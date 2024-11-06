import axios from "axios";
import Button from "../common/Button";
import { BASE_URL } from "../../lib/constants";
import { GetCookies } from "../../lib/helpers";


export default function ResetPasswordScreen() {

    const emailCookie = "chefKitchenEmail";
    const codeCookie = "chefKitchenCode";

    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const handleClick = () => {
        // event.preventDefault();

        debugger
        const elem = document.querySelector("form#resetPassForm") as HTMLFormElement;

        // const target = elem as typeof elem & {
        //     newPassword     :   HTMLInputElement,
        //     confirmPassword :   HTMLInputElement,
        // }

        const userEmail = GetCookies(emailCookie);
        const recoveryCode = GetCookies(codeCookie);

        axios.post(
            BASE_URL + "/Users/ForgotPassword/ResetPassword",
            {
                userEmail       : userEmail,
                recoveryCode    : recoveryCode,
                newPassword     : elem[0].value,
                confirmPassword : elem[1].value
            },
            { withCredentials: true }
        )
        .then(response => response.data)
        .then(function () {

        })
        .catch(error => console.log("Error: ", error))
    }

    return (
        <form   id="resetPassForm"
                className="flex flex-col justify-center items-center mt-16 mb-7"
        >
            <div className="w-full flex flex-col mb-5">
                <label>New Password:</label>
                <input type="newPassword" className="w-full py-2 px-5 bg-[#FCFDFE] border border-[#E9EDF4] rounded-[6px] text-base font-['Montserrat']" />
            </div>

            <div className="w-full flex flex-col mb-5">
                <label>Confirm Password:</label>
                <input type="confirmPassword" className="w-full py-2 px-5 bg-[#FCFDFE] border border-[#E9EDF4] rounded-[6px] text-base font-['Montserrat']" />
            </div>

            <Button name="Change Password" color="olive" func={handleClick} />
        </form>
    )
}
