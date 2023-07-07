import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { PageContextProvider } from "../PageContext";

const Main = ({children}) => {
    const [isJson, setIsJson] = useState(false);

    const values = {
        isJson,
        setIsJson
    };

    return (
        <>
            <Header/>

            <PageContextProvider>
                {children}
            </PageContextProvider>

            <Footer/>
        </>
     );
}
 
export default Main;