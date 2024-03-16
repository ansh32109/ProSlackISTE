import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './App.css'; // Assuming this file contains your global styles
import { Switch } from 'react-router-dom';
import Chat from "./Chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import { useStateValue } from './StateProvider';

// Import your background image
import backgroundImage from './bg2.jpg';

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
    <div className="app" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('                        ');
  
  const txt1 = "W elcome to Proslack- Revolutionize Your Collaboration🎉!";
  const txt2 = "Start collaborating effortlessly with your team. Dive into channels, share ideas, and stay organized.Need help? We're here for you. Let's make teamwork simpler and more enjoyable together!";
  
  let i = 0;
  const speed = 100;
  let timeoutId; // Define timeoutId variable

  useEffect(() => {
    const typingEffect = () => {
      if (i <= txt1.length) {
        setText1(prevText => prevText + txt1.charAt(i));
        i++;
        timeoutId = setTimeout(typingEffect, speed); // Assign timeoutId here
      } else {
        // Typing effect for text1 is complete, display text2
        displayText2();
      }
    };
    typingEffect();

    // Clean up the effect
    return () => clearTimeout(timeoutId);
  }, []);

  const displayText2 = () => {
    setText2(txt2);
  };

  return (
    <div className="welcome-text">
      <div>
        <h1 className="welcome-heading">{text1}</h1>
      </div>
      <div classname="text2-box">
        <p>{text2}</p>
      </div>
    </div>
  );
};

export default App;
