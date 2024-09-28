type THeading2 = {
    children: string
}

export default function Heading2({ children } : THeading2)
{
    return (
        <h2 className="uppercase text-black text-[32px] font-bold leading-[120%]">
            {children}
        </h2>
    )
}
