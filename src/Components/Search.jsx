import React ,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Search = () => {
  const [view ,setView] = useState(false)
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://fakerapi.it/api/v1/products',
          {
            params: {
              _quantity: 5,
              _price_min: 10,
              _price_max: 100,
              _taxes: 10,
              _categories_type: 'word',
              _categories: 'Cloth',
              _locale: 'en_US', 
            },
          }
        );
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (<>
    <div className='Super_conatiner'>
    <img src= "https://uploads-ssl.webflow.com/622778f0460ef2a7b46117c1/62277b0ea97763788d756b0b_ZEVI-GG-LogoDesogn%20-Option-2-Black.png" alt="logo"  id='img'/>
    <div className="search_bar_container">
      <input type="text" className="search_filed" placeholder="Search..."   onFocus={()=>setView(true)}  onBlur={()=>setView(false)}/>
     <Link to = '/Menu'><FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" /></Link>
    </div>
    </div>
  {view?(<>
  <div className='suggest_container'>
    <div className='suggest_Menu_div'>
   {Data.map((product,index)=>{
    return (
      <>            
                    <div key={index} className="card" >
                  <div style={{ backgroundImage: `url(${product.image})` }} className="img_search">
                  <img src={product.image} alt="image" />
                </div>
                </div>
      </>
    )
   })} 
   </div>
   <h3> Related Products</h3>
   {Data.map((product,index)=>{
    return (
      <>            
        <p id= {index}>{product.name}</p>
      </>
    )
   })} 
   </div>
  
 </> ):null}
  </>)

}

export default Search;

