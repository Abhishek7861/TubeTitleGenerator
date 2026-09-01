function UserChip({ user }) {
    return (
        <div className="user-chip">
            <img
                className="profile-image"
                src={user.picture}
                alt={user.name}
                referrerPolicy="no-referrer"
            />
            <div className="user-chip-text">
                <span className="user-chip-name">{user.name}</span>
                <span className="user-chip-email">{user.email}</span>
            </div>
        </div>
    );
}

export default UserChip;
