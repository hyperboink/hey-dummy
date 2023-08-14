import { useState, useRef, useContext } from "react";
import { dateymd } from "@/utils/utils";
import ButtonCopy from "@/components/ButtonCopy";
import ConversionButtons from "@/components/ConversionButtons";

import { PageContext } from "@/components/PageContext"; 

const getTexts = async(texts = {
    quantity: 1,
    characters: 1000
}) => await fetch(`https://fakerapi.it/api/v1/texts?_quantity=${texts.quantity}&_characters=${texts.characters}`);

export const getStaticProps = async() => {
    const res = await getTexts();
    const texts = await res.json();

    return {
        props: { 
            allData: texts,
            textsData: texts.data
         }
    }
}

const Texts = ({textsData}) => {
    const [texts, setTexts] = useState(textsData);
    const [quantity, setQuantity] = useState(1);
    const [characters, setCharacters] = useState(1000);

    const {isJson, setIsJson} = useContext(PageContext);

    const jsonTxtRef = useRef();

    const textsJson = () => JSON.stringify(texts, undefined, 2);

    const submit = async() => {
        const response = await getTexts({
            quantity,
            characters
        }).then(res => res.json());
        
        if(response){
            setTexts(response.data);
        }
    }

    const updateQuantity = (e) => {
        setQuantity(e.target.value);
    }

    const updateCharacters = (e) => {
        console.log('characters', characters);
        setCharacters(e.target.value);
    }

    return ( 
        <div className="container">

            <div className="flex">
                <h2>Random Texts</h2>

                <ConversionButtons/>
            </div>

            <div className="flex">
                <div className="sidebar">
                    <div className="form-filter">
                        <div className="fields">
                            <div className="label">Quantity</div> 
                            <input type="number" value={quantity} onChange={updateQuantity}/>
                        </div>

                        <div className="fields">
                            <div className="label">Characters</div> 
                            <input type="number" value={characters} onChange={updateCharacters}/>
                        </div>

                        <div className="text-right">
                            <button className="btn-primary generate" onClick={submit}>Generate</button>
                        </div>
                    </div>
                </div>

                <div className="content">
                    <ButtonCopy targetRef={jsonTxtRef} show={isJson}/>

                    {!isJson && texts?.length ? texts.map((text, i) => (
                        <div className={`card flex`} key={i}>
                            <div className="details">
                                <div><label> {text.title} by {text.author}</label></div>
                                <div>{text.content}</div>
                            </div>
                        </div>
                    )) : (
                        <div className="json-content">
                            <pre className="json-text" ref={jsonTxtRef}>{textsJson()}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
     );
}
 
export default Texts;