import axios from "axios";
import { BASE_URL } from "../../lib/constants";
import { useState } from "react";


export default function ForgotPassword() {

    const [ userEmail, setUserEmail ] = useState();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        debugger
        event.preventDefault();

        const emailValue = event.target.userEmail.value;

        axios.get(BASE_URL + `/Users/ForgotPassword/RecoveryCode/${emailValue}`, { withCredentials: true })
            .then(response => response.data)
            .then(data => {
                setUserEmail(data);
                window.location.href = "/forgotPassword/code";
            })
            .catch(error => console.error('Error refreshing token:', error))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter your email</label>
                <input type="email" name="userEmail" />

                <input type="submit" value="Next" />
            </form>
        </div>
    )
}
