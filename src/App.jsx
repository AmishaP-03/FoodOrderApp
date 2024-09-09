import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import Cart from './components/Cart.jsx';
import { CartContextProvider } from './store/CartContext.jsx';
import { UserProgressContextProvider } from './store/UserProgressContext.jsx';

function App() {
  return (
    <UserProgressContextProvider>
      {/* All the component and their child components wrapped inside CartContextProvider can now access the state management logic inside CartContextProvider */}
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
