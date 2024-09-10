import { createContext, useReducer } from "react";

// To enable accessing and updating state data easily from across multiple components. Better alternative to state lifting.

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
});

// Return an updated state depending upon the action input
function cartReducer(state, action) {
    const cartItems = [...state.items];

    if (action.type === 'ADD_ITEM') {
        // The following is not a good practice for 2 main reasons:
        // 1. We will be updating the state at this very instant, even before cartReducer function is done executing. What if there is subsequent logic
        // dependent on the old value of state?
        // 2. We don't always want to add an item to the array. What if there is already an item present and upon adding it to cart again, we just want to increase its count?

        // state.items.push(action.items)

        const existingCartItemId = cartItems.findIndex((item) => item.id === action.item.id);
        const existingCartItem = cartItems[existingCartItemId];

        if (existingCartItemId > -1) {
            cartItems[existingCartItemId] = {
                ...existingCartItem,
                quantity: existingCartItem.quantity+1
            }
        } else {
            cartItems.push({
                ...action.item,
                quantity: 1
            });
        }

        return {...state, items: cartItems};
    } else if (action.type === 'REMOVE_ITEM') {
        const existingCartItemId = cartItems.findIndex((item) => item.id === action.id);
        const existingCartItem = cartItems[existingCartItemId];
        if (existingCartItem.quantity === 1) {
            cartItems.splice(existingCartItemId, 1);
        } else {
            cartItems[existingCartItemId] = {
                ...existingCartItem,
                quantity: existingCartItem.quantity-1
            }
        }

        return {...state, items: cartItems};
    } else if (action.type === 'CLEAR_CART') {
        return {...state, items: []};
    }
            
    return state;
}

// Wrap around our components to make CartContext available to them + they will do the actual state management
export function CartContextProvider({children}) {
    /**
     * useReducer -> helps in managing complex states in a more simplified manner as compared to useState +
     * makes it easier to move the state management logic outside of the component function
     */
    const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []}); //Pass the initial value of state to it

    function addItem(item) {
        dispatchCartAction({type: 'ADD_ITEM', item});
    }

    function removeItem(id) {
        dispatchCartAction({type: 'REMOVE_ITEM', id});
    }

    function clearCart() {
        dispatchCartAction({type: 'CLEAR_CART'});
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    };

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}

export default CartContext;