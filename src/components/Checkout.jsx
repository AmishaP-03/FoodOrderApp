import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext.jsx";
import {currencyFormatter} from '../utils/formatting.js';
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Checkout() {
    const cartContext = useContext(CartContext);
    const totalPriceToPay = cartContext.items.reduce((total, item) => {
        return total + item.quantity*item.price;
    }, 0);

    const userProgressContext = useContext(UserProgressContext);

    function handleClose() {
        userProgressContext.hideCheckout();
    }

    return <Modal open={userProgressContext.progress === 'checkout'}>
        <form>
            <h2>Checkout</h2>
            <p>Total price: {currencyFormatter.format(totalPriceToPay)}</p>

            <Input label="Full name" type="text" id="full-name" />
            <Input label="Email address" type="email" id="email" />
            <Input label="Delivery address" type="text" id="delivery-address" />

            <div className="control-row">
                <Input label="Pin code" type="text" id="pin-code" />
                <Input label="City" type="text" id="city" />
            </div>

            <div className="modal-actions">
                <Button type="button" textOnly onClick={handleClose}>Close</Button> {/* type = button so that clicking on close button does not submits the form */}
                <Button>Place order</Button>
            </div>
        </form>
    </Modal>;
}