import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <section className="container">
            <h1 className="x-large text-primary">
                <i className="fas fa-exclamation-triangle" /> Page Not Found
            </h1>
            <p className="large">Sorry, this page does not exist</p>
            <Link to="/" className="btn btn-primary my-1">
                Go back to main page
            </Link>
        </section>
    );
};
