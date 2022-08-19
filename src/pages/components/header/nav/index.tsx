import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Box } from "@mui/material";

import "./nav.css";

type NavType = {
  navLinks: { url: string; name: string; icon: JSX.Element }[];
};

export default function Nav({ navLinks }: NavType) {
  const setActive = ({ isActive }: { isActive: boolean }) => (isActive ? "nav__item nav__active-item" : "nav__item");

  return (
    <Box sx={{ display: { xs: "none", sm: "flex", gap: "25px" } }} component="nav">
      <Box className="nav">
        {navLinks.map((item, index) => {
          if (index < navLinks.length - 1)
            return (
              <NavLink key={item.name} to={item.url} className={setActive}>
                {item.name}
              </NavLink>
            );
        })}
      </Box>
      <Button variant="outlined" color="secondary" component={NavLink} to={navLinks[navLinks.length - 1].url}>
        {navLinks[navLinks.length - 1].name}
      </Button>
    </Box>
  );
}
