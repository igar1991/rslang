import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import HomeIcon from "@mui/icons-material/Home";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import SignalCellularAltRoundedIcon from "@mui/icons-material/SignalCellularAltRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import Nav from "./nav";
import MobileNav from "./mobile-nav";

import "./header.css";
import { Container } from "@mui/system";

const NAV_LINKS = [
  { url: "/", name: "Main", icon: <HomeIcon /> },
  { url: "/vocabulary", name: "Vocabulary", icon: <AutoStoriesOutlinedIcon /> },
  { url: "/games", name: "Games", icon: <SportsEsportsIcon /> },
  { url: "/statistics", name: "Statistics", icon: <SignalCellularAltRoundedIcon /> },
];

const LOG_IN_LINK = { url: "/authorization", name: "Sign In", icon: <LoginRoundedIcon /> };
const LOG_OUT_LINK = { url: "/authorization", name: "Sign Out", icon: <LogoutRoundedIcon /> };

export default function Header(): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = localStorage.getItem("user") ? NAV_LINKS.concat(LOG_OUT_LINK) : NAV_LINKS.concat(LOG_IN_LINK);

  const onMobileBtnClick = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar
        color="transparent"
        position="relative"
        sx={{ boxShadow: "none", backgroundColor: "var(--backgroundColor)", py: 2 }}
      >
        <Container sx={{ display: "flex" }}>
          <Typography sx={{ flexGrow: 1 }}>
            <NavLink to="/">
              <img src="assets/logo.png" alt="logo" />
            </NavLink>
          </Typography>

          <IconButton onClick={onMobileBtnClick} sx={{ display: { sm: "none" } }}>
            <MenuIcon className="nav__icon" />
          </IconButton>

          <Nav navLinks={navLinks} />
        </Container>
      </AppBar>

      <Box component="nav">
        <MobileNav mobileOpen={mobileOpen} onMobileBtnClick={onMobileBtnClick} navLinks={navLinks} />
      </Box>
    </>
  );
}
