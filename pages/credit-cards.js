import { useState, useRef, useContext } from "react";
import ButtonCopy from "@/components/ButtonCopy";
import ConversionButtons from "@/components/ConversionButtons";

import { PageContext } from "@/components/PageContext"; 

const getCreditCards = async(creditCards = {
    quantity: 5
}) => await fetch(`https://fakerapi.it/api/v1/credit_cards?_quantity=${creditCards.quantity}&_type=${creditCards.type}&_width=${creditCards.width}&_height=${creditCards.height}`);

export const getStaticProps = async() => {
    const res = await getCreditCards();
    const creditCards = await res.json();

    return {
        props: { 
            allData: creditCards,
            creditCardsData: creditCards.data
         }
    }
}

const creditCards = ({creditCardsData}) => {
    const [creditCards, setCreditCards] = useState(creditCardsData);

    const [quantity, setQuantity] = useState(5);

    const {isJson, setIsJson} = useContext(PageContext);

    const jsonTxtRef = useRef();

    const creditCardsJson = () => JSON.stringify(creditCards, undefined, 2);

    const submit = async() => {
        const response = await getCreditCards({
            quantity
        }).then(res => res.json());
        
        if(response){
            setCreditCards(response.data);
        }
    }

    const updateQuantity = (e) => {
        setQuantity(e.target.value);
    }

    return (
        <div className="container">

            <div className="flex">
                <h2>Random Credit Cards</h2>

                <ConversionButtons/>
            </div>

            <div className="flex">
                <div className="sidebar">
                    <div className="form-filter">
                        <div className="fields">
                            <div className="label">Quantity</div> 
                            <input type="number" value={quantity} onChange={updateQuantity}/>
                        </div>

                        <div className="text-right">
                            <button className="btn-primary generate" onClick={submit}>Generate</button>
                        </div>
                    </div>
                </div>

                <div className="content">
                    <ButtonCopy targetRef={jsonTxtRef} show={isJson}/>

                    {!isJson && creditCards?.length ? creditCards.map((cc) => (
                        <div className={`card flex cc-card ` + cc.type.toLowerCase().split(' ').join('-')} key={cc.id}>
                            <div className="avatar"></div>
                        
                            <div className="details">
                                <div><label>Type:</label> {cc.type}</div>
                                <div><label>Number:</label> {cc.number}</div>
                                <div><label>Expiration:</label> {cc.expiration}</div>
                                <div><label>Owner:</label> {cc.owner}</div>
                            </div>
                        </div>
                    )) : (
                        <div className="json-content">
                            <pre className="json-text" ref={jsonTxtRef}>{creditCardsJson()}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default creditCards;