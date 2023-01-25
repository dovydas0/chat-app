import { React } from 'react'
import Chat from './components/Chat'
import Auth from './components/Auth'
import { useSelector } from 'react-redux'
import './App.css'

function App() {
  const isLoggedIn = useSelector(state => state.auth.status)
  const loggedUser = useSelector(state => state.auth.user)

  return (
    <div className="flex h-screen bg-gradient-to-br from-sky-900 to-slate-900">
      { !isLoggedIn && <Auth /> }
      { isLoggedIn && <Chat loggedUser={loggedUser} /> }
    </div>
  );
}

export default App;
