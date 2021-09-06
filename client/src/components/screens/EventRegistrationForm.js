import { useState, useEffect } from "react"
// import "react-datepicker/dist/react-datepicker.css";

import * as  AiIcons from 'react-icons/ai';
import * as  SiIcons from 'react-icons/si';
import * as  RiIcons from 'react-icons/ri';

import './form.css';

import { useContext } from "react"
import AuthenticationContext from "../../AuthenticationContext"
                   
const EventRegistrationForm = ({onEventRegistrationFormClick, trigger, setTrigger}) => {
    // eslint-disable-next-line
    const authContext = useContext(AuthenticationContext)

    let [firstName, setFirstName] = useState("")
    let [lastName, setLastName] = useState("")
    let [address1, setAddress1] = useState("")
    let [address2, setAddress2] = useState("")
    let [city, setCity] = useState("")
    let [province, setProvince] = useState("")
    let [postalCode, setPostalCode] = useState("")
    let [contactNumber, setContactNumber] = useState([])
    let [emailAddress, setEmailAddress] = useState("")
    let [username, setUsername]= useState("")
    let [usernameList, setUsernameList]= useState([])
    let [event, setEvent] = useState("");
    let [eventList, setEventList] = useState([]);
    let [numberOfAttendees, setNumberOfAttendees] = useState("");
    let [feePaid, setFeePaid] = useState("false");

    let [active, setActive] = useState("true")
    let [createError, setCreateError] = useState("")

    //fetch user list 
    const getUsernameList = async () => {
        let response= await fetch('/api/user');
        let data = await response.json();
        setUsernameList(data);
    }

     //fetch event list 
     const getEventList = async () => {
        let response= await fetch('/api/event');
        let data = await response.json();
        setEventList(data);
      }

    useEffect( () => {
        if (authContext.id){
            getUsernameList();
            getEventList();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authContext]);


    async function onCreateClicked(e) {
        let currentDate = new Date()

        let eventRegistrationToCreate = {
            firstName, 
            lastName, 
            address1,
            address2,
            city,
            province,
            postalCode,
            contactNumber,
            emailAddress,
            username,
            event, 
            numberOfAttendees, 
            feePaid,
            active,
            dateAdded : currentDate,
            lastUpdateDate : currentDate
        }
        try {
            let createResponse = await fetch('/api/eventRegistration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventRegistrationToCreate)
            })

            if (createResponse.status === 200) {
                onEventRegistrationFormClick("Success");
                
                setFirstName("")
                setLastName("")
                setAddress1("")
                setAddress2("")
                setCity("")
                setProvince("")
                setPostalCode("")
                setContactNumber([])
                setEmailAddress("")
                setUsername("")
                setUsernameList([])
                setEvent("");
                setEventList([]);
                setNumberOfAttendees("")
                setFeePaid("false")
                setActive("true")
            }
            
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
            console.error('EventRegistrationForm:  Fetch failed to reach the server.', error)
        }        
    }

    const onInputChange = (event, setFunction) => {
        // console.log('Changing input to be ', event.target.value)
        setFunction(event.target.value);
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

    const onClickAdd = ()=>{
        onCreateClicked();
        setTrigger(false); 
    }

    let createEventRegistrationDataInvalid = !emailAddress || (emailAddress.trim().length === 0)

    return (trigger)? (
        <div className='createform'>
            <div className="popup-in">
                <><h4>Add a New EventRegistration</h4></>
                <button className="closebtn" onClick={()=>setTrigger(false)}><AiIcons.AiOutlineClose/></button>

                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input id="firstName" value={firstName} onChange={(event) => onInputChange(event,setFirstName)}/>
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input id="lastName" value={lastName} onChange={(event) => onInputChange(event,setLastName)}/>
                </div>
                <div>
                    <label htmlFor="address1">Address1:</label>
                    <input id="address1" value={address1} onChange={(event) => onInputChange(event,setAddress1)}/>
                </div>
                <div>
                    <label htmlFor="address2">Address2:</label>
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
                                {contactNumber.map( (cn, index) => { 
                                        return (<tr key={index}>                          
                                                    <td>
                                                        <input name="name" value={cn.name} placeholder="Type" onChange={(e) => onContactNumberChange(e, index)}/>                                                        
                                                    </td>
                                                    <td>
                                                        <input name="phoneNumber" value={cn.phoneNumber} placeholder="Phone #" onChange={(e) => onContactNumberChange(e, index)}/>
                                                    </td>
                                                    <td>                            
                                                        <button className="clear" onClick={ () => onContactNumberDelete(index) }><RiIcons.RiDeleteBinFill/></button>
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
                </div>            

                <div>
                    <label htmlFor="emailAddress">Email Address:</label>
                    <input id="emailAddress" value={emailAddress} onChange={(event) => onInputChange(event,setEmailAddress)}/>
                </div>
                <table>
                    <tbody>
                        <tr>                        
                            <td>
                                <label htmlFor="username">Username:</label>     
                                    <select value={username._id} onChange={(event) => onInputChange(event, setUsername)}>
                                        <option>--Select--</option>
                                        {usernameList.map(item=> <option key={item.username} value={item._id}>{item.username}</option>)} 
                                    </select>
                            </td>  
                        </tr>
                    </tbody>
                </table>  
                <table>
                    <tbody>
                        <tr>                        
                            <td>
                                <label htmlFor="event">Event:</label>     
                                    <select value={event._id} onChange={(event) => onInputChange(event, setEvent)}>
                                        <option>--Select--</option>
                                        {eventList.map(item=> <option key={item.name} value={item._id}>{item.name}</option>)} 
                                    </select>
                            </td>  
                        </tr>
                    </tbody>
                </table> 
                <div>
                    <label htmlFor="numberOfAttendess"># Attendees:</label>
                    <input id="numberOfAttendees" value={numberOfAttendees} onChange={(event) => onInputChange(event,setNumberOfAttendees)}/>
                </div>
                <div>
                    <label htmlFor="feePaid">Fee Paid:</label>    
                        <select value={feePaid} onChange={(event) => onInputChange(event, setFeePaid)}>
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                </div>
                <div>
                    <label htmlFor="active">Active:</label>    
                        <select value={active} onChange={(event) => onInputChange(event, setActive)}>
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                </div>
                <br/>            
                <button disabled={ createEventRegistrationDataInvalid } onClick={ onClickAdd }>Add EventRegistration</button>
                { createError && <div>{createError}</div> }  
            </div>          
        </div>
    ):"";
}

export default EventRegistrationForm