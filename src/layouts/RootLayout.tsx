// React imports
import { Outlet } from "react-router-dom";


// Custom components
import Navbar from "../components/common/Navbar";





export default function RootLayout() {
    return (
        <div className="w-screen flex flex-col justify-center items-center">
            <Navbar />
            
            {/* <main className="flex flex-row justify-center items-center"> */}
                <Outlet />
            {/* </main> */}
        </div>
    )
}
