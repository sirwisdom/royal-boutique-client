import React, {useEffect, useState} from "react";
import axios from 'axios'
import "./shop.css";
import ShopSingleItem from "../../components/ShopSingleItem/ShopSingleItem";
import {url} from '../../config'
import Preloader from "../../components/Preloader/Preloader";

function Shop() {
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios.get(`${url}/product/getAllProducts`).then(res => {
      setLoading(false)
      setAllProducts(res.data)

    }).catch(err => console.log(err))

  }, [])

  return  loading ? <Preloader/> : (
    <div className="shop-container">
      <div className="shop-form-div">
        <div className="shop-form-div-inner">
          <label htmlFor="itemName" className='shop-form-label'>Search Product</label>
          <input
            type="text"
            name="itemName"
            id="itemName"
            placeholder="Search for an item"
          />
        </div>
        <div className="shop-form-div-inner">
          <label htmlFor="category" className='shop-form-label'>Category</label>
          <select className="category-select" id="category" name="category">
            <option>Select</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="accesories">Accesories</option>
            {/* <option value="hats">Hats</option> */}
            <option value="foot wears">Foot Wears</option>
          </select>
        </div>
      </div>
      <section className="shop-items-section">
     {
       allProducts.map((product, index) => {
      return  <ShopSingleItem product={product} key={index} />
      
       })
     }
      </section>
    </div>
  );
}

export default Shop;
