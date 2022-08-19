import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Unstable_Grid2";

import "./advantages.css";

const CARDS = [
  {
    title: "Vocabulary",
    description:
      "Start your learning from the most common words that can provide you with the vocabulary you need to hold basic conversations.",
    img: "/assets/vocabulary.png",
  },
  {
    title: "Statistics",
    description:
      "Stay focused and track your learning progress every day. Get the longest combination of correct answers and share it with your friends.",
    img: "/assets/statistics.png",
  },
  {
    title: "Training",
    description:
      "Mark the most complicated words with “Complicated” label and be able to train it once again to increase retention of new words.",
    img: "/assets/training.png",
  },
  {
    title: "Games",
    description:
      "Effective learning might be not boring! Play our mini games, train your skills and have fun in learning.",
    img: "/assets/games.png",
  },
];

export default function Advantages() {
  return (
    <Grid
      component="section"
      container
      spacing={4}
      sx={{ backgroundImage: { sm: `url(${"/assets/advantages.png"})` } }}
      className="advantages"
    >
      <Grid xs={12} sm={6} md={12}>
        <h2 className="section-title">What about advantages?</h2>
      </Grid>

      <Grid xs={12} sm={6} md={8} className="advantages__cards">
        {CARDS.map((card) => (
          <Card key={card.title} className="card">
            <CardMedia component="img" sx={{ width: "40%", height: {xs: "100%", sm: "auto"} }} image={card.img} alt={card.title} />
            <CardContent>
              <h3 className="card__title">{card.title}</h3>
              <p className="card__text">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
}
