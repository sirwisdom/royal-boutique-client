import React, { useState, useEffect } from "react";
import { store } from "react-notifications-component";
import NumberFormat from "react-number-format";
import "./cart.css";
// import Preloader from "../../components/Preloader/Preloader";
import { useSelector, useDispatch } from "react-redux";
import {removeItemFromCart} from '../../redux/actions/cartActions'
import EmptyCart from "../../components/EmptyCart/EmptyCart";
import { Link } from "react-router-dom";

function Cart() {

  // const [selected, setSelected] = useState({});
  const [isSubmiting, setIsSubmiting] = useState(false);
 
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch()
 let totalPrice = 0
 
  const cartItems = useSelector(state => state.cartReducer.cartItems)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [totalPrice]);

  cartItems.map(item => totalPrice = item.price + totalPrice)

  const handleDelete = (cartItem, itemIndex) => {
dispatch(removeItemFromCart(itemIndex))
      store.addNotification({
        message: `${cartItem.productName} removed successfully`,
        type: "success",
        insert: "top",
        container: "top-center",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 4000,
          onScreen: true,
        },
      });
  };

  return (
    <div className="cart-wrapper">
      {isDeleting ? (
        <div className="approve-modal">
          <div className="approve-modal-inner">
            <p>Do you wish to remove this item from your cart</p>
            <div className="approve-btn-div">
              {isSubmiting ? (
                <button className="continue" disabled>
                  Deleting
                </button>
              ) : (
                <button className="continue" onClick={() => handleDelete()}>
                  Continue
                </button>
              )}
              <button className="cancel" onClick={() => setIsDeleting(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
      { cartItems.length !== 0 ?
      <div>
        <h2 className="cart-heading">Your Cart</h2>
        <div className="cart-row">
          <table className="cart-table">
            <thead className="cart-table-head">
              <tr className="cart-table-head-row">
                <th>Name of Item</th>
                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  Image of Item
                </th>
                <th>Price of Item</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="cart-table-body">
            {
              cartItems.map((item, index) => {
                return(
                  <tr className="cart-body-tr" key={`${item._id}-${index}`}>
                  <td>{item.productName}</td>
                  <td
                    style={{
                      overflow: "hidden",
                      height: "26px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
             <Link to={`/shop/${item._id}`}>
             <img src={item.images[0]} alt="cart item" className="cart-img" />
             </Link>
                  </td>
                  <td>
                    <NumberFormat
                      value={item.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      renderText={(value) => (
                        <h4 className="shopsingleitem-feature-amount">
                          &#8358;{value}
                        </h4>
                      )}
                    />
                  </td>
                  <td>
                    <button className="cart-delete-btn" onClick={() => {handleDelete(item, index)}} >Delete</button>
                  </td>
                </tr>
                )
              })
            }
           
            </tbody>
          </table>
          <br/>
          <table className="cart-table-price">
        <thead className="total-thead">
        <tr className="cart-price-row">
              <td>Total Price</td>
              <td>    <NumberFormat
                      value={totalPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                      renderText={(value) => (
                        <h4 className="cart-total-amount">
                          &#8358;{value}
                        </h4>
                      )}
                    /></td>
            </tr>
        </thead>
          </table>
        </div>{" "}
        <br />
      </div> : <EmptyCart/>}
    </div>
  );
}

export default Cart;
