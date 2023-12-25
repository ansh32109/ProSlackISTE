import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import './App.css';
import { Switch } from 'react-router-dom';
import Chat from "./Chat";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
  // const[user,setUser]= useState(null);
  const[{user},dispatch]= useStateValue();
  return (
    <div className="app">
      <Router>
        {!user ? (
          <h1><Login/></h1>
        ) : (
          <>
            <Header />
            <div className='app_body'>
              <Sidebar />
              <Routes>
                <Route path="/room/:roomId" element={<Chat />} />
                <Route path="/" element={<h1>Welcome</h1>} />
              </Routes>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}
export default App;
