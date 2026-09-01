import { useState } from "react";
import "./Dashboard.css";

import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import TitleGeneratorView from "../features/titleGenerator/TitleGeneratorView";
import ThumbnailGeneratorView from "../features/thumbnail/ThumbnailGeneratorView";
import { useCurrentUser } from "../hooks/useCurrentUser";

const VIEW_META = {
    title: {
        eyebrow: "Title & Description",
        tagline: "Generate catchy YouTube titles, descriptions, and tags in seconds."
    },
    thumbnail: {
        eyebrow: "Thumbnail Studio",
        tagline: "Compose click-worthy thumbnails with a live 16:9 preview."
    }
};

function Dashboard() {

    const user = useCurrentUser();
    const [activeView, setActiveView] = useState("title");

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard">

            <Sidebar
                user={user}
                activeView={activeView}
                onSelectView={setActiveView}
            />

            <main className="main">

                <DashboardHeader
                    user={user}
                    eyebrow={VIEW_META[activeView].eyebrow}
                    tagline={VIEW_META[activeView].tagline}
                />

                {activeView === "title" && <TitleGeneratorView />}
                {activeView === "thumbnail" && <ThumbnailGeneratorView />}

            </main>

        </div>
    );
}

export default Dashboard;
