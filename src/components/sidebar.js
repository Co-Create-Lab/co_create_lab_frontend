import React from "react";
import { NavLink } from "react-router-dom";
import { Avatar } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
const Sidebar = () => {
  const { user, loading } = useContext(AuthContext);
  // AVATAR
  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        height: 50,
        width: 50,
        fontSize: "2rem",
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }
  return (
    <div className="sidebar border border-info">
      <div className="row">
        <div>home</div>
        <div>bookmark</div>
        <div>dashboard</div>
        <div>add project</div>
        <div>logo</div>
      </div>
    </div>
  );
};

export default Sidebar;
