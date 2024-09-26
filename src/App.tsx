import { Route, Routes } from "react-router-dom";
import ErrorPage from "./components/common/ErrorPage";
import MainPage from "./components/MainPage";
import RootLayout from "./layouts/RootLayout";
import { AnimatePresence } from "framer-motion";

// max-width 1200px
export default function App() {

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route  index 
                        element={<MainPage />}
                        errorElement={<ErrorPage />} 
                />

                <Route  path="/"
                        element={<RootLayout />}
                        errorElement={<ErrorPage />}
                >
                    <Route path="/home"
                            element={<MainPage />}
                            errorElement={<ErrorPage />}
                    />
                </Route>
            </Routes>
        </AnimatePresence>
    )
}
