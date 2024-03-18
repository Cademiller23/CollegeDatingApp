import React from 'react';
const pickupLines = ["Your first suggested pickup line", "Another cool line"];
const suggestPickupLine = () => {
    const randomIndex = Math.floor(Math.random() * pickupLines.length);
    setInputText(pickupLines[randomIndex]);
};