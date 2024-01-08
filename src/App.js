import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Landing } from "./components/layout/Landing";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Dashboard } from "./components/dashboard/Dashboard";
import { ProfileForm } from "./components/profile-forms/ProfileForm";
import { AddExperience } from "./components/profile-forms/AddExperience";
import { AddEducation } from "./components/profile-forms/AddEducation";
import { Profiles } from "./components/profiles/Profiles";
import { Profile } from "./components/profile/Profile";
import { Posts } from "./components/posts/Posts";
import { NotFound } from "./components/layout/NonFound";
import { Post } from "./components/post/Post";
import Alert from "./components/layout/Alert";
import PrivateRoute from "./components/routing/PrivateRoute";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser);
    }, []);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Navbar />
                <Alert />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profiles" element={<Profiles />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route
                        path="/dashboard"
                        element={<PrivateRoute element={Dashboard} />}
                    />
                    <Route
                        path="/create-profile"
                        element={<PrivateRoute element={ProfileForm} />}
                    />
                    <Route
                        path="/edit-profile"
                        element={<PrivateRoute element={ProfileForm} />}
                    />
                    <Route
                        path="/add-experience"
                        element={<PrivateRoute element={AddExperience} />}
                    />
                    <Route
                        path="/add-education"
                        element={<PrivateRoute element={AddEducation} />}
                    />
                    <Route
                        path="/posts"
                        element={<PrivateRoute element={Posts} />}
                    />
                     <Route
                        path="/posts/:id"
                        element={<PrivateRoute element={Post} />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
