import React from 'react'
import { useState } from "react";
import { ContextAutor } from "./ContextAutor";

export const ProviderAutor = ({ children }) => {
    const [autor, setAutor] = useState("Alexia")
    const [coins, setCoins] = useState([]);
    const [liked, setLiked] = useState([]);

    const handleClick = () => {
    setLiked(!liked);
  };

    const handleLike = (coinId) => {
        setLiked((prevLiked) => {
            if (prevLiked.includes(coinId)) {
                return prevLiked.filter((id) => id !== coinId);
            } else {
                return [...prevLiked, coinId];
            }
        });
    };

    return (
        <ContextAutor.Provider value={{ autor, setAutor, coins, setCoins, liked, setLiked, handleLike }}>
            {children}
        </ContextAutor.Provider>
    )
}
