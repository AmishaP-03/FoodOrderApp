import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext.jsx";
import {currencyFormatter} from '../utils/formatting.js';
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
};

export default function Checkout() {
    const {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    } = useHttp('http://localhost:3000/orders', requestConfig);

    const cartContext = useContext(CartContext);
    const totalPriceToPay = cartContext.items.reduce((total, item) => {
        return total + item.quantity*item.price;
    }, 0);

    const userProgressContext = useContext(UserProgressContext);

    function handleClose() {
        userProgressContext.hideCheckout();
    }

    function handleFinish() {
        userProgressContext.hideCheckout();
        cartContext.clearCart();
        clearData();
    }

    function handleSubmit(event) {
        event.preventDefault(); 

        //event.target -> form data managed by browser
        const formData = new FormData(event.target);
        const formDataInJSObjectFormat = Object.fromEntries(formData.entries()); // alt -> const name = formData.get("name") ... same for each input

        sendRequest(JSON.stringify({
            order: {
                items: cartContext.items,
                customer: formDataInJSObjectFormat
            }
        }));

        // fetch('http://localhost:3000/orders', {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         order: {
        //             items: cartContext.items,
        //             customer: formDataInJSObjectFormat
        //         }
        //     })
        // })
    }

    if (data && !error) {
        return <Modal open={userProgressContext.progress === 'checkout'} onClose={handleFinish}>
            <h2>Success</h2>
            <p>Your order was placed successfully!</p>
            <p>We will get back to your with more details via email within the next few minutes.</p>
            <div className="modal-actions">
                <Button textOnly onClick={handleFinish}>Okay</Button>
            </div>
        </Modal>;
    }

    return <Modal open={userProgressContext.progress === 'checkout'} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total price: {currencyFormatter.format(totalPriceToPay)}</p>

            <Input label="Full name" type="text" id="name" />
            <Input label="Email address" type="email" id="email" />
            <Input label="Street" type="text" id="street" />

            <div className="control-row">
                <Input label="Postal code" type="text" id="postal-code" /> {/** Id should be same as the string defined on backend */}
                <Input label="City" type="text" id="city" />
            </div>

            {error && <Error title="Failed to place order" message={error} />}

            {!isLoading && <div className="modal-actions">
                <Button type="button" textOnly onClick={handleClose}>Close</Button> {/* type = button so that clicking on close button does not submits the form */}
                <Button>Place order</Button>
            </div>}
        </form>
    </Modal>;
}