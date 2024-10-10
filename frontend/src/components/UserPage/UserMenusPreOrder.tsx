import truck from "../../assets/icons/truckIcon.svg";
import Button from "../common/Button";





export default function UserMenusPreOrder() {
    return (
        <div className="w-[283px] h-[488px] px-5 pt-6 pb-11 border border-[#CECECE] rounded-[10px]">
            <div className="mb-6 flex flex-col justify-center items-center gap-[15px]">
                <input placeholder="Calories" className="w-full py-[10px] ps-4 outline-none text-sm text-[#7C7C7C] font-normal border border-[#E7E7E7] rounded-[13px] focus:border-[#7C7C7C] focus:shadow-[0_0_2px_0_rgb(124,124,124)]"/>
            
                <input placeholder="Number of days" className="w-full py-[10px] ps-4 outline-none text-sm text-[#7C7C7C] font-normal border border-[#E7E7E7] rounded-[13px] focus:border-[#7C7C7C] focus:shadow-[0_0_2px_0_rgb(124,124,124)]" />

                <input placeholder="First delivery date" className="w-full py-[10px] ps-4 outline-none text-sm text-[#7C7C7C] font-normal border border-[#E7E7E7] rounded-[13px] focus:border-[#7C7C7C] focus:shadow-[0_0_2px_0_rgb(124,124,124)]" />

                <input placeholder="Delivery interval" className="w-full py-[10px] ps-4 outline-none text-sm text-[#7C7C7C] font-normal border border-[#E7E7E7] rounded-[13px] focus:border-[#7C7C7C] focus:shadow-[0_0_2px_0_rgb(124,124,124)]" />
            </div>

            <hr className="w-full mb-[27px]" />

            <div className="flex flex-row justify-between items-baseline">
                <span className="text-sm font-medium leading-[120%]">
                    Order Amount
                </span>

                <span className="text-2xl font-semibold leading-[120%]">
                    1 756 &#x24;
                </span>
            </div>

            <div className="my-5 flex flex-row items-center gap-[10px]">
                <div className="w-10 h-10 flex flex-col justify-center items-center bg-Olive rounded-full">
                    <img src={truck} />
                </div>

                <span className="text-sm font-medium leading-[120%]">
                    Free delivery on any day
                </span>
            </div>

            <Button name="Order" color="orange" />
        </div>
    )
}
