import { useState, useEffect } from "react"
import moment from "moment";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import * as  AiIcons from 'react-icons/ai';
import * as  SiIcons from 'react-icons/si';
import * as  RiIcons from 'react-icons/ri';

import './form.css';

import { useContext } from "react"
import AuthenticationContext from "../../AuthenticationContext"
                   
const EventForm = ({onEventFormClick, trigger, setTrigger, homePageFlag}) => {
    // eslint-disable-next-line
    const authContext = useContext(AuthenticationContext)

    let [event, setEvent] = useState({})
    let [dateAdded, setdateAdded] = useState(undefined)

    let [name, setName] = useState("")
    let [description, setDescription] = useState("")
    let [address1, setAddress1] = useState("")
    let [address2, setAddress2] = useState("")
    let [city, setCity] = useState("")
    let [province, setProvince] = useState("")
    let [start, setStart] = useState(new Date())
    let [end, setEnd] = useState(new Date())
    let [community, setCommunity]= useState("")
    let [communityList, setCommunityList]= useState([])
    let [fee, setFee] = useState("")
    let [contactNumber, setContactNumber] = useState([])
    let [active, setActive] = useState("true")
    let [createError, setCreateError] = useState("")

    //fetch community list
    const getCommunityList = async () => {
        let response= await fetch('/api/community');
        let data = await response.json();
        setCommunityList(data);
    }

    useEffect( () => {
      getCommunityList(); 
    }, []);

    async function onCreateClicked(e) {
        let currentDate = new Date()

        let eventToCreate = {
            name,  
            description,
            address1,
            address2,
            city,
            province,
            start,
            end,
            community,
            fee,
            contactNumber,
            active,
            dateAdded : currentDate,
            lastUpdateDate : currentDate
        
        }
        console.log("66 line start",start)
        try {
            let createResponse = await fetch('/api/event', {
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

    let createEventDataInvalid = !name || (name.trim().length === 0)
    

    return (trigger)? (
        <div className='createform'>
            <div className="popup-in">
                <><h4>Add a New Event</h4></>
                <button className="closebtn" onClick={()=>setTrigger(false)}><AiIcons.AiOutlineClose/></button>

                <div>
                    <label htmlFor="name">Event Name:</label>
                    <input id="name" value={name} onChange={(event) => onInputChange(event,setName)}/>
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input id="description" value={description} onChange={(event) => onInputChange(event,setDescription)}/>
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
                        <label for="start">start:</label>
                        <input id = "start" name= {start} value={start} onChange={ (event) => {setStart(event.target.value)}}/>
                        {/* < input type="datetime-local"  format={"MM/DD/yyyy hh:mm a"} value={moment(start).format("MM/DD/yyyy hh:mm a")} onChange={ (event) => {setStart(event)}}/> */}
                    </div>
                    
                    <div className="col3">
                        <label for="end" >end:</label>
                        <input id="end" name={end} value={end}  onChange={ (event) => {setEnd(event.target.value)}}/>
                        {/* <input type="datetime-local" id ="end" value="2018-06-12T19:30"  min="2018-06-07T00:00" max="2024-06-14T00:00" onChange={ (event) => {setEnd(event)}}/> */}
                    </div>
                    <div className="col3">
                        <label htmlFor="community">Community:</label>
                        <select value={community._id} onChange={(event) => onInputChange(event, setCommunity)}>
                            <option>--Select--</option>
                            {communityList.map(item=> <option key={item.name} value={item._id}>{item.name}</option>)} 
                        </select>
                    </div>
                    <div className="col3">
                        <label htmlFor="fee">Fee:</label>
                        <input id="fee" value={fee} onChange={(event) => onInputChange(event,setFee)}/>
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
                    <label htmlFor="active">Active:</label> 
                    <select value={active} onChange={(event) => onInputChange(event, setActive)}>
                        <option value="true">true</option>
                        <option value="false">false</option>
                    </select>   
                </div>
                <br/>            
                <button disabled={ createEventDataInvalid } onClick={ onClickAdd }>{homePageFlag ? (<>Update/Insert</>) : (<>Add Event</>) }</button>
                { createError && <div>{createError}</div> }  
            </div>          
        </div>
    ):"";
}

export default EventForm