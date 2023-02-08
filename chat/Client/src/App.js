import { React } from 'react'
import Chat from './components/Chat'
import Login from './components/Login'
import { useSelector } from 'react-redux'
import './App.css'

function App() {
  const isLoggedIn = useSelector(state => state.auth.status)

  return (
    <div className="flex h-screen bg-gradient-to-br from-sky-900 to-slate-900">
      { !isLoggedIn && <Login /> }
      { isLoggedIn && <Chat /> }
    </div>
  );
}

export default App;
