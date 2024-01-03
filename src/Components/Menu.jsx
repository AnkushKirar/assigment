import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faHouse, faStar } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import image from '../assets/heart-regular.svg'

library.add(faHeart, faHouse, faStar);
const Menu = () => {
  const [likedProducts, setLikedProducts] = useState([]);
  const [Data, setData] = useState([]);
  const [updated, setupdated] = useState([]);
  const [Filterprice, setFilterprice] = useState(null);
  const [ratingFilter, setRatingFilter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://fakerapi.it/api/v1/products',
          {
            params: {
              _quantity: 1000,
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
        setupdated(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    let newData = Data;

    if (Filterprice !== null) {
      newData = newData.filter((product) =>  Math.floor(product.net_price*20) <  Filterprice );
    }

    if (ratingFilter !== null) {
      newData = newData.filter((product) =>Math.floor(product.net_price/20+1)  === ratingFilter);
    }
    setLikedProducts(
      newData.map((product, index) => ({ ...product, liked: likedProducts.includes(index) }))
    )

    setupdated(newData);
  }, [Data, Filterprice, ratingFilter]);

  const handleFilterprice = (value) => {
    setFilterprice(value);
  };

  const handleRatingFilter = (value) => {
    setRatingFilter(value);
  };
  const handleLike = (index) => {
    setLikedProducts((prevLikedProducts) => {
      if (prevLikedProducts.includes(index)) {
        return prevLikedProducts.filter((likedIndex) => likedIndex !== index);
      } else {
        return [...prevLikedProducts, index];
      }
    });
  };
  return (
    <>
      <div style={{ backgroundColor: 'white' }}>
      <div className='Super_conatiner'>
    <img src= "https://uploads-ssl.webflow.com/622778f0460ef2a7b46117c1/62277b0ea97763788d756b0b_ZEVI-GG-LogoDesogn%20-Option-2-Black.png" alt="logo"  id='img'/>
    <div className="search_bar_container_main" style={{border: '2px solid black',zIndex:'2'}}>
      <input type="text" className="search_filed" placeholder="Search..."  />
    </div>
    </div>
        <h1>Search Result</h1>
        <div className="Search_result_Container">
          <div className="side_bar">
            <div>
             <div>
              <h3>Brand</h3>
              <label htmlFor="mango">mango</label>
              <input type="checkbox" id="mango" />
              <br />
              <label htmlFor="H&M">H&M</label>
              <input type="checkbox" id="H&M"  />
              </div>
              <div>
              <h3>Price</h3>
              <label htmlFor="L" onClick={()=>handleFilterprice(500)} >Upto 500</label>
              <input type="checkbox" id="L"  />
              <br />
              <label htmlFor="H"  onClick={()=>handleFilterprice(10000)} >500-1000</label>
              <input type="checkbox" id="H"  />
              </div>
            
            <h3>Rating</h3>
            <div className='rating_div'>
              {[...Array(5)].map((_, index) => (
                <label key={index} htmlFor={`rating${index + 1}`}>
                  {[...Array(index + 1)].map((_, starIndex) => (
                    <FontAwesomeIcon key={starIndex} icon={faStar} style={{ color: '#ffc107' }}
                    onClick={() => handleRatingFilter(index + 1)}
                    />
                  ))}
                  <input type="checkbox" id={`rating${index + 1}`} />
                </label>
              ))}
              </div>
            </div>
          </div>
          <div className="Search_item_Container">
            {updated.map((product, index) => (
              <div key={index} className="card" >
                <div style={{ backgroundImage: `url(${product.image})` }} className="img_search">
                  <img src={product.image} alt="image" />
                  {!product.liked ? (
                    <motion.img whileFocus={{color:"red"}}
                      src={image}
                      className={`heart_icon`}
                      onClick={() => handleLike(index)}
                      alt="Heart Icon"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faHeart}
                      style={{ color: '#ff0000' }}
                      className={`heart_icon`}
                      onClick={() => handleLike(index)}
                    />
                  )}
                  {/* <motion.p initial = {{color:"black"}}
                  whileTap={{color:"red"}} 
                  ><FontAwesomeIcon
                      icon={faHeart}
                      className={`heart_icon`}
                    /></motion.p> */}

                  <motion.p  initial={{opacity:0}}  whileHover={{opacity:1}}className="true_View_product">View Product</motion.p>
                </div>
                <p className="Item_name">{product.name}</p>
              
                <div className="Price_tag">
                  <p className="Old_Price">{`Rs. ${Math.floor((product.price)*15)}`}</p>
                  <p className="New_Price">{`Rs. ${Math.floor((product.net_price)*8)}`}</p>
                </div>
                <div className="Rating">
                  <p>
                    {
                    [...Array(Math.floor(product.net_price/20 +1))].map((_, starIndex) => (
                      <FontAwesomeIcon key={starIndex} icon={faStar} style={{ color: '#ffc107' }} />
                    ))}
                  </p>
                  <p>{product.rating} (20)</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Menu;