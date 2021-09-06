import React, { useEffect, useState } from 'react';
import moment from "moment";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './table.css';
import MemberForm from "./MemberForm";
import ReactPaginate from 'react-paginate';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import * as SiIcons from 'react-icons/si';

// a comment
const Member = () => {
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
    const [communityDetail, setCommunityDetail] = useState([]);
    const [communityList, setCommunityList]= useState([]);
    const [userLevelList, setUserLevelList] = useState([])

    const [username, setUsername]= useState("");
    const [usernameList, setUsernameList]= useState([]);

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
    
    //fetch user list 
    const getUsernameList = async () => {
      let response= await fetch('/api/user');
      let data = await response.json();
      setUsernameList(data);
    }

     //fetch userLevellist 
     const getUserLevelList = async () =>{
        let response= await fetch('/api/userLevel');
        let data = await response.json();        
        setUserLevelList(data)  
// console.log("69 userLevelList: ", data)
    }

    const updateMember = (id, newFirstName, newLastName, newAddress1, newAddress2, newCity, newProvince, newPostalCode, newContactNumber, newEmailAddress, newCommunityDetail, newUsername, newActive) => {
      let currentDate = new Date();
      let memberToUpdate = {
          firstName: newFirstName,
          lastName: newLastName,
          address1: newAddress1,
          address2: newAddress2,
          city: newCity,
          province: newProvince,
          postalCode: newPostalCode,
          contactNumber: newContactNumber,
          emailAddress: newEmailAddress,
          communityDetail: newCommunityDetail,
          username: newUsername,
          active: newActive,
          lastUpdateDate : currentDate
      }

      let updateResponse = fetch(`/api/member/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(memberToUpdate)
      })
      .then(response => response.json())
      .then(json => {
          // reset inEditMode and unit price state values
          onCancel();
          // fetch the updated data
          getMember();
          console.log("updateResponse = ", updateResponse);
      })    
    }

    const onEdit = (id, currentFirstName, currentLastName, currentAddress1, currentAddress2, currentCity, currentProvince, currentPostalCode, currentContactNumber, currentEmailAddress, currentCommunityDetail, currentUsername, currentActive) => {
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
      setCommunityDetail(currentCommunityDetail);
      setUsername(currentUsername);
      setActive(currentActive);
    }      
    
    const onSave = (id, newFirstName, newLastName, newAddress1, newAddress2, newCity, newProvince, newPostalCode, newContactNumber, newEmailAddress, newCommunityDetail, newUsername, newActive) => {
      updateMember(id, newFirstName, newLastName, newAddress1, newAddress2, newCity, newProvince, newPostalCode, newContactNumber, newEmailAddress, newCommunityDetail, newUsername, newActive);
    }
    
    const onCancel = () => {
      setInEditMode({
        status: false,
        rowKey: null
      })
      getMember();
    }
 
    //callback
    function handleMemberFormClick(memberFormDate) {
        if (memberFormDate === "Success")  {
          getMember();     
        }
    }

    async function handleDeleteClick(itemID) {
      let deleteResponse = await fetch(`/api/member/${itemID}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if (deleteResponse.status === 200) {
        getMember();
      }  
      // console.log('Delete response is', deleteResponse)      
    }

    const getMember = async () => {
      // fetch uses the "proxy" value set in client/package.json
      let response = await fetch('/api/member');
      let data = await response.json();
      setRows(data);
    // console.log("164 getMember data: ", data)
    };
    
    useEffect(() => {
      getMember();
      getCommunityList();
      getUsernameList();
      getUserLevelList();
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

    const onCommunityDetailAdd = (id) => {
      let currentDate = new Date();
      let newRows = [...rows];

      for (let i=0; i < newRows.length; i++) {
        if (newRows[i]._id === id) {
          newRows[i].communityDetail.push({community: "", userLevel: "", renewalDate: currentDate, memberSince: currentDate });
          setCommunityDetail(newRows[i].communityDetail);
          break;
        }        
      }
      setRows(newRows);
    }    

  const onCommunityDetailChange = (e, id, index) => {

      let newCommunityDetail = [...communityDetail]
      newCommunityDetail[index][e.target.name] = e.target.value 
      setCommunityDetail(newCommunityDetail); 

      let newRows = [...rows];

      for (let i=0; i < newRows.length; i++) {
        if (newRows[i]._id === id) {
          newRows[i].communityDetail = newCommunityDetail;
          break;
        }        
      }
      setRows(newRows);
    }

    // datePicker returns a date in the event, thats all..
    const onCommunityDetailChangeDate = (e, id, index, dt) => {

      let newCommunityDetail = [...communityDetail]
      newCommunityDetail[index][dt] = e
      setCommunityDetail(newCommunityDetail); 

      let newRows = [...rows];

      for (let i=0; i < newRows.length; i++) {
        if (newRows[i]._id === id) {
          newRows[i].communityDetail = newCommunityDetail;
          break;
        }        
      }    
      setRows(newRows);
    }
    
    const onCommunityDetailDelete = (id, index) => {

      let newCommunityDetail = [...communityDetail];
      newCommunityDetail.splice(index, 1);

      setCommunityDetail(newCommunityDetail);

      let newRows = [...rows];

      for (let i=0; i < newRows.length; i++) {
        if (newRows[i]._id === id) {
          newRows[i].communityDetail = newCommunityDetail;
          break;
        }        
      }
      setRows(newRows);
    }   

    const displayRows =rows.slice(rowsVisited, rowsVisited+rowsPerPage).map(row => {
      return (
        <tr key= {row.emailAddress}>
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
              <table width="100%">
                  <tbody>               
                    <tr><th>Community</th><th>User Level</th><th>Renewal Date</th><th>MbrShp Paid Date</th><th>Membership Since</th><th>Active</th></tr>                            
                    {/* {row.communityDetail.map( (cdi, index) => { console.log("410 cdi: ",cdi) */}
                    {row.communityDetail.map( (cdi, index) => {
                      return (<tr key={index}>                          
                                  <td width="46%">{
                                      inEditMode.status && inEditMode.rowKey === row._id ? (
                                        <select name="community" value={communityDetail[index].community._id} onChange={(e) => onCommunityDetailChange(e, row._id, index)}>
                                          <option>--Select--</option>
                                            {communityList.map(item => <option key={item.name} value={item._id}>{item.name}</option>)} 
                                        </select>
                                      ) : (
                                        cdi.community.name
                                      )                         
                                    }
                                  </td>
                                  <td width="15%">{
                                      inEditMode.status && inEditMode.rowKey === row._id ? (
                                        <select name="userLevel" value={communityDetail[index].userLevel._id} onChange={(e) => onCommunityDetailChange(e, row._id, index)}>
                                          <option>--Select--</option>
                                            {userLevelList.map(item => <option key={item.name} value={item._id}>{item.name}</option>)} 
                                        </select>
                                      ) : (
                                        cdi.userLevel.name
                                      )                         
                                    }
                                  </td>
                                  <td width="13%">{
                                      inEditMode.status && inEditMode.rowKey === row._id ? (
                                        <Datepicker format={"MM/DD/yyyy"} value={moment(communityDetail[index].renewalDate).format("MM/DD/yyyy") } onChange={(e) => {onCommunityDetailChangeDate(e, row._id, index, "renewalDate")}}/>
                                      ) : (
                                        moment(cdi.renewalDate).format("MM/DD/yyyy")
                                      )
                                    }
                                  </td>
                                  <td width="13%">{
                                      inEditMode.status && inEditMode.rowKey === row._id ? (
                                        <Datepicker format={"MM/DD/yyyy"} value={moment(communityDetail[index].membershipPaidDate).format("MM/DD/yyyy") } onChange={(e) => {onCommunityDetailChangeDate(e, row._id, index, "membershipPaidDate")}}/>
                                      ) : (
                                        moment(cdi.membershipPaidDate).format("MM/DD/yyyy")
                                      )
                                    }
                                  </td>
                                  <td width="13%">{
                                      inEditMode.status && inEditMode.rowKey === row._id ? (
                                        <Datepicker format={"MM/DD/yyyy"} value={moment(communityDetail[index].memberSince).format("MM/DD/yyyy") } onChange={(e) => {onCommunityDetailChangeDate(e, row._id, index, "memberSince")}}/>
                                      ) : (
                                        moment(cdi.memberSince).format("MM/DD/yyyy")
                                      )                         
                                    }
                                  </td>
                                  <td>{
                                      inEditMode.status && inEditMode.rowKey === row._id ? (
                                        <select name="active"  value={cdi.active} onChange={(e) => onCommunityDetailChange(e, row._id, index)}>
                                          <option value="true">true</option>
                                          <option value="false">false</option>
                                        </select>
                                      ):(
                                        String(cdi.active)
                                      )                                         
                                    }
                                  </td>
                                  {
                                    inEditMode.status && inEditMode.rowKey === row._id ? (
                                      <td>
                                        <button className="clear" onClick={() => onCommunityDetailDelete(row._id, index)}><RiIcons.RiDeleteBinFill/></button>
                                      </td>
                                    )  : null  
                                  }
                                </tr> 
                               )                                
                      })
                    }
                      <tr>
                          {inEditMode.status && inEditMode.rowKey === row._id ? (
                              <td>
                                <button className="clear" onClick={() => onCommunityDetailAdd(row._id)}><SiIcons.SiAddthis/></button>
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
                    <button onClick={() => onSave(row._id, firstName, lastName, address1, address2, city, province, postalCode,  contactNumber, emailAddress, communityDetail, username, active)}>
                      Save
                    </button>
                    <button
                      onClick={() => onCancel()}
                    >
                      Cancel
                    </button>
                  </React.Fragment>
                ) : (
                    <button value={row.address1} onClick={() => onEdit(row._id, row.firstName, row.lastName, row.address1, row.address2, row.city, row.province, row.postalCode,  row.contactNumber, row.emailAddress, row.communityDetail, row.username, row.active)}>
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
          <h2>Member Maintanence</h2>
          <button onClick={()=>setAddBtnPopupForm(true)}>New Member</button>
          <MemberForm trigger={addBtnPopupForm} setTrigger={setAddBtnPopupForm} onMemberFormClick={handleMemberFormClick} homePageFlag = {false} />
          <table className='aaa'>
              <tbody>
                <tr><th>First Name</th><th>Last Name</th><th>Address1</th><th>Address2</th><th>City</th><th>Province</th><th>Postal Code</th><th>Contact Number</th><th>Email Address</th><th>Community Detail</th><th>Username</th><th>Active</th><th>Date Added</th><th>Last Update</th><th>Action</th></tr>
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

export default Member