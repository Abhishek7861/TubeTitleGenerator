import UserChip from "./UserChip";

function DashboardHeader({ user, eyebrow, tagline }) {

    const firstName = user.name.split(" ")[0];

    return (
        <header className="header">

            <div className="hero">
                <span className="hero-eyebrow">{eyebrow}</span>
                <h1>Welcome back, {firstName}</h1>
                <p>{tagline}</p>
            </div>

            <UserChip user={user} />

        </header>
    );
}

export default DashboardHeader;
