import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { createProfile, getCurrentProfile } from "../../actions/profile";

export const ProfileForm = () => {
    const initialState = {
        company: "",
        website: "",
        location: "",
        status: "",
        skills: "",
        bio: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        youtube: "",
        instagram: "",
    };

    const [formData, setFormData] = useState(initialState);
    const [displaySocialInputs, toggleSocialInputs] = useState(false);
    const creatingProfile = useMatch("/create-profile");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile.profile);
    const loading = useSelector(state => state.profile.loading);

    useEffect(() => {
        // if there is no profile, attempt to fetch one
        if (!profile) {
            dispatch(getCurrentProfile());
        }

        // if finished loading and do have a profile, then build our profileData
        if (!loading && profile) {
            const profileData = { ...initialState };
            for (const key in profile) {
                if (key in profileData) profileData[key] = profile[key];
            }
            for (const key in profile.social) {
                if (key in profileData) profileData[key] = profile.social[key];
            }
            // the skills may be an array from API response
            if (Array.isArray(profileData.skills))
                profileData.skills = profileData.skills.join(", ");
            // set local state with the profileData
            setFormData(profileData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, getCurrentProfile, profile]);

    const {
        company,
        website,
        location,
        status,
        skills,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,
    } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        dispatch(createProfile(formData, navigate, profile ? true : false));
    };

    return (
        <section className="container">
            <h1 className="large text-primary">
                {creatingProfile ? "Create Your Profile" : "Edit Your Profile"}
            </h1>
            <p className="lead">
                <i className="fas fa-user" />
                {creatingProfile
                    ? ` Let's get some information to make your profile`
                    : " Add some changes to your profile"}
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <select name="status" value={status} onChange={onChange}>
                        <option>* Select your Status</option>
                        <option value="Amateur">Amateur</option>
                        <option value="Professional">Professional</option>
                        <option value="Manager">Manager</option>
                        <option value="Company Sport">Company Sport</option>
                        <option value="Student or Learning">
                            Student or Learning
                        </option>
                        <option value="Instructor">
                            Instructor or Teacher
                        </option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">
                        Give us an idea of where you are at the moment
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Company or Team"
                        name="company"
                        value={company}
                        onChange={onChange}
                    />
                    <small className="form-text">
                        Could be your own company or team you play for
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Website"
                        name="website"
                        value={website}
                        onChange={onChange}
                    />
                    <small className="form-text">
                        Could be your own or a company website
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={location}
                        onChange={onChange}
                    />
                    <small className="form-text">
                        City & state suggested (eg. Boston, MA)
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Skills / Hobbies"
                        name="skills"
                        value={skills}
                        onChange={onChange}
                    />
                    <small className="form-text">
                        Please use comma separated values (eg. skiing, golf,
                        singing)
                    </small>
                </div>
                <div className="form-group">
                    <textarea
                        placeholder="A short bio of yourself"
                        name="bio"
                        value={bio}
                        onChange={onChange}
                    />
                    <small className="form-text">
                        Tell us a little about yourself
                    </small>
                </div>

                <div className="my-2">
                    <button
                        onClick={() => toggleSocialInputs(!displaySocialInputs)}
                        type="button"
                        className="btn btn-light"
                    >
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>

                {displaySocialInputs && (
                    <>
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x" />
                            <input
                                type="text"
                                placeholder="Twitter URL"
                                name="twitter"
                                value={twitter}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x" />
                            <input
                                type="text"
                                placeholder="Facebook URL"
                                name="facebook"
                                value={facebook}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x" />
                            <input
                                type="text"
                                placeholder="YouTube URL"
                                name="youtube"
                                value={youtube}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x" />
                            <input
                                type="text"
                                placeholder="Linkedin URL"
                                name="linkedin"
                                value={linkedin}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x" />
                            <input
                                type="text"
                                placeholder="Instagram URL"
                                name="instagram"
                                value={instagram}
                                onChange={onChange}
                            />
                        </div>
                    </>
                )}

                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
                </Link>
            </form>
        </section>
    );
};
