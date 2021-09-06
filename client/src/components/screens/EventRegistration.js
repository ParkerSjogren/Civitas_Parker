import { useState, useEffect } from "react"
import "react-datepicker/dist/react-datepicker.css";
import * as  AiIcons from 'react-icons/ai';
import * as  SiIcons from 'react-icons/si';
import * as  RiIcons from 'react-icons/ri';
import './EventRegistration.css';
import { useContext } from "react"
import AuthenticationContext from "../../AuthenticationContext"


                   
const EventRegistration = ({onEventFormClick, trigger, setTrigger, eventData, idx, eventId}) => {
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
   
    let [event, setEvent] = useState("");
    
    let [numberOfAttendees, setNumberOfAttendees] = useState(""); 
    let [feePaid, setFeePaid] = useState("false");
    let [active, setActive] = useState("true")
    let [createError, setCreateError] = useState("")



    console.log("line 44 ER" ,eventData[idx])
    // console.log("line 43",index)
    
    useEffect( () => {
    //   setEventC(eventData[idx]._id); 
      setUsername(authContext.id)
    //   console.log("line43  authContext.id",authContext.id)
  
    //   console.log("event Id line 45",eventId)
    //    console.log("line44 _id ",eventData[idx]._id)
    //   setEvent(eventData[idx]._id)
    }, []);


    async function onCreateClicked(e) {
        // console.log("line 50  authContext.id",authContext.id)
        let currentDate = new Date()
        console.log("event Id line 53",eventId)

        let eventToCreate = {
            firstName,
            lastName,
            address1,
            address2,
            city,
            province,
            postalCode,
            contactNumber,
            emailAddress,
            username : authContext.id,
            event : eventId,
            numberOfAttendees, 
            feePaid,
            active,
            dateAdded : currentDate,
            lastUpdateDate : currentDate
        }
        console.log("line 66",eventToCreate)
        
        try {
            let createResponse = await fetch('/api/eventRegistration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventToCreate)
            })

            if (createResponse.status === 200) {
                onEventFormClick("Success");

                
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
            console.error('197 Fetch failed to reach the server.', error)
        }
    }

    const onInputChange = (event, setFunction) => {
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

    let createEventDataInvalid = !firstName || (firstName.trim().length === 0)

    return (trigger)? (
        <div className="form-group"> 
             <div className="createform1">
                <div className="popup-in1">
                    <div>
                        
                        <h2 className="mid">Event Registration</h2>
                        <h4> Event Details</h4>
                        <button className="closebtn" onClick={()=>setTrigger(false)}><AiIcons.AiOutlineClose/></button>
                    </div>

                    <div className = "row">
                        <div className="form-group">
                            <label htmlFor="name">Event Name:</label>
                            <span className="form-control">{eventData[idx].name}</span>
                        </div>
                        <div className="col-sm-12">
                            <label htmlFor="address1">Address1:</label>
                            <span className="form-control">{eventData[idx].address1}</span>
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="address2">Address2:</label>
                            <span className="form-control">{eventData[idx].address2}N/A</span>
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="city">City:</label>
                            <span className="form-control" >{eventData[idx].city}</span>
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="province">Province:</label>
                            <span className="form-control">{eventData[idx].province}</span>
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="active">Active:</label>
                            <span className="form-control">{eventData[idx].active} True</span>
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="fee">Fee:</label>
                            <span className="form-control">${eventData[idx].fee}</span>
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="contactNumber">Contact Number:</label>
                            <span className="form-control">{eventData[idx].contactNumber[0].phoneNumber}</span>
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="community">Community:</label>
                            <span className="form-control">{eventData[idx].community.name}</span>
                        </div>
                            <div className="col-sm-4">
                            <label htmlFor="start">Start:</label>
                            <span className="form-control">{eventData[idx].start}</span>
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="end">End:</label>
                            <span className="form-control">{eventData[idx].end}</span>
                        </div>


                        <h4 class="midText" >Event Registration</h4>
                        
                        <div className="col-sm-4">
                            <label htmlFor="firstName">First Name:</label>
                            <input id="firstName" value={firstName} className="form-control" onChange={(event) => onInputChange(event,setFirstName)}/>
                        </div>

                        <div className="col-sm-4">
                            <label htmlFor="lastName">Last Name:</label>
                            <input id="lastName" value={lastName} className="form-control" onChange={(event) => onInputChange(event,setLastName)}/>
                        </div>

                        <div className="col-sm-4">
                            <label htmlFor="address1">Address1:</label>
                            <input id="address1" value={address1} className="form-control" onChange={(event) => onInputChange(event,setAddress1)}/>
                        </div >

                        <div className="col-sm-4">
                            <label htmlFor="address2">Address2:</label>
                            <input id="address2" value={address2} className="form-control" onChange={(event) => onInputChange(event,setAddress2)}/>
                        </div >

                        <div className="col-sm-4">
                            <label htmlFor="city">City:</label>
                            <input id="city" value={city} className="form-control" onChange={(event) => onInputChange(event,setCity)}/>
                        </div>

                        <div className="col-sm-4">
                            <label htmlFor="province">Province:</label>
                            <input id="province" value={province}  className="form-control" onChange={(event) => onInputChange(event,setProvince)}/>
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="numberOfAttendees">Number Of Attendees</label>
                            <input id="numberOfAttendees"  className="form-control" value={numberOfAttendees} onChange={(event) => onInputChange(event,setNumberOfAttendees)}/>
                        </div>

                        <div className="col-sm-4">
                            <label htmlFor="postalCode">Postal Code:</label>
                            <input id="postalCode" value={postalCode} className="form-control" onChange={(event) => onInputChange(event,setPostalCode)}/>
                        </div>

                        <div className="col-sm-4">
                            <label htmlFor="emailAddress">EmailAddress:</label>
                            <input id="emailAddress" value={emailAddress} className="form-control" onChange={(event) => onInputChange(event,setEmailAddress)}/>
                        </div>

                        
                            

                        <div className="col-sm-4">
                        <div >
                            <label htmlFor="contactNumber">Contact Number:</label>                
                                    <table className= "table">                      
                                        <tbody>
                                            {contactNumber.map( (cn, index) => { 
                                                    return (<tr className="row" key={index}>                          
                                                                {/* <td>
                                                                    <input name="name" value={cn.name} placeholder="Type" onChange={(e) => onContactNumberChange(e, index)}/>                                                        
                                                                </td> */}
                                                                <td>
                                                                    <input name="phoneNumber" value={cn.phoneNumber} className="form-control" placeholder="Phone #" onChange={(e) => onContactNumberChange(e, index)}/>
                                                                </td>
                                                                <td>                            
                                                                    <button type="button" className="btn btn-light" onClick={ () => onContactNumberDelete(index) }><RiIcons.RiDeleteBinFill/></button>
                                                                </td>
                                                            </tr> )
                                                })
                                            }
                                            <tr className="row">                                
                                                <td className = "phoneTd">
                                                    <button type="button" className="btn btn-light" onClick={ onContactNumberAdd }><SiIcons.SiAddthis/></button>
                                                </td>
                                            </tr>
                                        </tbody>    
                                    </table>            
                                </div> 
                            </div>
                        </div>
                        


                        
                        <button type="button" className="btn btn-danger"  disabled={ createEventDataInvalid } onClick={ onClickAdd }> Register</button>
                        { createError && <div>{createError}</div> }



                    </div>
                </div>
            </div>  
        
        
        
     
    ):"";
}

export default EventRegistration

