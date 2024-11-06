// React imports
import { useEffect, useRef, useState }  from    "react";


// Custom components
import Button                   from    "../common/Button";


// Helpers
import { GetCookies }           from    "../../lib/helpers";
import axios                    from    "axios";
import { BASE_URL }             from    "../../lib/constants";
import { useSetFocus } from "../../lib/hooks";





export default function RecoveryCodeScreen() {

    const wantedCookie                  =   "chefKitchenEmail"
    const [ userEmail, setUserEmail ]   =   useState<string | null>(null);

    // const [ firstDigitRef, setFirstDigitRef ] = useSetFocus();
    // const [ secondDigitRef, setSecondDigitRef ] = useSetFocus();
    // const [ thirdDigitRef, setThirdDigitRef ] = useSetFocus();
    // const [ fourthDigitRef, setFourthDigitRef ] = useSetFocus();
    // const [ fifthDigitRef, setFifthDigitRef ] = useSetFocus();
    // const [ sixthDigitRef, setSixthDigitRef ] = useSetFocus();

    useEffect(() => {
        const cookieValue = GetCookies(wantedCookie);
        setUserEmail(cookieValue);
    }, []);

    // useEffect(() => {
    //     // document.addEventListener("load", setFirstDigitRef);

    //     // return () => {
    //     //     document.removeEventListener("load", setFirstDigitRef);
    //     // }
    //     setFirstDigitRef()
    // }, [setFirstDigitRef])


    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

    useEffect(() => {
        // Устанавливаем фокус на первый input при загрузке страницы
        if (inputRefs.current[0]) {
            inputRefs.current[0]?.focus();
        }
    }, []);

    const handleInputChange = (index: number) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            if (value && index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        };
    };



    const handleClick = () => {
        let recoveryCode    =   "";


        const elem          =   document.querySelector("form#codeRecoveryForm") as HTMLFormElement;

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
            >
                <span className="w-">Enter recovery code:</span>

                <div className="w-80 flex flex-row justify-between">
                    <InputElemForogtPass nameAttr="firstDigit"  refElem={firstDigitRef}/>
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



function InputElemForogtPass({ nameAttr, refElem } : { nameAttr : string, refElem? : React.MutableRefObject<null> | (() => void) })
{
    return <input ref={refElem} type="text" pattern="[0-9]" maxLength={1} name={`${nameAttr}`} className="w-10 h-10 bg-[#FCFDFE] border border-[#E9EDF4] text-base font-['Montserrat'] text-center rounded-[4px]" />;
}
