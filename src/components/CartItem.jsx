import { useContext } from 'react';
import {currencyFormatter} from '../utils/formatting.js';
import CartContext from '../store/CartContext.jsx';

export default function CartItem({item}) {
    const cartContext = useContext(CartContext);

    function handleAdd() {
        cartContext.addItem(item);
    }

    function handleRemove() {
        cartContext.removeItem(item.id);
    }

    return (
        <li className="cart-item">
            <p>{item.name} - {item.quantity} X {currencyFormatter.format(item.price)}</p>
            <p className="cart-item-actions">
                <button onClick={handleAdd}>+</button>
                <button>{item.quantity}</button>
                <button onClick={handleRemove}>-</button>
            </p>

        </li>
    );
}