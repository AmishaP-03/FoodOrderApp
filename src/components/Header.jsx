import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './Button.jsx';
import CartContext from '../store/CartContext.jsx';

export default function Header() {
    const cartContext = useContext(CartContext);
    const totalNumberOfItemsInCart = cartContext.items.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    return (
        <header id="main-header">
            <div id="title">
                <img id="img" src={logoImg} alt="Food order app logo"></img>
                <h1>La Nourriture</h1>
            </div>
            <nav>
                {/* Just writting the name of a boolean prop will set its value to true in child */}
                <Button textOnly>Cart ({totalNumberOfItemsInCart})</Button>
            </nav>
        </header>
    )
}