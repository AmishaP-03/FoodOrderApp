import logoImg from '../assets/logo.jpg';

export default function Header() {
    return (
        <header id="main-header">
            <div id="title">
                <img id="img" src={logoImg} alt="Food order app logo"></img>
                <h1>La Nourriture</h1>
            </div>
            <nav>
                <button id="button">Cart {0}</button>
            </nav>
        </header>
    )
}