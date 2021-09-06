// import { useState , useEffect} from "react"
import { useState, useContext } from "react"
import AuthenticationContext from "../../AuthenticationContext"
import './form.css';
import * as  AiIcons from 'react-icons/ai';

const UserForm = (props) => {
    const authContext = useContext(AuthenticationContext)
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [active, setActive] = useState("true")
    let [createError, setCreateError] = useState("")
   
    async function onCreateClicked() {
        let currentDate = new Date();
        let userToCreate = {
            username, 
            password,
            // userLevel,
            active,
            dateAdded : currentDate,
            lastUpdateDate : currentDate
        }
        // console.log('Creating a User:', userToCreate )
       
        try { 
            let stupid='/api/user';
            
            if(props.homePageFlag){
                stupid = '/api/register';
            }

            let createResponse = await fetch(`${stupid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userToCreate)

            })
            // console.log('Creating a user:', userToCreate )

            if (createResponse.status === 200) {
                props.onUserFormClick("Success");
                 
                // logon the new user if on home page
                if(props.homePageFlag) authContext.logIn(username, password)

                setUsername("");
                setPassword("")
                setActive("true");                
            }

            // the server didn't like the data for some reason
            // console.log('Create response is:', createResponse)
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
            console.error('Fetch failed to reach the server:', error)
        }
    }

    const onInputChange = (event, setFunction) => {
        // console.log('event: ', event)
        // console.log('Changing input to be ', event.target.value)
        setFunction(event.target.value);   
    };

    const onClickAdd = ()=>{
        onCreateClicked();
        props.setTrigger(false);   
    }

    let createUserDataInvalid = !username || (username.trim().length === 0)

    return (props.trigger)? (
        <div className="createform">
            <div className="popup-in-signUp">
                <h4>Sign Up</h4>
                <button className="closebtn" onClick={()=>props.setTrigger(false)}><AiIcons.AiOutlineClose/></button>
                {props.children}
                <div>
                    <label htmlFor="username">Username:</label>
                    <input id="username" value={username} onChange={(event) => onInputChange(event,setUsername)}/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" value={password} placeholder="Enter Password" onChange={(event)=> onInputChange(event,setPassword)}/>
                </div>

                {props.homePageFlag ? (null) : 
                    (<>                
                        <div>
                            <label htmlFor="active">Active:</label>                
                            <select value={active} onChange={(event) => onInputChange(event, setActive)}>
                                <option value="true">true</option>
                                <option value="false">false</option>
                            </select>
                        </div>
                    </>
                    )
                }  
                <br/>            
                <button disabled={ createUserDataInvalid } onClick={ onClickAdd } >Add User</button>
                { createError && <div>{createError}</div> }  
            </div>          
        </div>
    ): "";
}
 
export default UserForm;