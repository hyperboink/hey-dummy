import React, { useState, createContext } from 'react';

const PageContext = createContext({});

const PageContextProvider = (props) => {
    const [isJson, setIsJson] = useState(false);

    const values = {
        isJson,
        setIsJson,
        woo: () => {
            console.log('hehehehehhehee');
        }
    }

    return (
        <PageContext.Provider value={values}>
            {props.children}
        </PageContext.Provider>
    );
}

export { PageContext, PageContextProvider };