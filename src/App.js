import React from 'react';
import './sass/App.css';
import Search from './Components/Search.jsx';
import Menu from './Components/Menu.jsx';
function App() {
  return (
    
      <>
        <div className="Main_div">
          <div style={{ height: '100vh' }}>
            <Search></Search>
          </div>
          <Menu></Menu>
          
            
        </div>
      </>
 
  );
}

export default App;
