import React, { useContext, useState } from "react";
import SideBar from "../layouts/SideBar";
import MyBlogs from "../miniComponents/MyBlogs";
import MyProfile from "../miniComponents/MyProfile";
import CreateBlog from "../miniComponents/CreateBlog";
import Chart from "../miniComponents/Chart";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const [component, setComponent] = useState("My Profile");
  const { mode, isAuthenticated, user } = useContext(Context);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  // If user is not an Author and tries to access Author-only components
  if (user && user.role !== "Author" && (component === "Create Blog" || component === "My Blogs" || component === "Analytics")) {
    setComponent("My Profile");
  }

  return (
    <section
      className={mode === "dark" ? "dark-bg dashboard" : "light-bg dashboard"}
    >
      <SideBar component={component} setComponent={setComponent} />
      {component === "My Profile" ? (
        <MyProfile />
      ) : component === "Create Blog" ? (
        <CreateBlog />
      ) : component === "Analytics" ? (
        <Chart />
      ) : (
        <MyBlogs />
      )}
    </section>
  );
};

export default Dashboard;