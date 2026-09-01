import { logout } from "../api/endpoints";

const NAV_ITEMS = [
    { id: "title",     icon: "✍️", label: "YouTube Title & Desc" },
    { id: "thumbnail", icon: "🖼️", label: "Thumbnail Generator" }
];

function Sidebar({ user, activeView, onSelectView }) {

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            window.location.href = "/login";
        }
    };

    return (
        <aside className="sidebar">

            <div className="brand">
                <span className="brand-mark">▶</span>
                Tube Title Generator
            </div>

            <nav className="sidebar-nav">
                {NAV_ITEMS.map(item => (
                    <a
                        key={item.id}
                        className={activeView === item.id ? "active" : ""}
                        onClick={() => onSelectView(item.id)}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        {item.label}
                    </a>
                ))}
            </nav>

            <div className="sidebar-profile">
                <img
                    className="sidebar-avatar"
                    src={user.picture}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                />
                <div className="sidebar-user">
                    <div className="sidebar-name">{user.name}</div>
                    <div className="sidebar-email">{user.email}</div>
                </div>
            </div>

            <div className="logout" onClick={handleLogout}>
                Logout
            </div>

        </aside>
    );
}

export default Sidebar;
