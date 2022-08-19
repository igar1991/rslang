import React from "react";
import { Container } from "@mui/material";
import Banner from "./banner";
import Advantages from "./advantages";

import "./main.css";

export default function Main() {
  return (
    <Container component="main">
      <Banner />
      <Advantages />
    </Container>
  );
}
