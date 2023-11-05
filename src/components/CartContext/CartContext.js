// CartContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItemCount, setCartItemCount] = useState(0); 

    const checkCart = useCallback(async () => {
        try { 
            const response = await axios.get("https://uppercase-app-back-efd9a0ca1970.herokuapp.com/basket", { withCredentials: true,});
            const itemsCount = response.data && response.data.cartItems ? response.data.cartItems.length : 0;
            setCartItemCount(itemsCount); 
        } 
        catch (error) { console.error("Erreur lors de la récupération du panier:", error);
            setCartItemCount(0); 
        }
    }, []);

    useEffect(() => {
        checkCart();
    }, [checkCart]);

    return (
        <CartContext.Provider value={{ cartItemCount, checkCart }}>
            {children}
        </CartContext.Provider>
    );
};