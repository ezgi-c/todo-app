import React, {useContext} from "react";
import { UserContext } from "./App";

const FormComponent = () => {

const defaultUser = useContext(UserContext)
// {userName, setUsername}

    return (
        <form>
            <label for='user'>User
                <input value = {defaultUser.username ?? ''} onChange={(e)=> defaultUser.setUsername(e.target.value)}/>
            </label>
        </form>
    )
}

export default FormComponent