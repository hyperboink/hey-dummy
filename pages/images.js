import { useState, useRef, useContext } from "react";
import { dateymd } from "@/utils/utils";
import ButtonCopy from "@/components/ButtonCopy";
import ConversionButtons from "@/components/ConversionButtons";

import { PageContext } from "@/components/PageContext"; 

const getImages = async(images = {
    type: 'cats',
    quantity: 5,
    width: 300,
    height: 300
}) => await fetch(`https://fakerapi.it/api/v1/images?_quantity=${images.quantity}&_type=${images.type}&_width=${images.width}&_height=${images.height}`);

export const getStaticProps = async() => {
    const res = await getImages();
    const images = await res.json();

    return {
        props: { 
            allData: images,
            imagesData: images.data
         }
    }
}

const Images = ({imagesData}) => {
    const [images, setimages] = useState(imagesData);
    const [gender, setGender] = useState('');
    const [dobStart, setDobStart] = useState('2005-01-01');
    const [dobEnd, setDobEnd] = useState(dateymd(new Date()));
    const [quantity, setQuantity] = useState(5);

    const {isJson, setIsJson} = useContext(PageContext);

    const jsonTxtRef = useRef();

    const imagesJson = () => JSON.stringify(images, undefined, 2);

    const submit = async() => {
        const response = await getImages({
            type,
            width,
            height,
            quantity
        }).then(res => res.json());
        
        if(response){
            setimages(response.data);
        }
    }

    const updateQuantity = (e) => {
        setQuantity(e.target.value);
    }

    return (
        <div className="container">

            <div className="flex">
                <h2>Random Images</h2>

                <ConversionButtons/>
            </div>

            <div className="flex">
                <div className="sidebar">
                    <div className="form-filter">
                       

                        <div className="fields dob-range">
                            <div className="label">Birthday(start - end)</div> 
                            <div className="flex">
                                
                                <input type="date" />
                                <input type="date" />
                            </div>
                        </div>

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

                    {!isJson && images?.length ? images.map((image) => (
                        <div className={`card flex`} key={image.id}>
                            <div className="avatar"></div>
                        
                            <div className="details">
                                <div><img src={image.url}/></div>
                                <div><label>Title:</label> {image.title}</div>
                                <div><label>Description:</label> {image.description}</div>
                            </div>
                        </div>
                    )) : (
                        <div className="json-content">
                            <pre className="json-text" ref={jsonTxtRef}>{imagesJson()}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Images;