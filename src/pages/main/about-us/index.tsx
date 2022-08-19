import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/material";

import "./about.css";

const DEVELOPERS = [
  {
    name: "Anastasiya Sazonava",
    github: "nensty",
    description:
      "Start your learning from the most common words that can provide you with the vocabulary you need to hold basic conversations.",
  },
  {
    name: "Ihar Charnyshou",
    github: "igar1991",
    description:
      "Start your learning from the most common words that can provide you with the vocabulary you need to hold basic conversations.",
  },
  {
    name: "Natalia Chinarova",
    github: "philonena",
    description:
      "Start your learning from the most common words that can provide you with the vocabulary you need to hold basic conversations.",
  },

];

export default function About() {
  return (
    <Box>
      <h2 className="section-title">What about team?</h2>

      <Box sx={{display: {xs: "block", sm: "flex"}}}>
        {DEVELOPERS.map((dev) => (
          <Card key={dev.name} className="card">
            <CardMedia
              component="img"
              sx={{ width: "40%", height: { xs: "100%", sm: "auto" } }}
              
              image={`assets/${dev.github}.jpg`}
              alt={dev.name}
            />
            <CardContent>
              <h3 className="card__title">{dev.name}</h3>
              <p className="card__text">{dev.description}</p>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
