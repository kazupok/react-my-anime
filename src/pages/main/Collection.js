import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";

import AnimeCard from "pages/main/AnimeCard";

const Collection = ({ animeData }) => {
  return (
    <Container>
      <Row xs={1} md={2} lg={4} className="g-4">
        {animeData.map((anime) => (
          <Col key={anime.id}>
            <AnimeCard anime={anime} height={"300px"} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Collection;
