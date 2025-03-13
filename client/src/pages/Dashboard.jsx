import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../features/Dashborad/DashSidebar";
import DashProfile from "../features/Dashborad/DashProfile";
import DashPosts from "../features/Dashborad/DashPosts";
import DashUsers from "../features/Dashborad/DashUsers";
import DashComments from "../features/Dashborad/DashComments";
import DashboardComponent from "../features/Dashborad/DashboardComponent";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* Profile */}
      {tab === "profile" && <DashProfile />}
      {/* Posts */}
      {tab === "posts" && <DashPosts />}
      {/* Users */}
      {tab === "users" && <DashUsers />}
      {/* Comments */}
      {tab === "comments" && <DashComments />}
      {/* Dashboard component */}
      {tab === "dash" && <DashboardComponent />}
    </div>
  );
};

export default Dashboard;
