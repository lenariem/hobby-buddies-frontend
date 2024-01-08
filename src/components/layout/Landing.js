import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Landing = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    if (isAuthenticated) {
        <Navigate to="/dashboard" />;
    }
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Find your Hobby Buddy</h1>
                    <p className="lead">
                        Create a profile/portfolio, share posts and
                        get connected with interesting people
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">
                            Sign Up
                        </Link>
                        <Link to="/login" className="btn btn-light">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
