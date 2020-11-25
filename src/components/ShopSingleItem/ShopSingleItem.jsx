import React from "react";
import NumberFormat from "react-number-format";
import "./shopsingleitem.css";
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux'
import {addItemToCart} from '../../redux/actions/cartActions'

function ShopSingleItem({product}) {
  const dispacth = useDispatch()
  

  return (
    <div className="shopsingleitem-single">
      <div className="shopsingleitem-img-div">
        <Link to={`/shop/${product._id}`}>
          <img src={product.images[0]} alt="collection" className="shopsingleitem-img" />{" "}
        </Link>
      </div>
      <div className="shopsingleitem-text-div">
        <h4 className="shopsingleitem-item-name">{product.productName}</h4>
        <div className="itemsize-div">
          <NumberFormat
            value={product.price}
            displayType={"text"}
            thousandSeparator={true}
            renderText={(value) => (
              <h4 className="shopsingleitem-feature-amount">&#8358;{value}</h4>
            )}
          />

          <h4>
            <Link className="iteminfo-text" to={`/shop/${product._id}`}>
              <i className="fas fa-info-circle"></i>{" "}
            </Link>
          </h4>
        </div>
        <button className="shopsingleitem-add-to-cart-btn" onClick={() => dispacth(addItemToCart(product))}>Add To Cart</button>
      </div>
    </div>
  );
}

export default ShopSingleItem;
