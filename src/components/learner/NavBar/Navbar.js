import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
// import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import styles from "./Navbar.module.css";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { NavLink, useNavigate } from "react-router-dom";
import SquareIcon from "@mui/icons-material/Square";
import Logo from "../../../utils/assets/logo.png";
import LinkedIn from "@mui/icons-material/LinkedIn";
import Twitter from "@mui/icons-material/Twitter";
import SearchBar from "../../learner/Courses/SearchBar/SearchBar";
import AvatarMenu from "./AvatarMenu";
import EmailIcon from '@mui/icons-material/Email';
import AddIcon from '@mui/icons-material/Add';
import NotificationMenu from "./NotificationMenu";

function Navbar({ setSearchQuery }) {
  const navItems = ["Home", "enrolled","recommended", "OBE-Sheet"];
  const routeItems = ["/home", "/enrolled", "/recommended", "/obe-sheet"];
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <>

      {user.status != false ?
        <div>
          <div
            className={styles["header"]}
          >
            <div className={styles["logo-nav"]}>

              <p className={styles["logo"]}>
                <img src={Logo} width="105vh" height="40vh" alt="" />
              </p>
              <h1 style={{ color: 'white', marginLeft: '10px' }}>

              </h1>
            </div>
            <ul className={styles["signin-up"]}>
              <Box sx={{ mr: 1 }}>
                {navItems.map((item, index) => (
                  <Button
                    key={item}
                    sx={{
                      color: "#fff",
                      fontSize: "1.2rem",
                      textDecoration: "none",
                      mr: "25px",
                      width: '18vh'
                    }}
                  >
                    <NavLink
                      className={() =>
                        styles["not-active"]
                      }
                      to={routeItems[index]}
                      style={{ textDecoration: "none" }}
                    >

                      {item}
                    </NavLink>
                  </Button>
                ))}
              </Box>
              <div style={{ marginTop: '1vh' }}>
                <SearchBar setSearchQuery={setSearchQuery} />
              </div>
              {/* <EmailIcon onClick={() => navigate('/chats')} style={{ cursor: 'pointer', color: "white", marginTop: '2vh', marginLeft: '2vh' }} /> */}

              {/* <NotificationsIcon style={{ color: "white", marginTop: '2vh', marginLeft: '2vh' }} /> */}
              {/* <NotificationMenu /> */}
              <AvatarMenu />
            </ul>
          </div>
          <div style={{ backgroundColor: "black", color: 'aqua', }}>
            {/* <h3 style={{ color: 'white', paddingBottom: '1vh' }}></h3> */}
            <Grid container spacing={7} padding={1} justifyContent="center" onClick={() => navigate("/login")}>

              <Grid item style={{ color: 'white' }}>
                <h3>Services:</h3>
              </Grid>
              <Grid item>
                | Course Record Management |
              </Grid>
              <Grid item>
                | Personal Record Management |
              </Grid>
              <Grid item>
                | OBE Analysis |
              </Grid>

              <Grid item>
                | Visualization |
              </Grid>
              <Grid item>
                | Learning Path Recommendation |
              </Grid>
              <Grid item>
                | Counseling Service |
              </Grid>
            </Grid>
            {/* </Grid> */}
          </div>
        </div>
        :
        <>
        </>
      }
    </>
  );
}

export default Navbar;
