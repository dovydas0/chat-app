const express = require('express')
const cors = require('cors')
const multer = require('multer')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = express()
const socket = require('socket.io')
const Users = require('./models/userModel')
const Messages = require('./models/MessagesModel')
require('dotenv').config()

mongoose.set('strictQuery', false)
const PORT = 8000
let socketUsers = []

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('profile-images'))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'profile-images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage }).single('file')

// DB connection
try {
    mongoose.connect(process.env.REACT_APP_MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((res) => {
        console.log("Connected to MongoDB");
    })
    .catch (err => {
        console.log(err);
    })
} catch (err) {
    console.log(err);
}

// Routing
app.get("/", (req, res) => {
    res.end('')
})

app.get("/api/all-users", async (req, res) => {
    const users = await Users.find().select([
        "username",
        "avatar_img"
    ])

    return res.json({ users })
})

app.get('/profile-images/:file', (req, res) => {
    res.sendFile(`${__dirname}/profile-images/${req.params.file}`)
})

app.post("/api/all-friends", async (req, res) => {
    const { loggedUser } = req.body

    if (loggedUser) {
        const friends = await Users.find({ _id: loggedUser._id }).select([
            "friends"
        ])
        
        return res.json({ status: true, friends })
    }
    
    return res.json({ status: false })
})

app.post("/api/get-chat", async (req, res) => {
    const { senderID, receiverID } = req.body

    const sentMess = await Messages.find({ senderID }).where({ receiverID })
    const receivedMess = await Messages.find({ senderID: receiverID }).where({ receiverID: senderID })

    const chat = [...receivedMess, ...sentMess]

    chat.sort((a, b) => {
        return new Date(a.updatedAt) - new Date(b.updatedAt)
    })

    if (!chat) {
        res.json({ status: false })
    }
    
    return res.json({ status: true, data: chat })
})

app.post("/api/upload-img", async (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }

        return res.status(200).send(req.file)
    })
})

app.post("/api/update-img", async (req, res) => {
    const { loggedUser, fileName } = req.body
    
    const user = await Users.findOne({ _id: loggedUser._id })
    .updateOne({
        avatar_img: fileName
    })

    const friends = await Users.find({ 'friends._id': loggedUser._id })
    .updateMany({ $set: {
        'friends.$.avatar_img': fileName
    }})

    if (!friends) {
        return res.json({ status: false })
    }

    if (!user) {
        return res.json({ status: false })
    }

    return res.json({ status: true })
})

app.post("/api/send-mess", async (req, res) => {
    const { message, senderID, receiverID } = req.body

    const mess = await Messages.create({
        message,
        senderID,
        receiverID
    })

    return res.json({ status: true, message: mess })
})

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body

    const user = await Users.findOne({ username })
    if (!user) {
        return res.json({ status: false })
    } 

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.json({status: false})
    }
    user.password = undefined

    return res.json({ status: true, user })
})

app.post("/api/add-friend", async (req, res) => {
    const { friend, loggedUser } = req.body
    const friendUser = await Users.findOne({ _id: friend._id })
    .updateOne({ $addToSet: {
        friends: {
            username: loggedUser.username,
            avatar_img: loggedUser.avatar_img,
            _id: loggedUser._id
        }
    }})
    const logUser = await Users.findOne({ _id: loggedUser._id })
    .updateOne({ $addToSet: {
        friends: {
            username: friend.username,
            avatar_img: friend.avatar_img,
            _id: friend._id
        }
    }})

    
    if (friendUser && logUser) {
        return res.json({ status: true })
    }

    return res.json({ status: false })
})

app.post("/api/add-user", async (req, res) => {
    const { username, password} = req.body

    const usernameCheck = await Users.findOne({ username })
    if (usernameCheck) {
        return res.json({ status: false })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await Users.create({
        username,
        password: hashedPassword,
    })
    delete user.password

    return res.json({ status: true })
})

// Server listening
const server = app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})

// Sockets
const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

io.on('connect', socket => {        
    socket.on('add-user', id => {
        socketUsers.push({socketID: socket.id, userID: id})
        io.emit('active-users', socketUsers)
    })

    
    socket.on('disconnect', () => {
        socketUsers = socketUsers.filter(user => user.socketID !== socket.id)
        io.emit('active-users', socketUsers)
    })

    socket.on('add-friend-request', friend => {
        const receivingSocket = socketUsers.find(user => user.userID === friend._id)

        if (receivingSocket) {
            socket.to(receivingSocket.socketID).emit('add-friend-response')
        }
    })

    socket.on('send-msg', (data) => {
        const receivingSocket = socketUsers.find(user => user.userID === data.receiverID)
        
        if (receivingSocket) {
            socket.to(receivingSocket.socketID).emit('receive-msg', data)
        }
    })
})