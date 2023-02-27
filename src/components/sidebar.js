import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
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
    <div className="">
      <div
        className="border border-primary"
        style={{
          //   display: "flex",
          height: "70vh",
          //   overflow: "scroll initial",
        }}
      >
        <CDBSidebar
          textColor="#fff"
          backgroundColor="#FF0000"
          breakpoint={300}
          maxWidth="200px"
          minWidth="80px"
        >
          <CDBSidebarHeader
            prefix={<i className="fa fa-bars fa-small"></i>}
            className="border border-warning"
          >
            {/* <a
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              Sidebar
            </a> */}
            <div>
              <Stack direction="row" className="border border-info ms-4">
                {user?.username && (
                  <Avatar alt="username" {...stringAvatar(user?.username)} />
                )}
              </Stack>
            </div>
          </CDBSidebarHeader>
          <CDBSidebarContent className="sidebar-content border border-info">
            <CDBSidebarMenu>
              <NavLink to="/" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="columns">
                  Dashboard
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/tables" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="table">Tables</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/profile" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="user">
                  Profile page
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/analytics" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="chart-line">
                  Projects
                </CDBSidebarMenuItem>
              </NavLink>

              <NavLink
                to="/hero404"
                target="_blank"
                activeclassname="activeClicked"
              >
                <CDBSidebarMenuItem icon="exclamation-circle">
                  404 page
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div
              className="sidebar-btn-wrapper"
              style={{
                padding: "20px 5px",
              }}
            >
              Sidebar Footer
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    </div>
  );
};

export default Sidebar;
