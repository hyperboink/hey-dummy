import { useState, useRef, useContext } from "react";
import { dateymd } from "@/utils/utils";
import ButtonCopy from "@/components/ButtonCopy";
import ConversionButtons from "@/components/ConversionButtons";

import { PageContext } from "@/components/PageContext"; 

const getPersons = async(persons = {
    gender: '',
    dobStart: '2005-01-01',
    quantity: 5
}) => await fetch(`https://fakerapi.it/api/v1/persons?_quantity=${persons.quantity}&_gender=${persons.gender}&_birthday_start=${persons.dobStart}&_birthday_end=${dateymd(new Date())}`);

export const getStaticProps = async() => {
    const res = await getPersons();
    const persons = await res.json();

    return {
        props: { 
            allData: persons,
            personsData: persons.data
         }
    }
}

const Persons = ({personsData}) => {
    const [persons, setPersons] = useState(personsData);
    const [gender, setGender] = useState('');
    const [dobStart, setDobStart] = useState('2005-01-01');
    const [dobEnd, setDobEnd] = useState(dateymd(new Date()));
    const [quantity, setQuantity] = useState(5);

    const {isJson, setIsJson} = useContext(PageContext);

    const jsonTxtRef = useRef();

    const personsJson = () => JSON.stringify(persons, undefined, 2);

    const submit = async() => {
        const response = await getPersons({
            gender,
            dobStart,
            dobEnd,
            quantity
        }).then(res => res.json());
        
        if(response){
            setPersons(response.data);
        }
    }

    const updateQuantity = (e) => {
        setQuantity(e.target.value);
    }

    const updateGender = (e) => {
        setGender(e.target.value);
    }

    return ( 
        <div className="container">

            <div className="flex">
                <h2>Random Persons</h2>
                {/* <div className="display-type">
                    <button className={`default-btn${!settings.isJson ? ' active' : ''}`} onClick={convertToDefault}>Default</button>
                    <button className={`json-btn${settings.isJson ? ' active' : ''}`} onClick={convertToJson}>JSON</button>
                </div> */}


                <ConversionButtons/>
            </div>

            <div className="flex">
                <div className="sidebar">
                    <div className="form-filter">
                        <div className="fields">
                            <div className="label">Gender</div> 
                            <select value={gender} onChange={updateGender}>
                                <option value="">Both</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

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

                    {!isJson && persons?.length ? persons.map((person) => (
                        <div className={`card flex ${person.gender === 'male' ? 'male' : 'female'}`} key={person.id}>
                            <div className="avatar"></div>
                        
                            <div className="details">
                                <div><label>Name:</label> {person.firstname} {person.lastname}</div>
                                <div><label>Gender:</label> {person.gender}</div>
                                <div><label>Address:</label> {person.address.street}, {person.address.city}, {person.address.country}, {person.address.county_code}</div>
                                <div><label>Birthday:</label> {person.birthday}</div>
                                <div><label>Email:</label> {person.email}</div>
                                <div><label>Phone:</label> {person.phone}</div>
                                <div><label>Website:</label> {person.website}</div>
                            </div>
                        </div>
                    )) : (
                        <div className="json-content">
                            <pre className="json-text" ref={jsonTxtRef}>{personsJson()}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
     );
}
 
export default Persons;