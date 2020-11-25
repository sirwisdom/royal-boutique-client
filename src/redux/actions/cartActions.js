import {store} from 'react-notifications-component'

export const addItemToCart = function(item){
return (dispatch) => {
    let existingCart =[] 
if(localStorage.getItem('ROYAL_BOUTIQUE_CART') !== null){
existingCart = JSON.parse(localStorage.getItem("ROYAL_BOUTIQUE_CART"))}
existingCart.push(item)
localStorage.setItem("ROYAL_BOUTIQUE_CART", JSON.stringify(existingCart))
store.addNotification({
    message: `${item.productName} added to cart successfully`,
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
dispatch({
    type:"ADD_ITEM",
    payload:existingCart
})
}
}

export const removeItemFromCart = function(itemIndex){
 return(dispatch) =>{
    let existingCart = []
    let newCart = []
    existingCart = JSON.parse(localStorage.getItem("ROYAL_BOUTIQUE_CART"))
    existingCart.map((cartObj, cartId) => (cartId !== itemIndex) ?  newCart.push(cartObj) : null)

localStorage.setItem("ROYAL_BOUTIQUE_CART", JSON.stringify(newCart))
dispatch({
    type:"DELETE_ITEM",
    payload: newCart
})
 }
}

export const clearCart = function(){
    
 return (dispatch) => {
   const  newCart = []
    localStorage.setItem("ROYAL_BOUTIQUE_CART", newCart)
    dispatch({
        type:"CLEAR_CART",
        payload:newCart
    })

 }
}

export const getCartItems = function(){
    return (dispatch) =>{
        let existingCart = []
        if(localStorage.getItem("ROYAL_BOUTIQUE_CART") !== null){
            existingCart = JSON.parse(localStorage.getItem("ROYAL_BOUTIQUE_CART"))
            dispatch({
                type:"GET_CART_ITEMS",
                payload: existingCart
            })
        }
        else dispatch({
            type:"GET_CART_ITEMS",
            payload: []
        })
    }
}