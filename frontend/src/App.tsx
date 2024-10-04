// React imports
import { Navigate, Route, Routes }  from    "react-router-dom";
import { AnimatePresence }          from    "framer-motion";


// Layouts
import RootLayout                   from    "./layouts/RootLayout";
import AuthLayout                   from    "./layouts/AuthLayout";


// Custom components
import ErrorPage                    from    "./components/common/ErrorPage";
import MainPage                     from    "./components/MainPage/MainPage";
import Login                        from    "./components/Login/Login";
import RegisterScreen               from    "./components/Register/RegisterScreen";
import UserSettings                 from    "./components/UserPage/UserSettings";





// max-width 1200px
export default function App() {

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                {/* <Route  index 
                        element={<RootLayout />}
                        errorElement={<ErrorPage />} 
                /> */}

                <Route  path="/"
                        element={<Navigate to="/home" replace />}
                        errorElement={<ErrorPage />}
                />
                <Route  path="/"
                        element={<RootLayout />}
                        errorElement={<ErrorPage />}
                >
                    <Route  path="/home"
                            element={<MainPage />}
                            errorElement={<ErrorPage />}
                    />

                    <Route  path="/user"
                            element={<UserSettings />}
                            errorElement={<ErrorPage />}
                    />
                        
                </Route>

                <Route  path="/auth"
                        element={<AuthLayout />}
                        errorElement={<ErrorPage />}
                >
                    <Route  path="/auth/login"
                            element={<Login />}
                    />

                    <Route  path="/auth/register"
                            element={<RegisterScreen />}
                    />
                </Route>
            </Routes>
        </AnimatePresence>
    )
}
