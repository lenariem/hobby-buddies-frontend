export const ProfileAbout = ({
    profile: {
        bio,
        skills,
        user: { name },
    },
}) => (
    <section className="container">
        <div className="profile-about bg-light p-2">
            {bio && (
                <>
                    <h2 className="text-primary">
                        {name.trim().split(" ")[0]}s Bio
                    </h2>
                    <p>{bio}</p>
                    <div className="line" />
                </>
            )}
            <h2 className="text-primary">Hobbies Set</h2>
            <div className="skills">
                {skills.map((skill, index) => (
                    <div key={index} className="p-1">
                        <i className="fas fa-check" /> {skill}
                    </div>
                ))}
            </div>
        </div>
    </section>
);
