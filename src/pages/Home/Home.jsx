import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import {url} from '../../config'
import Image1 from "../../Assets/img11.png";
import Image2 from "../../Assets/img3.jpg";
import Image7 from "../../Assets/img7.jpeg";
import Image5 from "../../Assets/img12.jpeg";
import "./home.css";
import ShopNowLink from "../../components/ShopNowLink/ShopNowLink";
import FeatureItem from "../../components/FeatureItem/FeatureItem";
import Preloader from "../../components/Preloader/Preloader";

function Home() {

  const [womenProducts, setWomenProducts] = useState([])
  const [menProducts, setMenProducts] = useState([])
  const [childrenProducts, setChildrenProducts] = useState([])
  const [allAccessories, setAllAccessories] = useState([])
  const [loading, setLoading] = useState([])

    useEffect(() => {
      axios.get(`${url}/product/getWomenProducts`).then(res => {
        setWomenProducts(res.data) 
     }).catch(err => console.log(err))
    
     axios.get(`${url}/product/getMenProducts`).then(res => {
        setMenProducts(res.data) 
     }).catch(err => console.log(err))
    
     axios.get(`${url}/product/getAccessories`).then(res => {
        setAllAccessories(res.data) 
      }).catch(err => console.log(err))
    
      axios.get(`${url}/product/getChildrenProducts`).then(res => {
        setChildrenProducts(res.data) 
        setLoading(false)
     }).catch(err => console.log(err))
    
    }, [])
  return loading ? <Preloader/> : (
    <div className="home-div">
      <header className="hero-header-div">
        <div className="hero-header-text-container">
          {/* <img src={Image1} alt="hero-header" className="hero-header-img" /> */}
          <h2 className="hero-heading">
            Find and buy clothes and accessories at the best deals
          </h2>
          <Link to="/shop" className="hero-btn">
            Buy Now
          </Link>
        </div>
      </header>
      {/* End of Hero Header Section    */}

      {/* Begining of Explore our collections Section    */}
      <div>
        <h1 className="home-branding-header">Expolore Our Collections</h1>
        <section className="home-branding">
          <div className="homebranding-inner" id="inner1">
            <img src={Image1} alt="women" id="women-brand" />
            <ShopNowLink title={"Women's"} />
          </div>
          <div className="homebranding-inner" id="inner2">
            <img src={Image7} alt="childeren" id="accessories" />
            <ShopNowLink title={"Children's"} />
          </div>
          <div className="homebranding-inner" id="inner3">
            <img src={Image2} alt="men" id="men-brand" />
            <ShopNowLink title={"Men's"} />
          </div>
          <div className="homebranding-inner" id="inner4">
            <img src={Image5} alt="accessories" id="chinldren-brand" />
            <ShopNowLink title={"Accessories's"} />
          </div>
        </section>
      </div>
      {/* End of Explore our collections Section    */}
      {/* Begining of Feature collections Section    */}
      <section className="feature-section">
        <h1 className="home-branding-header"> Feature Collections</h1>
        <div className="collection-div">
          {
            womenProducts && womenProducts.length > 0 && womenProducts.map((item, index) => {
              if(index >= 3) return null
              return (  <FeatureItem key={`${item._id}-${index}`} itemInfo={item} /> )
            }) }
         </div>

        <div className="collection-div">
          {
            menProducts && menProducts.length > 0 && menProducts.map((item, index) => {
              if(index >= 3) return null
              return (  <FeatureItem key={`${item._id}-${index}`} itemInfo={item} /> )
            }) }

                 </div>
                 <div className="collection-div">
         
          {
            allAccessories && allAccessories.length > 0 && allAccessories.map((item, index) => {
              if(index >= 3) return null
              return (
                         <FeatureItem key={`${item._id}-${index}`} itemInfo={item} /> ) }) } 
                 </div>

           <div className="collection-div">
          {
            childrenProducts && childrenProducts.length > 0 && childrenProducts.map((item, index) => {
              if(index >= 3) return null
              return (<FeatureItem key={`${item._id}-${index}`} itemInfo={item} /> ) })
          }
      
           </div>
       
        {/* <FeatureSeeMoreButton text="See More" /> */}
      </section>
      {/* End of Feature collections Section    */}
    </div>
  );
}

export default Home;
