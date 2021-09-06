
import React, { useEffect, useState } from 'react';
import moment from "moment";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './table.css';
import EventForm from "./EventForm";
import ReactPaginate from 'react-paginate';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import * as SiIcons from 'react-icons/si';

const EventTable = () => {
    const [rows, setRows] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [addBtnPopupForm, setAddBtnPopupForm] = useState(false)
    const [inEditMode, setInEditMode] = useState({
      status: false,
      rowKey: null
    });

    const [name,setName]= useState("");
    const [description,setDescription]= useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [community, setCommunity]= useState("");
    const [communityList, setCommunityList]= useState([]);
    const [fee, setFee] = useState("");
    const [contactNumber, setContactNumber] = useState([]);
    const [active, setActive] = useState("true");

    const rowsPerPage = 10;
    const rowsVisited = pageNumber * rowsPerPage; 
    const pageCount = Math.ceil(rows.length /rowsPerPage);

    const changePage = ({selected})=>{
      setPageNumber(selected)
    }
    
    //fetch communities
    const getCommunityList = async () => {
      let response= await fetch('/api/community');
      let data = await response.json();
      setCommunityList(data);
      // console.log("54 communityList: ",data)
    }

    const updateEvent = (id, newName, newDescription, newAddress1, newAddress2, newCity, newProvince, newStart, newEnd, newCommunity, newFee, newContactNumber, newActive) => {
      let currentDate = new Date();

      let eventToUpdate = {
          name: newName,
          description: newDescription,
          address1: newAddress1,
          address2: newAddress2,
          city: newCity,
          province: newProvince,
          start: newStart,
          end: newEnd,
          community: newCommunity,
          fee: newFee,
          contactNumber: newContactNumber,
          active: newActive,
          lastUpdateDate : currentDate
      }

      let updateResponse = fetch(`/api/event/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventToUpdate)
      })
      .then(response => response.json())
      .then(json => {
          onCancel();
          getEvent();
          console.log("updateResponse = ", updateResponse);
      })    
    }

    const onEdit = (id, currentName, currentDescription, currentAddress1, currentAddress2, currentCity, currentProvince, currentStart, currentEnd, currentCommunity, currentFee, currentContactNumber, currentActive) => {
      setInEditMode({
        status: true,
        rowKey: id
      })    

      setName(currentName);
      setDescription(currentDescription);
      setAddress1(currentAddress1);
      setAddress2(currentAddress2);
      setCity(currentCity);
      setProvince(currentProvince);
      setStart(currentStart); 
      setEnd(currentEnd); 
      setCommunity(currentCommunity);
      setFee(currentFee);
      setContactNumber(currentContactNumber);
      setActive(currentActive);
    }      
    
    const onSave = (id, newName, newAddress1, newAddress2, newCity, newProvince, newStart, newEnd, newCommunity, newFee, newContactNumber, newActive) => {
      updateEvent(id, newName, newAddress1, newAddress2, newCity, newProvince, newStart, newEnd, newCommunity, newFee, newContactNumber, newActive);
    }
    
    const onCancel = () => {
      setInEditMode({
        status: false,
        rowKey: null
      })
      getEvent();
    }
 
    //callback
    function handleEventFormClick(eventFormDate) {
        if (eventFormDate === "Success")  {
          getEvent();     
        }
    }

    async function handleDeleteClick(itemID) {
      let deleteResponse = await fetch(`/api/event/${itemID}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if (deleteResponse.status === 200) {
        getEvent();
      }       
    }

    const getEvent = async () => {
      let response = await fetch('/api/event');
      let data = await response.json();
      setRows(data);
    };
    
    useEffect(() => {
      getEvent();
      getCommunityList();
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
        <tr className="Tb" key= {row._id} >
            <td>
                {
                  inEditMode.status && inEditMode.rowKey === row._id ?(
                    <input value={name} onChange={(e)=> setName(e.target.value)}/>
                  ):(
                    row.name
                  )
                }
            </td>
            <td>
                {
                  inEditMode.status && inEditMode.rowKey === row._id ?(
                    <input value={description} onChange={(e)=> setDescription(e.target.value)}/>
                  ):(
                    row.description
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
            <td>{
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <Datepicker format={"MM/DD/yyyy"} value={moment(start).format("MM/DD/yyyy")} onChange={ (event) => {setStart(event)}}/>
                  ) : (
                    moment(row.start).format("MM/DD/yyyy")
                  )                         
                }
            </td>
            <td>{
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <Datepicker format={"MM/DD/yyyy"} value={moment(end).format("MM/DD/yyyy")} onChange={ (event) => {setEnd(event)}}/>
                  ) : (
                    moment(row.end).format("MM/DD/yyyy")
                  )                         
                }
            </td>
            <td>
                {
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <select value={community._id} onChange={(e) => setCommunity(e.target.value)}>
                      <option>--Select--</option>
                      {communityList.map(item => <option key={item.name} value={item._id}>{item.name}</option>)} 
                    </select>
                  ):(
                    row.community.name
                  )
                }
            </td>
            <td>
                {
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <input value={fee} onChange={(event) => setFee(event.target.value)}/>
                  ):(
                    row.fee
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
                    <button onClick={() => onSave(row._id, name, description, address1, address2, city, province, start, end, community, fee, contactNumber, active)}>
                      Save
                    </button>
                    <button
                      onClick={() => onCancel()}
                    >
                      Cancel
                    </button>
                  </React.Fragment>
                ) : (
                    <button value={row.address1} onClick={() => onEdit(row._id, row.name, row.description, row.address1, row.address2, row.city, row.province, row.start, row.end, row.community, row.fee, row.contactNumber, row.active)}>
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
      <div >
        <div className="list-table">
          <h2>Event Maintanence</h2>
          <button onClick={()=>setAddBtnPopupForm(true)}>New Event</button>
          <EventForm trigger={addBtnPopupForm} setTrigger={setAddBtnPopupForm} onEventFormClick={handleEventFormClick} homePageFlag = {false} />
          <table className='aaa'>
              <tbody className="civitasTable">
                <tr><th>Event Name</th><th>Description</th><th>Address1</th><th>Address2</th><th>City</th><th>Province</th><th>Start Date</th><th>End Date</th><th>community</th><th>Fee</th><th>Contact Number</th><th>Active</th><th>Date Added</th><th>Last Update</th><th>Action</th></tr>
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
          {/* <Calendar rows={rows}></Calendar> */}

        </div>
      </div>
    )
}

export default EventTable
