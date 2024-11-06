import axios from "axios";
import { BASE_URL } from "../../lib/constants";
import { useState } from "react";
import Button from "../common/Button";


export default function ForgotPassword() {

    const [ userEmail, setUserEmail ] = useState();

    // const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
    const handleClick = () => {

        debugger
        // event.preventDefault();

        // const target = event.target as typeof event.target & {
        //     userEmail  :  { value: string };
        // };

        // const emailValue = target.userEmail.value;

        const elem = document.querySelector("input[name='userEmail']") as HTMLInputElement;
        const emailValue = elem.value;
        // console.log(elem.value);

        axios.get(BASE_URL + `/Users/ForgotPassword/RecoveryCode/${emailValue}`, { withCredentials: true })
            .then(response => response.data)
            // .then(data => {
            //     setUserEmail(data);
            //     window.location.href = "/forgotPassword/code";
            // })
            .then(function() {
                window.location.href = "/forgotPassword/code";
            })
            .catch(error => console.error('Error refreshing token:', error))
    }

    



    return (
        <form   className="">
            <label>Enter your email</label>
            <input type="email" name="userEmail" className="w-full py-2 px-5 bg-[#FCFDFE] border border-[#E9EDF4] rounded-[6px] text-base font-['Montserrat']" />

            <Button name="Next" color="olive" func={handleClick} />
        </form>
    )
}
