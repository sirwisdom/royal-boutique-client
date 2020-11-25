import React from "react";
import NumberFormat from "react-number-format";
import "./featureitem.css";
import { useDispatch } from "react-redux";
import {addItemToCart} from '../../redux/actions/cartActions'

function FeatureItem({itemInfo}) {
  const dispatch = useDispatch()
  
  return (
    <div className="featurecollection-single">
      <div className="featurecollection-img-div">
        <img src={itemInfo.images[0]} alt="collection" className="featurecollection-img" />
      </div>
      <div className="featurecollection-text-div">
        <NumberFormat
          value={itemInfo.price}
          displayType={"text"}
          thousandSeparator={true}
          renderText={(value) => (
            <h4 className="feature-amount">&#8358;{value}</h4>
          )}
        />
        <button className="add-to-cart-btn" onClick={() => dispatch(addItemToCart(itemInfo))}>Add To Cart</button>
      </div>
    </div>
  );
}

export default FeatureItem;
