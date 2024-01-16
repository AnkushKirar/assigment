import React from 'react';
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import './sass/App.css';
import Search from './Components/Search.jsx';
import Menu from './Components/Menu.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faHouse, faStar } from '@fortawesome/free-solid-svg-icons';

library.add(faHeart, faHouse, faStar);


function App() {
  return (
    
      <>
        <div className="Main_div">
          <Router>
            <Link to = '/'><FontAwesomeIcon icon = {faHouse} style={{marginLeft:"1rem",marginTop:".3rem",color:"black",display:"inline"}}/></Link>
            <Routes>
              <Route path = '/' element = {<Search/>}></Route>
              <Route path = '/Menu' element = {<Menu/>}></Route>
            </Routes>
          </Router>
          
          
            
        </div>
      </>
 
  );
}

export default App;
