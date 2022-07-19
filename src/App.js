import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";

import CustomModal from "./components/custom-modal";
import NavbarComponent from "./components/navbar";
import ProtectedRoute from "./components/protected-route";

import LoginPage from "./pages/login-page";
import ProfilePage from "./pages/profile-page";
import Forbidden from "./pages/forbidden";
import RegisterPage from "./pages/register-page";
import { modalSelector } from "./store/modal/selectors";
import { CreateMoviePage } from "./pages/create-movie-page";
import { MoviePage } from "./pages/movie-page";

function App() {
    const loginModal = useSelector(modalSelector);

    console.warn = () => {};

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
                    <Route
                        exact
                        path="movies/create"
                        element={
                            <ProtectedRoute>
                                <CreateMoviePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        exact
                        path="movie/:id"
                        element={
                            <ProtectedRoute>
                                <MoviePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route exact path="/forbidden" element={<Forbidden />} />
                </Routes>
                <CustomModal data={loginModal} />
            </BrowserRouter>
        </div>
    );
}

export default App;
