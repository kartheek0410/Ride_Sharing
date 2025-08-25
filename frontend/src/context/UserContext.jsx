import React from 'react';

export const UserDataContext = React.createContext();

function UserContext({children}){
    const [user,setUser] = React.useState({
        email:'',
        firstName:'',
        lastName:''
    });

    return (
        <UserDataContext.Provider value={{user,setUser}}>
            {children}
        </UserDataContext.Provider>
    );

}

export default UserContext;