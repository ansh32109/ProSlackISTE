import './App.css';
import Header from './Header'
import Sidebar from './Sidebar'
import Chat from "./Chat";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>

      <Header/>
      <div className='app_body'>
        <Sidebar/>
        <Routes>

        </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;
