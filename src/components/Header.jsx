import logoImg from '../assets/logo.jpg';
import Button from './Button.jsx';

export default function Header() {
    return (
        <header id="main-header">
            <div id="title">
                <img id="img" src={logoImg} alt="Food order app logo"></img>
                <h1>La Nourriture</h1>
            </div>
            <nav>
                {/* Just writting the name of a boolean prop will set its value to true in child */}
                <Button textOnly>Cart {0}</Button>
            </nav>
        </header>
    )
}