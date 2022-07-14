import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import LoginPage from "./pages/login-page";
import ProfilePage from "./pages/profile-page";
import Forbidden from "./pages/forbidden";
import ProtectedRoute from "./components/protected-route";
import NavbarComponent from "./components/navbar";
import RegisterPage from "./pages/register-page";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <NavbarComponent />
                <Routes>
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/register" element={<RegisterPage />} />
                    <Route
                        exact
                        path="profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route exact path="/forbidden" element={<Forbidden />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
