import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import { Experience } from "./Experience";
import { Education } from "./Education";

export const Dashboard = () => {
    const loading = useSelector(state => state.profile.loading);
    const profile = useSelector(state => state.profile.profile);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(getCurrentProfile());
    }, [dispatch]);

    return loading && profile === null ? (
        <Spinner />
    ) : (
        <section className="container">
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome {user && user.name}
            </p>
            {profile !== null ? (
                <>
                    <DashboardActions />
                    <Experience />
                    <Education />
                    <div className="my-2">
                        <button
                            className="btn btn-danger"
                            onClick={() => dispatch(deleteAccount())}
                        >
                            <i className="fas fa-user-minus" /> Delete My
                            Account
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <p>
                        You have not yet setup a profile, please add some info
                    </p>
                    <Link to="/create-profile" className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                </>
            )}
        </section>
    );
};
