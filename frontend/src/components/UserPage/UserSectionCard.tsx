// Custom components
import Heading4 from "../common/Heading4"



type TUserSectionCard = {
    heading: string,
    children?: React.ReactNode
}





export default function UserSectionCard({
    heading,
    children
} : TUserSectionCard)
{
    return (
        <div className="flex flex-col mt-[30px]">
            <Heading4 styling="ms-1">{heading}</Heading4>

            <div className="mt-1 px-[30px] py-[20px] flex flex-row flex-wrap gap-x-6 border border-[#D9D9D9] rounded-[10px]">
                {children}
            </div>
        </div>
    )
}
