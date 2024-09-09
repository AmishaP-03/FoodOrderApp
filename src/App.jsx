import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import { CartContextProvider } from './store/CartContext.jsx';

function App() {
  return (
    // All the component and their child components wrapped inside CartContextProvider can now access the state management logic inside CartContextProvider
    <CartContextProvider>
      <Header />
      <Meals />
    </CartContextProvider>
  );
}

export default App;
