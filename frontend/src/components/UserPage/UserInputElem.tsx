type TUserInputElem = {
    label       :   string,
    valueAttr?  :   string,
    onChange?   :   (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder?:   string,
    nameAttr    :   string,
    typeAttr?   :   string,
}



export default function UserInputElem({
    label,
    valueAttr,
    onChange,
    placeholder,
    nameAttr,
    typeAttr
} : TUserInputElem)
{
    return (
        <div className="mb-[13px] flex flex-col text-base text-[#212B36]">
            <label className="mb-[10px] font-medium">
                {label}
            </label>

            <input  name={nameAttr}
                    value={valueAttr}
                    onChange={onChange}
                    type={typeAttr || "text"}
                    placeholder={placeholder}
                    className="px-[18px] py-[13px] font-normal border border-[#E7E7E7] rounded-[5px] outline-none"
            />
        </div>
    )
}