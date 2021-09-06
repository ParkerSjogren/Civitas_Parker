import React from 'react'

const AuthenticationContext = React.createContext({
    username: "",
    id: "",
    navbarAccess: false,
    member: {},
    logIn: (username, password) => {},
    logOut: () => {}
})

export default AuthenticationContext