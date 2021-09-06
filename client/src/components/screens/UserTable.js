import React, {useEffect, useState} from 'react';
import UserForm from './UserForm';
import moment from "moment";
import ReactPaginate from 'react-paginate';
import * as  BsIcons from 'react-icons/bs';
import * as  RiIcons from 'react-icons/ri';
import './table.css';


const UserTable = () => {
    const [rows, setRows]= useState([]);
    const [inEditMode, setInEditMode] = useState({status:false, rowKey:null})
    const [pageNumber, setPageNumber]= useState(0)
    const [addBtnPopupForm, setAddBtnPopupForm] = useState(false)
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [active, setActive] = useState("true")
    
    const rowsPerPage = 10;
    const rowsVisited = pageNumber * rowsPerPage;
    const pageCount = Math.ceil(rows.length / rowsPerPage);

  
    const changePage = ({selected}) =>{
        setPageNumber(selected)
    }

    //fetch data and set rows
    const getUsers = async () =>{
        let response= await fetch('/api/user');
        let data = await response.json();
        // console.log("data:", data)
        setRows(data)
    }

    useEffect(()=>{
        getUsers()
    }, [addBtnPopupForm])

    //update a User
    let updateUser = (id, newUsername, newPassword,  newActive) =>{

        let currentDate = new Date();
        let userToUpdate = {
            username : newUsername,
            password: newPassword,
            active: newActive,
            lastUpdateDate: currentDate
        }
        let updateResponse = fetch(`/api/user/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(userToUpdate)
        }).then(response => response.json())
        .then(json => {
            onCancel(); //reset inEditMode  values
            getUsers(); //fetch the updated data
            console.log("UserTable updateResponse:", updateResponse)
        })
    }

    const onEdit = (id, currentUsername, currentPassword, currentActive) =>{
            setInEditMode({status: true, rowKey: id})
        
        setUsername(currentUsername)
        setPassword(currentPassword)
        setActive(currentActive)                
    }

    const onSave = (id, newUsername, newPassword, newActive) => {
            updateUser(id, newUsername, newPassword, newActive)
        }
    
    const onCancel =() =>{
        setInEditMode({status:false, rowKey:null});
        getUsers()
    }

    //delete a row
    const handleDeleteClick = async (itemId)=> {
        let deleteResponse = await fetch(`/api/user/${itemId}`, {
            method:"DELETE",
            headers: {
                'Content-Type': 'application/json'}
        })
        if(deleteResponse.status === 200){
            getUsers()
        }
        // console.log('deleteResponse:',deleteResponse );
    }

    const handleUserFormClick = (userFormData) => {
        if(userFormData === 'success'){
            getUsers()
        }
    }

    const displayRows = rows.slice(rowsVisited, rowsVisited+rowsPerPage).map(row => {
        return(
            <tr key= {row.username}>
                <td>
                    {
                        inEditMode.status && inEditMode.rowKey === row._id ?(
                        <input value={username} onChange={(e)=> setUsername(e.target.value)} />
                        ):(
                        row.username
                        )
                    }
                </td>
                <td>
                    {
                        inEditMode.status && inEditMode.rowKey === row._id ?(
                        <input value={password} onChange={(e)=> setPassword(e.target.value)} />
                        ):(
                        row.password
                        )
                    }
                </td>
                <td>
                    {
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
                <td>{moment(row.lastUpdateAdded).format("MM/DD/yyyy hh:mm A")}</td>
                <td>
                    {
                       inEditMode.status && inEditMode.rowKey === row._id ? (
                        <React.Fragment>
                            <button onClick = {() => onSave(row._id, username, password, active)}>Save</button>
                            <button onClick = {() => onCancel()}>Cancel</button>
                        </React.Fragment>
                       ) : (
                        <button value={row.description} onClick={() => onEdit(row._id, row.username, row.password, row.active)}><BsIcons.BsPencilSquare /></button>
                       )
                    }
                    <button onClick={() => {handleDeleteClick(row._id)}}><RiIcons.RiDeleteBinFill/></button>
                </td> 
            </tr>
        )
    })


    return (
        <div>
            <div className="list-table">
                <h2>Users</h2>
                <button className="add-u" onClick={()=>setAddBtnPopupForm(true)}>New User</button>
                <UserForm trigger={addBtnPopupForm} setTrigger={setAddBtnPopupForm} minimalFlag ={false} onUserFormClick = {handleUserFormClick} />
                <table  className='aaa'>
                    <tbody>
                    <tr><th>Username</th><th>Password</th><th>Active</th><th>Date Added</th><th>Last Update</th><th>Action</th></tr>
                        {displayRows}
                    </tbody>
                </table>
                
                <ReactPaginate 
                    previousLabel = {"Prev"}
                    NextLabel = {"Next"}
                    pageCount = {pageCount}
                    onPageChange = {changePage}
                    containerClassName = {"paginationBttns"}
                    previousLinkClassName = {"previousBttn"}
                    nextLinkClassName = {"nextBttn"}
                    disabledClassName = {"paginationDisabled"}
                    activeClassName = {"paginationActive"}
                />   
            </div>
        </div>
        
    );
}
 
export default UserTable;