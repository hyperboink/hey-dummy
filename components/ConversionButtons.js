import { useContext } from "react";
import { PageContext } from "./PageContext";

const ConversionButtons = () => {
    const { isJson, setIsJson, woo} = useContext(PageContext);

    const convertToDefault = () => {
        setIsJson(false);
    }

    const convertToJson = () => {
        setIsJson(true);
        woo()
    }

    return ( 
        <div className="display-type">
            <button className={`default-btn${!isJson ? ' active' : ''}`} onClick={convertToDefault}>Default</button>
            <button className={`json-btn${isJson ? ' active' : ''}`} onClick={convertToJson}>JSON</button>
        </div>
     );
}
 
export default ConversionButtons;