// Constants
import { BtnColors } from "../../lib/constants";



type TButton = {
    name        :   string,
    func?       :   () => void,
    color?      :   "olive" | "green" | "orange" | "darkBlue" | "white",
    rounded?    :   boolean,
    styling?    :   string,
}





export function Button({
    name,
    func,
    color,
    rounded,
    styling
} : TButton)
{
    const handleBtnClick = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        if (func) {
            func();
        }
    }



    let btnColor;
    switch(color) {
        case BtnColors.Olive: {
            btnColor = "bg-Olive hover:bg-btnGreen";
            break;
        }

        case BtnColors.Green: {
            btnColor = "bg-btnGreen hover:bg-Olive";
            break;
        }

        case BtnColors.Orange: {
            btnColor = "bg-Orange hover:bg-btnGreen";
            break;
        }

        case BtnColors.DarkBlue: {
            btnColor = "bg-btnDarkBlue hover:bg-btnGreen";
            break;
        }

        case BtnColors.White: {
            btnColor = "bg-white hover:bg-btnDarkBlue";
            break;
        }

        default: {
            btnColor = "bg-btnOlive"
            break;
        }
    }



    return (
        <button onClick={handleBtnClick}
                className={`
                    ${styling}
                    ${btnColor}
                    ${rounded ? "rounded-[32px]" : "rounded-md"}
                    w-full py-[13px] px-[77px] text-white text-sm leading-[22px] hover:scale-105 transition-all duration-300`}
        >
            {name}
        </button>
    )
}
