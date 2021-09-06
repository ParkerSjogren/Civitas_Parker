import { useEffect, useState } from 'react'
import AuthenticationContext from './AuthenticationContext'
import 'bootstrap/dist/css/bootstrap.css'

const AuthenticationProvider = ({ children }) => {
    let [username, setUsername] = useState()
    let [id,setId] = useState()
    let [navbarAccess, setNavbarAccess] = useState()
    let [member, setMember] = useState()
    let [loading, setLoading] = useState(true);

    const reEstablishConnection = async () => {
        if (!isLoggedIn()) {
            try {
                let response = await fetch('/api/auth/loggedInUser')
                if (response && response.ok) {
                    const data = await response.json()
                    if (data._id) {
                        setContextData(data._id, data.username)
                    }
                }
            } catch (error) { 
                console.log("AuthenticationProvider error 21: ",error)
            }
        }
        setLoading(false);
    }

    const setContextData = async(id, username) =>{
        let newNavbarAccess=false
        let memberRecord={}
        let response=undefined
    
        if (id){
            response= await fetch(`/api/auth/member/${id}`)
            memberRecord= await response.json()
    
            if(memberRecord.username){
              let j=0
              for(j=0;j<memberRecord.communityDetail.length;j++){                    
                  if (memberRecord.communityDetail[j].userLevel.level===1) newNavbarAccess=true
              }                      
          }
        }
        setUsername(username)
        setId(id)
        setNavbarAccess(newNavbarAccess)
        setMember(memberRecord)
    }

    const logIn = (username, password) => {
        async function logintoserver() {
            let loginOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            }
            let response = await fetch('/api/auth/login', loginOptions)

            if (response.status !==200) alert("Invalid Username/Password")

            let loggedInUser = await response.json()
            
            setContextData(loggedInUser._id, loggedInUser.username) 
        }
        logintoserver()
    }

    const logOut = async() => {
        if (isLoggedIn()) {
            try {
                let response = await fetch('/api/auth/logout');

                if(!response.ok) {
                    console.log("AuthenticationProvider trouble logging out")
                }
            } catch (error) {
            }
    
        }
        setUsername(undefined)
        setId(undefined)
        setNavbarAccess(undefined)
        setMember(undefined)
    }

    let contextValue = {
        username,
        id,
        navbarAccess,
        member,
        logIn,
        logOut
    }

    const isLoggedIn = () => {
        return contextValue.id;
    }
    
    useEffect(() => { reEstablishConnection() }, []);

    return (
        <AuthenticationContext.Provider value={ contextValue }>
            {
                loading ?
                (<div className="text-center"> 
                    <span>
                        <h1><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>loading...</h1>
                    </span>
                    <br></br>
                 </div>)
                :
                (children)
            }
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationProvider
