import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import LoginPage from "./pages/login-page";
import WelcomePage from "./pages/welcome-page";
import Forbidden from "./pages/forbidden";
import ProtectedRoute from "./components/protected-route";
import NavbarComponent from "./components/navbar";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <NavbarComponent />
                <Routes>
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route
                        exact
                        path="welcome"
                        element={
                            <ProtectedRoute>
                                <WelcomePage />
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
