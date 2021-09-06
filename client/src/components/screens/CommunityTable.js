import React, { useEffect, useState } from 'react';
import moment from "moment";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './table.css';

import CommunityForm from "./CommunityForm";
import ReactPaginate from 'react-paginate';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import * as SiIcons from 'react-icons/si';

const CommunityTable = () => {
    const [rows, setRows] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [addBtnPopupForm, setAddBtnPopupForm] = useState(false)
    const [inEditMode, setInEditMode] = useState({
      status: false,
      rowKey: null
    });
    const [description, setDescription] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");   
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [contactNumber, setContactNumber] = useState([]);
    const [contactPerson, setContactPerson] = useState([]);
    const [emailAddress, setEmailAddress] = useState("");    
    const [membershipFee, setMembershipFee] = useState("");    
    const [GST, setGST] = useState("");    
    const [PST, setPST] = useState("");    
    const [HST, setHST] = useState("");    
    const [membershipStartPeriod, setMembershipStartPeriod] = useState("");    
    const [active, setActive] = useState("true");

    const rowsPerPage = 10;
    const rowsVisited = pageNumber * rowsPerPage; 
    const pageCount = Math.ceil(rows.length /rowsPerPage);

    const changePage = ({selected})=>{
      setPageNumber(selected)
    }
    
    const updateCommunity = (id, newDescription, newAddress1, newAddress2, newCity, newProvince, newPostalCode, newContactNumber, newContactPerson, newEmailAddress, newMembershipFee, newGST, NewPST, newHST, newMembershipStartPeriod, newActive) => {
      let currentDate = new Date();
      let communityToUpdate = {
          description: newDescription,
          address1: newAddress1,
          address2: newAddress2,
          city: newCity,
          province: newProvince,
          postalCode: newPostalCode,
          contactNumber: newContactNumber,
          contactPerson: newContactPerson,
          emailAddress: newEmailAddress,
          membershipFee: newMembershipFee,
          GST: newGST,
          PST: NewPST,
          HST: newHST,
          membershipStartPeriod: newMembershipStartPeriod,
          active: newActive,
          lastUpdateDate : currentDate
      }

      let updateResponse = fetch(`/api/community/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(communityToUpdate)
      })
      .then(response => response.json())
      .then(json => {
          onCancel();
          console.log("updateResponse = ", updateResponse);
      })    
    }

    const onEdit = (id, currentDescription, currentAddress1, currentAddress2, currentCity, currentProvince, currentPostalCode, currentContactNumber, currentContactPerson, currentEmailAddress, currentMembershipFee, currentGST, currentPST, currentHST, currentMembershipStartPeriod, currentActive) => {
      setInEditMode({
        status: true,
        rowKey: id
      })    

      setDescription(currentDescription);
      setAddress1(currentAddress1);
      setAddress2(currentAddress2);
      setCity(currentCity);
      setProvince(currentProvince);
      setPostalCode(currentPostalCode);
      setContactNumber(currentContactNumber);
      setContactPerson(currentContactPerson);
      setEmailAddress(currentEmailAddress);
      setMembershipFee(currentMembershipFee);
      setGST(currentGST);
      setPST(currentPST);
      setHST(currentHST);
      setMembershipStartPeriod(currentMembershipStartPeriod);
      setActive(currentActive);
    }      
    
    const onSave = (id, newDescription, newAddress1, newAddress2, newCity, newProvince, newPostalCode, newContactNumber, newContactPerson, newEmailAddress, newMemberhipFee, newGST, newPST, newHST, newMembershipStartPeriod, newActive) => {
      updateCommunity(id, newDescription, newAddress1, newAddress2, newCity, newProvince, newPostalCode, newContactNumber, newContactPerson, newEmailAddress, newMemberhipFee, newGST, newPST, newHST, newMembershipStartPeriod, newActive);
    }
    
    const onCancel = () => {
      setInEditMode({
        status: false,
        rowKey: null
      })
      getCommunities();
    }

    function handleCommunityFormClick(communityFormData) {
        if (communityFormData === "Success")  {
          getCommunities();     
        }
    }

    //callback
    async function handleDeleteClick(itemID) {
      let deleteResponse = await fetch(`/api/community/${itemID}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if (deleteResponse.status === 200) {
        getCommunities();
      }  
      // console.log('Create response is', deleteResponse)      
    }

    const getCommunities = async () => {
      // fetch uses the "proxy" value set in client/package.json
      let response = await fetch('/api/community');
      let data = await response.json();

      // console.log("data = ", data);
      setRows(data);
    }
    
    useEffect(() => {
        getCommunities();
    }, [])

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

    const onContactPersonChange = (e, id, index) => {

      let newContactPerson = [...contactPerson]
      newContactPerson[index][e.target.name] = e.target.value 
      setContactPerson(newContactPerson); 

      let newRows = [...rows];

      for (let i=0; i< newRows.length; i++) {
        if (newRows[i]._id === id) {
          newRows[i].contactPerson = newContactPerson;
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

    const onContactPersonDelete = (id, index) => {

      let newContactPerson = [...contactPerson];
      newContactPerson.splice(index, 1);
      setContactPerson(newContactPerson);

      let newRows = [...rows];

      for (let i=0; i< newRows.length; i++) {
        if (newRows[i]._id === id) {
          newRows[i].contactPerson = newContactPerson;
          break;
        }        
      }
      setRows(newRows);
    }

    const onContactPersonAdd = (id) => {

      let newRows = [...rows];

      for (let i=0; i< newRows.length; i++) {

        if (newRows[i]._id === id) {
          newRows[i].contactPerson.push({firstName: "", lastName: ""});
          setContactPerson(newRows[i].contactPerson);
          break;
        }        
      }
      setRows(newRows);
    }

    const displayRows =rows.slice(rowsVisited, rowsVisited+rowsPerPage).map(row => {
      return (
        <tr key={row.name}>
            <td>{row.name}</td>
            <td>{
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <input value={description} onChange={(event) => setDescription(event.target.value)}/>
                  ) : (
                    row.description
                  )                         
                }
            </td>
            <td>{
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <input value={address1} onChange={(event) => setAddress1(event.target.value)}/>
                  ) : (
                    row.address1
                  )                         
                }
            </td>
            <td>{
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <input value={address2} onChange={(event) => setAddress2(event.target.value)}/>
                  ) : (
                    row.address2
                  )                         
                }
            </td>
            <td>{
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <input value={city} onChange={(event) => setCity(event.target.value)}/>
                  ) : (
                    row.city
                  )                         
                }
            </td>
            <td>{
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <input value={province} onChange={(event) => setProvince(event.target.value)}/>
                  ) : (
                    row.province
                  )                         
                }
            </td>
            <td>{
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <input value={postalCode} onChange={(event) => setPostalCode(event.target.value)}/>
                  ) : (
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
                                      }
                                  </td>
                                  <td>{
                                        inEditMode.status && inEditMode.rowKey === row._id ? (
                                          <input name="phoneNumber" value={contactNumber[index].phoneNumber} onChange={(e) => onContactNumberChange(e, row._id, index)}/>
                                        ) : (
                                          cn.phoneNumber
                                        )                         
                                      }
                                  </td>
                                  {                              
                                    inEditMode.status && inEditMode.rowKey === row._id ? (
                                      <td>
                                        <button className="clear" onClick={() => onContactNumberDelete(row._id, index)}><RiIcons.RiDeleteBinFill/></button>
                                      </td>
                                    ) : null  
                                  }
                               </tr> 
                             )
                    })
                  }
                  <tr>
                      {
                        inEditMode.status && inEditMode.rowKey === row._id ? (
                          <td>
                            <button className="clear" onClick={() => onContactNumberAdd(row._id)}><SiIcons.SiAddthis/></button>
                          </td>
                        ) : null                
                      }    
                  </tr>
                </tbody>          
              </table>
            </td>
            
            <td>
              <table>
                <tbody>              
                  {
                    row.contactPerson.map( (cp, index) => {
                      return (<tr key={index}>
                                <td>{
                                      inEditMode.status && inEditMode.rowKey === row._id ? (
                                        <input name="firstName" value={contactPerson[index].firstName} onChange={(e) => onContactPersonChange(e, "firstName", index) }/>                                 
                                      ) : (
                                        cp.firstName
                                      )
                                    }
                                </td>
                                <td>{
                                      inEditMode.status && inEditMode.rowKey === row._id ? (
                                        <input name="lastName" value={contactPerson[index].lastName} onChange={ (e) => onContactPersonChange(e, "lastName", index) }/>
                                      ) : (
                                        cp.lastName
                                      )
                                    }
                                </td>
                                {
                                  inEditMode.status && inEditMode.rowKey === row._id ? (
                                    <td>
                                      <button className="clear" onClick={ () => onContactPersonDelete(row._id, index) }><RiIcons.RiDeleteBinFill/></button>
                                    </td>
                                  ) : null
                                }
                              </tr>
                      )
                    })
                  }
                    <tr>                  
                      {
                        inEditMode.status && inEditMode.rowKey === row._id ? (
                            <td>
                              <button className="clear" onClick={ () => onContactPersonAdd(row._id) }><SiIcons.SiAddthis/></button>
                            </td>                  
                        ) : null
                      }
                    </tr>                      
                </tbody>
              </table>
            </td>

            <td>{
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <input value={emailAddress} onChange={(event) => setEmailAddress(event.target.value)}/>
                  ) : (
                    row.emailAddress
                  )                         
                }
            </td>
            <td>{
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <input value={membershipFee} onChange={(event) => setMembershipFee(event.target.value)}/>
                  ) : (
                    row.membershipFee
                  )                         
                }
            </td>
            <td>{
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <input value={GST} onChange={(event) => setGST(event.target.value)}/>
                  ) : (
                   row.GST
                  )                         
                }
            </td>
            <td>{
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <input value={PST} onChange={(event) => setPST(event.target.value)}/>
                  ) : (
                    row.PST
                  )                         
                }
            </td>
            <td>{
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <input value={HST} onChange={(event) => setHST(event.target.value)}/>
                  ) : (
                    row.HST
                  )                         
                }
            </td>
            <td>{
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <Datepicker format={"MM/DD"} value={moment(membershipStartPeriod).format("MM/DD")} onChange={ (event) => {setMembershipStartPeriod(event)}}/>
                  ) : (
                    moment(row.membershipStartPeriod).format("MM/DD")
                  )                         
                }
            </td>

            <td>{
                  inEditMode.status && inEditMode.rowKey === row._id ? (
                    <select value={active} onChange={(event) => setActive(event.target.value)}>
                      <option value="true">true</option>
                      <option value="false">false</option>
                    </select>
                  ) : (
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
                    <button onClick={() => onSave(row._id, description, address1, address2, city, province, postalCode, contactNumber, contactPerson, emailAddress, membershipFee, GST, PST, HST, membershipStartPeriod, active)}>
                      Save
                    </button>
                    <button
                      onClick={() => onCancel()}>
                      Cancel
                    </button>
                  </React.Fragment> 
                ) : (
                  <button value={row.description} onClick={() => onEdit(row._id, row.description, row.address1, row.address2, row.city, row.province, row.postalCode,
                                                                                 row.contactNumber, row.contactPerson, row.emailAddress, row.membershipFee, 
                                                                                 row.GST, row.PST, row.HST, row.membershipStartPeriod, row.active )}>
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
          <h2>Community Maintanence</h2>
          <button onClick={()=>setAddBtnPopupForm(true)}>New Community</button>
          <CommunityForm trigger={addBtnPopupForm} setTrigger={setAddBtnPopupForm} onCommunityFromClick={handleCommunityFormClick} />

          <table className='aaa'>
              <tbody>
                <tr><th>Name</th><th>Description</th><th>Address 1</th><th>Address 2</th><th>City</th><th>Province</th><th>Postal Code</th>
                <th>Contact Number</th><th>Contact Person</th><th>Email Address</th><th>Member Fee</th><th>GST</th><th>PST</th>
                <th>HST</th><th>Mbrshp Start Period</th><th>Active</th><th>Date Added</th><th>Last Update</th><th>Action</th></tr>
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

export default CommunityTable