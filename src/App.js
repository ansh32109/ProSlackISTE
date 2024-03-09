import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './App.css';
import { Switch } from 'react-router-dom';
import Chat from "./Chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Set a timeout for 900 milliseconds (0.9 seconds)
    const timeoutId = setTimeout(() => {
      setShowWelcome(true);
    }, 900);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <h1><Login /></h1>
        ) : (
          <>
            <Header />
            <div className='app_body'>
              <Sidebar />
              <Routes>
                <Route path="/room/:roomId" element={<Chat />} />
                <Route path="/" element={showWelcome ? <WelcomeText /> : null} />
              </Routes>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

const WelcomeText = () => {
  const [text, setText] = useState('');
  const txt = "Start collaborating effortlessly with your team. Dive into channels, share ideas, and stay organized. Need help? We're here for you. Let's make teamwork simpler and more enjoyable together!";
  let i = 0;
  const speed = 100;
  let timeoutId; // Define timeoutId variable

  useEffect(() => {
    const typingEffect = () => {
      if (i < txt.length) {
        setText(prevText => prevText + txt.charAt(i));
        i++;
        timeoutId = setTimeout(typingEffect, speed); // Assign timeoutId here
      }
    };
    typingEffect();

    // Clean up the effect
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="welcome-text">
      <div>
        <h1>Welcome to Proslack- Revolutionize Your Collaboration🎉!</h1>
      </div>
      <div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default App;