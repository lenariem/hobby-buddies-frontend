import React from "react";
import { useDispatch, useSelector } from "react-redux";
import formatDate from "../../utils/formatDate";
import { deleteExperience } from "../../actions/profile";

export const Experience = () => {
    const dispatch = useDispatch();
    const experience = useSelector(state => state.profile.profile.experience);
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : "Now"}
            </td>
            <td>
                <button
                    onClick={() => dispatch(deleteExperience(exp._id))}
                    className="btn btn-danger"
                >
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        <>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company / Team</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </>
    );
};
