
type THeading4 = {
    styling?: string,
    children: React.ReactNode
}





export default function Heading4({
    styling,
    children
} : THeading4)
{
    return (
        <h4 className={`${styling} text-xl text-[#212B36] font-semibold leading-[30px]`}>
            {children}
        </h4>
    )
}
