// React imports
import { useEffect, useState }  from    "react";


// Custom components
import Button                   from    "../common/Button";


// Helpers
import { GetCookies }           from    "../../lib/helpers";
import axios                    from    "axios";
import { BASE_URL }             from    "../../lib/constants";



type TCodeForm = {
    firstDigit  :   string,
    secondDigit :   string,
    thirdDigit  :   string,
    fourthDigit :   string,
    fifthDigit  :   string,
    sixthDigit  :   string,
}





export default function RecoveryCodeScreen() {

    const wantedCookie = "chefKitchenEmail"
    const [ userEmail, setUserEmail ] = useState<string | null>(null);

    useEffect(() => {
        const cookieValue = GetCookies(wantedCookie);
        setUserEmail(cookieValue);
    }, []);


    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const handleClick = () => {

        debugger
        let recoveryCode = "";


        const elem = document.querySelector("form#codeRecoveryForm") as HTMLFormElement;
        // const emailValue = elem.value;

        // event.preventDefault();

        const target = elem as typeof elem & {
            firstDigit  :   { value: string };
            secondDigit :   { value: string };
            thirdDigit  :   { value: string };
            fourthDigit :   { value: string };
            fifthDigit  :   { value: string };
            sixthDigit  :   { value: string };
        };

        recoveryCode = target.firstDigit.value + target.secondDigit.value + target.thirdDigit.value + target.fourthDigit.value + target.fifthDigit.value + target.sixthDigit.value;


        axios.post(BASE_URL + `/Users/ForgotPassword/RecoveryCode`, { userEmail: userEmail, recoveryCode: recoveryCode }, { withCredentials: true })
            .then(response => response.data)
            .then(function() {
                window.location.href = "/forgotPassword/newPassword"
            })
            .catch(error => console.error("Error: ", error))
    }





    return (
        <div className="flex flex-col justify-center items-center">
            <form   id="codeRecoveryForm"
                    className="h-[300px] py-8 flex flex-col justify-between items-center"
                    // onSubmit={handleSubmit}
            >
                <span className="w-">Enter recovery code:</span>

                <div className="w-80 flex flex-row justify-between">
                    <InputElemForogtPass nameAttr="firstDigit" />
                    <InputElemForogtPass nameAttr="secondDigit" />
                    <InputElemForogtPass nameAttr="thirdDigit" />
                    <InputElemForogtPass nameAttr="fourthDigit" />
                    <InputElemForogtPass nameAttr="fifthDigit" />
                    <InputElemForogtPass nameAttr="sixthDigit" />
                </div>


                <Button name="Next" color="green" styling="w-max" func={handleClick} />
            </form>
        </div>
    )
}



function InputElemForogtPass({ nameAttr } : { nameAttr : string })
{
    return <input type="text" pattern="[0-9]" maxLength={1} name={`${nameAttr}`} className="w-10 h-10 bg-[#FCFDFE] border border-[#E9EDF4] text-base font-['Montserrat'] text-center rounded-[4px]" />;
}
