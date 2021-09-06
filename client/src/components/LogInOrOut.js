import { useContext } from "react"
import AuthenticationContext from "../AuthenticationContext"
// import { useState , useEffect} from "react"
import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.css'
import UserForm from './screens/UserForm';
import MemberForm from './screens/MemberForm';
import './users/Login.css'

const LogInOrOut = () => {
    const authContext = useContext(AuthenticationContext)
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")

    const isLoggedIn = !!authContext.username
    const [addBtnPopupForm, setAddBtnPopupForm] = useState(false)
    
    const handleMemberFormClick = (memberFormData) => {
    }
    const handleUserFormClick = (userFormData) => {
        // if(userFormData === 'Success'){ 
        //     console.log("Success!!!!")
        // }
    }
    return (isLoggedIn) ? 
            <>
                <div className="text-center">
                    <span>
                        <h3 className="h33"><span>Hello</span> {authContext.username}
                        </h3>
                        </span>
                        <br></br>
                    <button className="btn btn-danger" type="button"  onClick={() => authContext.logOut()}>Logout</button>
                    &nbsp;&nbsp;
                    <button className="btn btn-dark" type="button" onClick={()=>setAddBtnPopupForm(true)}>Community Update/Signup</button>
                    <MemberForm trigger={addBtnPopupForm} setTrigger={setAddBtnPopupForm} onMemberFormClick = {handleMemberFormClick} homePageFlag = {true}/>

                </div> 
            </>
            : 
            <div className="container-fluid">
                <div className="row">
                <div className="col-4 offset-4">
                     <br /><div className="card">
                         <div className="card-body" >
                         <h4 className="card-title ">Login</h4>
                            <div className="card-text">
                             
                                 <div>
                                     <label htmlFor="username" className="form-label">Username</label>
                                         <input type="username"
                                         name="username"
                                         id="username"
                                         value={username}
                                         placeholder="username"
                                         required
                                         onChange={(e) => setUsername(e.target.value)}
                                         className="form-control" />
                                 </div> 
                                     <div>
                                         <label htmlFor="password" className="form-label">Password</label>
                                         <input
                                             type="password"
                                             name="password"
                                             id="password"
                                             value={password}
                                             className="form-control"
                                             placeholder="password"
                                             required
                                             onChange={(e) => setPassword(e.target.value)}
                                           />
                                     </div>
                                     <br></br>
                                    <div className ="buttons" >
                                        <div className="row-fluid text-center" >
                                            <button className="btn btn-outline-danger" type="button" onClick={() => authContext.logIn(username, password)}>Login</button>
                                            &nbsp;&nbsp;
                                            <button className="btn btn-outline-dark" type="button" onClick={()=>setAddBtnPopupForm(true)}>SignUp</button>

                                            <UserForm trigger={addBtnPopupForm} setTrigger={setAddBtnPopupForm}  homePageFlag ={true} onUserFormClick = {handleUserFormClick} />
                                        </div>
                                    </div>
                                    
                            </div>
                         </div>
                     </div>
                 </div>
                </div>
                 
            </div>

}

export default LogInOrOut