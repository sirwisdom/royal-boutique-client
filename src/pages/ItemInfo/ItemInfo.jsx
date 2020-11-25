import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import NumberFormat from "react-number-format";
import "./iteminfo.css";
import axios from "axios";
import {url} from '../../config'
import  "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import { addItemToCart} from '../../redux/actions/cartActions'
import Preloader from "../../components/Preloader/Preloader";

const ItemInfo  = (props) => {

  const {match} = props
  const {params} = match
 const [loading, setLoading] = useState(true)
 const [itemInfo, setItemInfo] = useState({})
 const [images, setImages] = useState([])

  const dispatch = useDispatch()
 useEffect(() => {
  
  axios.get(`${url}/product/getASingleProduct/${params.itemId}`).then((res) => {
    let tempImages = []
    let imgArray = res.data.images
    imgArray.forEach(element => {
     tempImages.push({
     original: element
})
});
setItemInfo(res.data)
setImages(tempImages)
setLoading(false)
      }).catch(err => console.log(err))
 
 }, [params])

    const inchesToCentimeter =(value) => Math.floor(value * 2.54)
  
    // const centimeterToInhes =(value) => value / 2.54
    return loading ? <Preloader/> : (
      <div className="iteminfo-container">
        {/* <h4>Item Info</h4> */}
        <section className="iteminfo-section">
          <div className="item-img-div">
           <ImageGallery items={images} originalClass={"item-img"} showThumbnails={false}/> 
                  </div>
          <div className="iteminfo-text-div">
            <div className="iteminfo-text-div-inner">
              <h2 className="item-info-name">{itemInfo.productName}</h2>
              <NumberFormat
                value={25000}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => (
                  <h2 className="iteminfo-amount">&#8358;{value}</h2>
                )}
              />
              <br />
             {itemInfo.brand? <h4 className="iteminfo-size">
                <span className="size-inner">Brand:</span> {itemInfo.brand}
             </h4> : null}
             {itemInfo.bust? <h4 className="iteminfo-size">
                <span className="size-inner">Bust/Chest:</span> <span className="size-measurement">
                {itemInfo.bust}in or {inchesToCentimeter(itemInfo.bust)}cm
                </span>
             </h4> : null}
             {itemInfo.sleeveLength? <h4 className="iteminfo-size">
                <span className="size-inner">Length of Sleeve:</span> <span className="size-measurement">
                {itemInfo.sleeveLength}in or {inchesToCentimeter(itemInfo.sleeveLength)}cm
                </span>
             </h4> : null}
             {itemInfo.shoulder? <h4 className="iteminfo-size">
                <span className="size-inner">Length of Shoulder:</span> <span className="size-measurement">
                {itemInfo.shoulder}in or {inchesToCentimeter(itemInfo.shoulder)}cm
                </span>
             </h4> : null}
             {itemInfo.waist? <h4 className="iteminfo-size">
                <span className="size-inner">Length of Waist:</span> <span className="size-measurement">
                {itemInfo.waist}in or {inchesToCentimeter(itemInfo.waist)}cm
                </span>
             </h4> : null}
            
             {itemInfo.hipSize? <h4 className="iteminfo-size">
                <span className="size-inner">Length of Hip:</span> <span className="size-measurement">
                {itemInfo.hipSize}in or {inchesToCentimeter(itemInfo.hipSize)}cm
                </span>
             </h4> : null}
            
             {itemInfo.length? <h4 className="iteminfo-size">
                <span className="size-inner">Length:</span> <span className="size-measurement">
                {itemInfo.length}in or {inchesToCentimeter(itemInfo.length)}cm
                </span>
             </h4> : null}
            
              <br />
              <button className="iteminfo-add-to-cart-btn" onClick={() =>  dispatch(addItemToCart(itemInfo))} >Add To Cart</button>
            </div>
          </div>
        </section>
      </div>
    );
  }

export default ItemInfo;
