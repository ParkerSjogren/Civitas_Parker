import React, { useEffect, useState } from 'react';
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import './table.css';
import EventRegistrationForm from "./EventRegistrationForm";
import ReactPaginate from 'react-paginate';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import * as SiIcons from 'react-icons/si';

// a comment
const EventRegistrationTable = () => {
    const [rows, setRows] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [addBtnPopupForm, setAddBtnPopupForm] = useState(false)
    const [inEditMode, setInEditMode] = useState({
      status: false,
      rowKey: null
    });

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [contactNumber, setContactNumber] = useState([]);
    const [emailAddress, setEmailAddress] = useState("");
    const [username, setUsername]= useState("");
    const [usernameList, setUsernameList]= useState([]);
    const [event, setEvent] = useState("");
    const [eventList, setEventList] = useState([]);
    const [numberOfAttendees, setNumberOfAttendees] = useState("");
    const [feePaid, setFeePaid] = useState("false");

    const [active, setActive] = useState("true");

    const rowsPerPage = 10;
    const rowsVisited = pageNumber * rowsPerPage; 
    const pageCount = Math.ceil(rows.length /rowsPerPage);

    const changePage = ({selected})=>{
      setPageNumber(selected)
    }

    const getEventRegistration = async () => {
        // fetch uses the "proxy" value set in client/package.json
        let response = await fetch('/api/eventRegistration');
        let data = await response.json();
        setRows(data);
    };
      
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
  

    const updateEventRegistration = (id, newFirstName, newLastName, newAddress1, newAddress2, newCity, newProvince, newPostalCode, newContactNumber, newEmailAddress, newUsername, newEvent, newNumberOfAttendees, newFeePaid, newActive) => {
      let currentDate = new Date();
      let eventRegistrationToUpdate = {
          firstName: newFirstName,
          lastName: newLastName,
          address1: newAddress1,
          address2: newAddress2,
          city: newCity,
          province: newProvince,
          postalCode: newPostalCode,
          contactNumber: newContactNumber,
          emailAddress: newEmailAddress,
          username: newUsername,
          event: newEvent, 
          numberOfAttendees: newNumberOfAttendees, 
          feePaid: newFeePaid,
          active: newActive,
          lastUpdateDate : currentDate
      }

      let updateResponse = fetch(`/api/eventRegistration/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventRegistrationToUpdate)
      })
      .then(response => response.json())
      .then(json => {
          onCancel();
          getEventRegistration();
          console.log("updateResponse = ", updateResponse);
      })    
    }

    const onEdit = (id, currentFirstName, currentLastName, currentAddress1, currentAddress2, currentCity, currentProvince, currentPostalCode, currentContactNumber, currentEmailAddress, currentUsername, currentEvent, currentNumberOfAttendees, currentFeePaid, currentActive) => {
      setInEditMode({
        status: true,
        rowKey: id
      })    
      setFirstName(currentFirstName)
      setLastName(currentLastName)
      setAddress1(currentAddress1);
      setAddress2(currentAddress2);
      setCity(currentCity);
      setProvince(currentProvince);
      setPostalCode(currentPostalCode); 
      setContactNumber(currentContactNumber);
      setEmailAddress(currentEmailAddress);
      setUsername(currentUsername);
      setEvent(currentEvent);
      setNumberOfAttendees(currentNumberOfAttendees);
      setFeePaid(currentFeePaid);
      setActive(currentActive);
    }      
    
    const onSave = (id, newFirstName, newLastName, newAddress1, newAddress2, newCity, newProvince, newPostalCode, newContactNumber, newEmailAddress, newUsername, newEvent, newNumberOfAttendees, newFeePaid, newActive) => {
      updateEventRegistration(id, newFirstName, newLastName, newAddress1, newAddress2, newCity, newProvince, newPostalCode, newContactNumber, newEmailAddress, newUsername, newEvent, newNumberOfAttendees, newFeePaid, newActive);
    }
    
    const onCancel = () => {
      setInEditMode({
        status: false,
        rowKey: null
      })
      getEventRegistration();
    }
 
    //callback
    function handleEventRegistrationFormClick(eventRegistrationFormDate) {
        if (eventRegistrationFormDate === "Success")  {
          getEventRegistration();     
        }
    }

    async function handleDeleteClick(itemID) {
      let deleteResponse = await fetch(`/api/eventRegistration/${itemID}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if (deleteResponse.status === 200) {
        getEventRegistration();
      }  
      // console.log('Delete response is', deleteResponse)      
    }
    
    useEffect(() => {
      getEventRegistration();
      getUsernameList();
      getEventList();
    }, [addBtnPopupForm]);

    const onContactNumberChange = (e, id, index) => {

      let newContactNumber = [...contactNumber]
      newContactNumber[index][e.target.name] = e.target.value 
      setContactNumber(newContactNumber); 

      let newRows = [...rows];

      for (let i=0; i< newRows.length; i++) {
        if (newRows[i]._id === id) {
          newRows[i].contactNumber = newContactNumber;
          break;
        }        
      }
      setRows(newRows);
    }

    const onContactNumberAdd = (id) => {

      let newRows = [...rows];

      for (let i=0; i< newRows.length; i++) {
        if (newRows[i]._id === id) {
          newRows[i].contactNumber.push({name: "", phoneNumber: ""});
          setContactNumber(newRows[i].contactNumber);
          break;
        }        
      }

      setRows(newRows);
    }

    const onContactNumberDelete = (id, index) => {

      let newContactNumber = [...contactNumber];
      newContactNumber.splice(index, 1);
      setContactNumber(newContactNumber);

      let newRows = [...rows];

      for (let i=0; i< newRows.length; i++) {
        if (newRows[i]._id === id) {
          newRows[i].contactNumber = newContactNumber;
          break;
        }        
      }
      setRows(newRows);
    }

    const displayRows =rows.slice(rowsVisited, rowsVisited+rowsPerPage).map(row => {
      return (
        <tr key= {row._id}>
            <td>
                {
                  inEditMode.status && inEditMode.rowKey === row._id ?(
                    <input value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
                  ):(
                    row.firstName
                  )
                }
            </td>
            <td>
               {
                  inEditMode.status && inEditMode.rowKey === row._id ?(
                    <input value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
                  ):(
                    row.lastName
                  )
              }
            </td>
            <td>
                {
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <input value={address1} onChange={(event) => setAddress1(event.target.value)}/>
                  ):(
                    row.address1
                  )                         
                }
            </td>
            <td>
                {
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <input value={address2} onChange={(event) => setAddress2(event.target.value)}/>
                  ):(
                    row.address2
                  )                         
                }
            </td>
            <td>
                {
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <input value={city} onChange={(event) => setCity(event.target.value)}/>
                  ):(
                    row.city
                  )                         
                }
            </td>
            <td>
                {
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <input value={province} onChange={(event) => setProvince(event.target.value)}/>
                  ):(
                    row.province
                  )                                                         
                }
            </td>
            <td>
                {
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <input value={postalCode} onChange={(event) => setPostalCode(event.target.value)}/>
                  ):(
                   row.postalCode
                  )                         
                }
            </td>
            <td>
              <table>
                <tbody>               
                  {               
                    row.contactNumber.map( (cn, index) => { 
                      return ( <tr key={index}>                          
                                  <td>{
                                        inEditMode.status && inEditMode.rowKey === row._id ? (
                                          <input name="name" value={contactNumber[index].name} onChange={(e) => onContactNumberChange(e, row._id, index)}/>
                                        ) : (
                                          cn.name
                                        )                         
                                  }</td>
                                  <td>{
                                        inEditMode.status && inEditMode.rowKey === row._id ? (
                                          <input name="phoneNumber" value={contactNumber[index].phoneNumber} onChange={(e) => onContactNumberChange(e, row._id, index)}/>
                                        ) : (
                                          cn.phoneNumber
                                        )                         
                                  }</td>
                                  {                              
                                    inEditMode.status && inEditMode.rowKey === row._id ? (
                                      <td>
                                        <button className="clear" onClick={ () => onContactNumberDelete(row._id, index) }><RiIcons.RiDeleteBinFill/></button>
                                      </td>
                                      ) : null  
                                  }                           
                              </tr> )
                    })
                  }
                  <tr>
                      {
                        inEditMode.status && inEditMode.rowKey === row._id ? (
                          <td>
                            <button className="clear" onClick={ () => onContactNumberAdd(row._id) }><SiIcons.SiAddthis/></button>
                          </td>
                        ) : null                
                      }                    
                  </tr>
                </tbody>          
              </table>
            </td>

            <td>
                {
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                  <input value={emailAddress} onChange={(event) => setEmailAddress(event.target.value)}/>
                  ):(
                    row.emailAddress
                  )                         
                }
            </td>
            <td>
                {
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <select value={username._id} onChange={(e) => setUsername(e.target.value)}>
                      <option>--Select--</option>
                      {usernameList.map(item => <option key={item.username} value={item._id}>{item.username}</option>)} 
                    </select>
                  ):(
                    row.username.username
                  )
                }
            </td>
            <td>
                { 
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <select value={event._id} onChange={(e) => setEvent(e.target.value)}>
                      <option>--Select--</option>
                      {eventList.map(item => <option key={item.name} value={item._id}>{item.name}</option>)} 
                    </select>
                  ):(
                    row.event.name
                  )
                }
            </td>
            <td>
                {
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <input value={numberOfAttendees} onChange={(event) => setNumberOfAttendees(event.target.value)}/>
                  ):(
                    row.numberOfAttendees
                  )
                }
            </td>
            <td>
                {inEditMode.status && inEditMode.rowKey === row._id ? (
                    <select value={feePaid} onChange={(event) => setFeePaid(event.target.value)}>
                      <option value="true">true</option>
                      <option value="false">false</option>
                    </select>
                  ):(
                    String(row.feePaid)
                  )                                         
                }
            </td>
            <td>
                {inEditMode.status && inEditMode.rowKey === row._id ? (
                    <select value={active} onChange={(event) => setActive(event.target.value)}>
                      <option value="true">true</option>
                      <option value="false">false</option>
                    </select>
                  ):(
                    String(row.active)
                  )                                         
                }
            </td>
            <td>{moment(row.dateAdded).format("MM/DD/yyyy hh:mm A")}</td>
            <td>{moment(row.lastUpdateDate).format("MM/DD/yyyy hh:mm A")}</td>
            
            <td>
              {
                inEditMode.status && inEditMode.rowKey === row._id ? (
                  <React.Fragment>
                    <button onClick={() => onSave(row._id, firstName, lastName, address1, address2, city, province, postalCode,  contactNumber, emailAddress, username, event, numberOfAttendees, feePaid, active)}>
                      Save
                    </button>
                    <button
                      onClick={() => onCancel()}
                    >
                      Cancel
                    </button>
                  </React.Fragment>
                ) : (
                    <button value={row.address1} onClick={() => onEdit(row._id, row.firstName, row.lastName, row.address1, row.address2, row.city, row.province, row.postalCode,  row.contactNumber, row.emailAddress, row.username, row.event, row.numberOfAttendees, row.feePaid, row.active)}>
                      <BsIcons.BsPencilSquare />
                    </button>                              
                )       
              }                                        
              <button onClick={() => {handleDeleteClick(row._id)}} ><RiIcons.RiDeleteBinFill/></button>
            </td>
      </tr>
      )
    })
  
    return (
      <div>
        <div className="list-table">
          <h2>Event Registration Maintanence</h2>
          <button onClick={()=>setAddBtnPopupForm(true)}>New EventRegistration</button>
          <EventRegistrationForm trigger={addBtnPopupForm} setTrigger={setAddBtnPopupForm} onEventRegistrationFormClick={handleEventRegistrationFormClick} homePageFlag = {false} />
          <table className='aaa'>
              <tbody>
                <tr><th>First Name</th><th>Last Name</th><th>Address1</th><th>Address2</th><th>City</th><th>Province</th><th>Postal Code</th><th>Contact Number</th><th>Email Address</th><th>Username</th><th>Event</th><th># Attendees</th><th>Fee Paid</th><th>Active</th><th>Date Added</th><th>Last Update</th><th>Action</th></tr>
                {displayRows}                
              </tbody>
          </table>
          <ReactPaginate
            previousLabel= {"Prev"} 
            nextLabel= {"Next"}
            pageCount= {pageCount}
            onPageChange = {changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName = {"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName= {"paginationActive"}
          />       
        </div>
      </div>
    )
}

export default EventRegistrationTable