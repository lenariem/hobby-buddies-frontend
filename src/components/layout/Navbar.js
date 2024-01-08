import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth";

export const Navbar = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const loading = useSelector(state => state.auth.loading);
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(logout());
    };

    const authLinks = (
        <ul>
            <li>
                <NavLink to="/profiles">Community</NavLink>
            </li>
            <li>
                <NavLink to="/posts">Posts</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard">
                    <i className="fas fa-user" />{" "}
                    <span className="hide-sm">Dashboard</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/" onClick={handleClick}>
                    <i className="fas fa-sign-out-alt" />{" "}
                    <span className="hide-sm">Logout</span>
                </NavLink>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <NavLink to="/profiles">Community</NavLink>
            </li>
            <li>
                <NavLink to="/register">Register</NavLink>
            </li>
            <li>
                <NavLink to="/login">Login</NavLink>
            </li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <NavLink to="/">
                    <i className="fa-brands fa-connectdevelop"></i> Connector
                </NavLink>
            </h1>
            {!loading && isAuthenticated ? authLinks : guestLinks}
        </nav>
    );
};
