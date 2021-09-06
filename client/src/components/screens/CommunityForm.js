import { useState } from "react"
import moment from "moment";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './form.css';
import * as  AiIcons from 'react-icons/ai';
import * as  SiIcons from 'react-icons/si';
import * as  RiIcons from 'react-icons/ri';

const CommunityForm = ({onCommunityFromClick, trigger, setTrigger}) => {
    let [name, setName] = useState("");
    let [description, setDescription] = useState("");
    let [address1, setAddress1] = useState("");
    let [address2, setAddress2] = useState("");   
    let [city, setCity] = useState("");
    let [province, setProvince] = useState("");
    let [postalCode, setPostalCode] = useState("");
    let [contactNumber, setContactNumber] = useState([]);
    let [contactPerson, setContactPerson] = useState([]);
    let [emailAddress, setEmailAddress] = useState("");
    let [membershipFee, setMembershipFee] = useState("");    
    let [GST, setGST] = useState("");    
    let [PST, setPST] = useState("");    
    let [HST, setHST] = useState("");   
    let [membershipStartPeriod, setMembershipStartPeriod] = useState(new Date());    
    let [active, setActive] = useState("true");
    let [createError, setCreateError] = useState("");

    async function onCreateClicked(e) {
        let currentDate = new Date();

        let communityToCreate = {
            name,
            description,
            address1,
            address2,
            city,
            province,
            postalCode,
            contactNumber,
            contactPerson,
            emailAddress,
            membershipFee,
            GST,
            PST,
            HST,
            membershipStartPeriod,
            active,
            dateAdded : currentDate,
            lastUpdateDate : currentDate
        }

        try {
            let createResponse = await fetch('/api/community', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(communityToCreate)
            })

            if (createResponse.status === 200) {
                onCommunityFromClick("Success");

                setName("");
                setDescription("");
                setAddress1("");
                setAddress2("");
                setCity("");
                setProvince("");
                setPostalCode("");
                setContactNumber([]);
                setContactPerson([]);
                setEmailAddress("");
                setMembershipFee("");
                setGST("");
                setPST("");
                setHST("");
                setMembershipStartPeriod("");
                setActive("true");
            }

            // the server didn't like the data for some reason
            // console.log('Create response is', createResponse)
            if (createResponse.status !== 200) {
                let errorMessage = await createResponse.text()
                console.log('We had an error.  it was: ', errorMessage)
                setCreateError(errorMessage)
            }
            else {
                setCreateError(undefined)
            }
        }
        catch (error) {
            // the server cannot be reached
            console.error('Fetch failed to reach the server.')
        }
    }

    const onInputChange = (event, setFunction) => {
        // console.log('Changing input to be ', event.target.value)
        setFunction(event.target.value);
    };

    const onInputChangeDate = (event, setFunction) => {
        // console.log('Changing input to be ', event)
        setFunction(event);
    };

    const onContactNumberChange = (e, i) => {
        let newContactNumber = [...contactNumber]
        newContactNumber[i][e.target.name] = e.target.value 
        setContactNumber(newContactNumber); 
      }  
  
    const onContactNumberAdd = () =>  {      
        let newContactNumber = [...contactNumber]
        newContactNumber.push({name: "",  phoneNumber: ""})
        setContactNumber(newContactNumber);
    }

    const onContactNumberDelete = (index) => {
        let newContactNumber = [...contactNumber];
        newContactNumber.splice(index, 1);
        setContactNumber(newContactNumber);
    }

    const onContactPersonChange = (e, i) => {
        let newContactPerson = [...contactPerson]
        newContactPerson[i][e.target.name] = e.target.value 
        setContactPerson(newContactPerson); 
      }  
    
    const onContactPersonAdd = () =>  {      
        let newContactPerson = [...contactPerson]
        newContactPerson.push({firstName: "", lastName: ""})
        setContactPerson(newContactPerson);
    }

    const onContactPersonDelete = (index) => {
        let newContactPerson = [...contactPerson];
        newContactPerson.splice(index, 1);
        setContactPerson(newContactPerson);
    }

    const onClickAdd = ()=>{
        onCreateClicked();
        setTrigger(false);   
    }

    let createCommunityDataInvalid = !name || (name.trim().length === 0)

    return (trigger)?(
        <div className='createform'>
            <div className="popup-in">
                {console.log("Contact number state", contactNumber)}

                <h4>Add a New Community</h4>
                <button className="closebtn" onClick={()=>setTrigger(false)}><AiIcons.AiOutlineClose/></button>

                <div>
                    <label htmlFor="name">Name:</label>
                    <input id="name" value={name} onChange={(event) => onInputChange(event,setName)}/>
                </div>
                <div>
                    <label htmlFor="description">Name:</label>
                    <input id="description" value={name} onChange={(event) => onInputChange(event,setDescription)}/>
                </div>
                <div>
                    <label htmlFor="address1">Address 1:</label>
                    <input id="address1" value={address1} onChange={(event) => onInputChange(event,setAddress1)}/>
                </div>
                <div>
                    <label htmlFor="address2">Address 2:</label>
                    <input id="address2" value={address2} onChange={(event) => onInputChange(event,setAddress2)}/>
                </div>
                <div className="row">
                    <div className="col3">
                        <label htmlFor="city">City:</label>
                        <input id="city" value={city} onChange={(event) => onInputChange(event,setCity)}/>
                    </div>
                    <div className="col3">
                        <label htmlFor="province">Province:</label>
                        <input id="province" value={province} onChange={(event) => onInputChange(event,setProvince)}/>
                    </div>
                    <div className="col3">
                        <label htmlFor="postalCode">Postal Code:</label>
                        <input id="postalCode" value={postalCode} onChange={(event) => onInputChange(event,setPostalCode)}/>
                    </div>
                </div>
                <div className="row">
                    <div>
                        <label htmlFor="contactNumber">Contact Number:</label>
                            <table>                      
                                <tbody>
                                    {
                                        contactNumber.map( (cn, index) => { 
                                            return ( <tr key={index}>                          
                                                        <td>
                                                            <input name="name" value={cn.name} placeholder="Type" onChange={(e) => onContactNumberChange(e, index)}/>
                                                        </td>
                                                        <td>
                                                            <input name="phoneNumber" value={cn.phoneNumber} placeholder="Phone #" onChange={(e) => onContactNumberChange(e, index)}/>                                                            
                                                        </td>  
                                                        <td>                            
                                                            <button className="clear" onClick={() => onContactNumberDelete(index)}><RiIcons.RiDeleteBinFill/></button>
                                                        </td>          
                                                    </tr> )
                                        })
                                    }
                                    <tr>                                
                                        <td>
                                            <button onClick={ onContactNumberAdd }><SiIcons.SiAddthis/></button>
                                        </td>
                                    </tr>
                                </tbody>    
                            </table>            
                        </div>                   
                        <div className="row">
                        <label htmlFor="contactPerson">Contact Person:</label>
                            <table>                      
                                <tbody>
                                    {
                                        contactPerson.map( (cn, index) => { 
                                            return ( <tr key={index}>                          
                                                        <td>
                                                            <input name="firstName" value={cn.firstName} placeholder="First Name" onChange={(e) => onContactPersonChange(e, index)}/>
                                                        </td>
                                                        <td>
                                                            <input name="lastName" value={cn.lastName} placeholder="Last Name" onChange={(e) => onContactPersonChange(e, index)}/>
                                                        </td>   
                                                        <td>                            
                                                            <button className="clear" onClick={ () => onContactPersonDelete(index) }><RiIcons.RiDeleteBinFill/></button>
                                                        </td>          
                                                    </tr> )
                                        })
                                    }
                                    <tr>                                
                                        <td>
                                            <button onClick={ onContactPersonAdd }><SiIcons.SiAddthis/></button>
                                        </td>
                                    </tr>
                                </tbody>    
                            </table>            
                        </div>            
                    </div> 

                <div>
                    <label htmlFor="emailAddress">Email Address:</label>
                    <input id="emailAddress" value={emailAddress} onChange={(event) => onInputChange(event,setEmailAddress)}/>
                </div>
                <div className="row">
                    <div className="col4">
                        <label htmlFor="membershipFee">Member Fee:</label>
                        <input id="membershipFee" value={membershipFee} onChange={(event) => onInputChange(event,setMembershipFee)}/>
                    </div>
                    <div className="col4">
                        <label htmlFor="GST">GST:</label>
                        <input id="GST" value={GST} onChange={(event) => onInputChange(event,setGST)}/>
                    </div>
                    <div className="col4">
                        <label htmlFor="PST">PST:</label>
                        <input id="PST" value={PST} onChange={(event) => onInputChange(event,setPST)}/>
                    </div>
                    <div className="col4">
                        <label htmlFor="HST">HST:</label>
                        <input id="HST" value={HST} onChange={(event) => onInputChange(event,setHST)}/>
                    </div>
                </div>

                <div className="row" > 
                    <div className="col2">
                        <label htmlFor="membershipStartPeriod">Membership Start Period:</label>
                        <Datepicker id="membershipStartPeriod" format={"MM/DD"} value={moment(membershipStartPeriod).format("MM/DD") } onChange={(event) => onInputChangeDate(event,setMembershipStartPeriod)}/>        
                    </div>
                    <div className="col2">
                        <label htmlFor="active">Active:</label>                
                        <select value={active} onChange={(event) => onInputChange(event, setActive)}>
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                    </div>
                </div>
                <br/>            
                <button disabled={ createCommunityDataInvalid } onClick={onClickAdd }>Add Community</button>
                { createError && <div>{createError}</div> }            
            </div>
        </div>
    ):"";
}

export default CommunityForm