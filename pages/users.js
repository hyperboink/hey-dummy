import { useState, useRef, useContext } from "react";
import { dateymd } from "@/utils/utils";
import ButtonCopy from "@/components/ButtonCopy";
import ConversionButtons from "@/components/ConversionButtons";

import { PageContext } from "@/components/PageContext"; 

const getUsers = async(users = {
    gender: '',
    dobStart: '2005-01-01',
    quantity: 5
}) => await fetch(`https://fakerapi.it/api/v1/users?_quantity=${users.quantity}`);

export const getStaticProps = async() => {
    const res = await getUsers();
    const users = await res.json();

    return {
        props: { 
            allData: users,
            usersData: users.data
         }
    }
}

const Users = ({usersData}) => {
    const [users, setUsers] = useState(usersData);
    const [quantity, setQuantity] = useState(5);

    const {isJson, setIsJson} = useContext(PageContext);

    const jsonTxtRef = useRef();

    const usersJson = () => JSON.stringify(users, undefined, 2);

    const submit = async() => {
        const response = await getUsers({
            gender,
            dobStart,
            dobEnd,
            quantity
        }).then(res => res.json());
        
        if(response){
            setUsers(response.data);
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
                <h2>Random Users</h2>
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

                    {!isJson && users?.length ? users.map((user) => (
                        <div className="card flex user" key={user.id}>
                            <div className="avatar"></div>
                        
                            <div className="details">
                                <div><label>Uuid:</label> {user.uuid}</div>
                                <div><label>Username:</label> {user.username}</div>
                                <div><label>Password:</label> {user.password}</div>
                                <div><label>Email:</label> {user.email}</div>
                                <div><label>Firstname:</label> {user.firstname}</div>
                                <div><label>LastName:</label> {user.lastname}</div>
                            </div>
                        </div>
                    )) : (
                        <div className="json-content">
                            <pre className="json-text" ref={jsonTxtRef}>{usersJson()}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
     );
}
 
export default Users;