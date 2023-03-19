import React, { createContext, useEffect, useState} from 'react';
import FormComponent from '../FormComponent'

export const UserContext = createContext('')

const App = () => {

    const [ userName, setUserName] = useState('');
    
    return(
        <UserContext.Provider value={{userName, setUserName}}>
        <div>
            <p></p>
            <button></button>
            <FormComponent />
        </div>
    </UserContext.Provider>
)
}