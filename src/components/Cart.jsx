import { useContext } from "react";
import {currencyFormatter} from '../utils/formatting.js';
import Modal from "./Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from '../store/UserProgressContext.jsx';
import Button from "./Button.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
    const cartContext = useContext(CartContext);
    const totalPrice = cartContext.items.reduce((total, item) => {
        return total + item.quantity*item.price;
    }, 0);

    const userProgressContext = useContext(UserProgressContext);

    function handleCloseCart() {
        userProgressContext.hideCart();
    }

    function handleGoToCheckout() {
        userProgressContext.showCheckout();
    }

    return <Modal className="cart" open={userProgressContext.progress === 'cart'} onClose={userProgressContext.progress === 'cart' ? handleCloseCart : null}>
        <h2>Your Cart</h2>
        <ul>
            {cartContext.items.map((item) => <CartItem key={item.id} item={item}></CartItem>)}
        </ul>
        {cartContext.items.length > 0 ? <p className="cart-total">{currencyFormatter.format(totalPrice)}</p> : <p>Cart empty!</p>}

        <p className="modal-actions">
            <Button textOnly onClick={handleCloseCart}>Close</Button>
            {cartContext.items.length > 0 && (<Button onClick={handleGoToCheckout}>Go to checkout</Button>)}
        </p>
    </Modal>;
}