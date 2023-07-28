import React from "react";
import AnimeCard from "pages/main/AnimeCard";

const HorizontalCollection = ({ animeData }) => {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    overflowY: "hidden",
    overflowX: "hidden",
    whiteSpace: "nowrap",
    paddingLeft:"50px",
  };

  const cardStyle = {
    margin: "0 5px",
  };

  return (
    <div style={containerStyle}>
      {animeData.map((anime) => (
        <div key={anime.id} style={cardStyle}>
          <AnimeCard anime={anime} />
        </div>
      ))}
    </div>
  );
};

export default HorizontalCollection;
