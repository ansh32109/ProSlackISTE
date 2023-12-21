import './App.css';
import Header from './Header'
import Sidebar from './Sidebar'

function App() {
  return (
    <div className="App">
      {/* Header */}
      <Header/>
      <div className='app_body'>
        <Sidebar/>
        {/* Sidebar */}
        {/* React-Router -> Chat screen */}
      </div>
    </div>
  );
}

export default App;
