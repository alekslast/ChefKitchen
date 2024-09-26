// Custom components
import { useLoginMethodStore } from "../../stores/loginMethodStore";
import LoginBtn from "./LoginBtn";









export default function DefaultScreen() {

    const { setPhoneLogin } = useLoginMethodStore();

    return (
        <>
            <span className="mb-8 text-[24px] leading-[22px] font-medium">
                Вы впервые делаете заказ?
            </span>

            <div className="flex flex-col gap-4">
                <LoginBtn name="Я уже заказывал на Chef Kitchem" func={setPhoneLogin} />
                <LoginBtn name="Это мой первый заказ" />
            </div>
        </>
    )
}
