import React, {useState, createContext } from 'react';

const DataP = createContext(null);

export const Datapp = ({children}) => {
    //////all of the stuff I need for this file to func
    return(<>
    <FeatureContext.Provider value={{}}>{children}</FeatureContext.Provider>
        </>)
}