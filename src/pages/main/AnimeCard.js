import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useCustomTheme } from "context/style/CustomThemeContext";
import { useModal } from "context/style/ModalContext";
import { useReviewData } from "context/data/ReviewDataContext";
import { Rating, EnlargeOnHover } from "components/index";
import { ReleaseYearLabel, TitleLabel } from "pages/components/index";
import AnimeDetails from "./AnimeDetails";

const AnimeCard = ({ anime }) => {
  const theme = useCustomTheme().customTheme;
  const { reviewData } = useReviewData();
  const { openModal } = useModal();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const filterAnimeData = () => {
      const animeReviews = reviewData?.filter(
        (data) => data.animeId === anime.id
      );
      if (animeReviews) {
        animeReviews.sort((a, b) => b.timestamp - a.timestamp);
        setReviews(animeReviews);
      } else {
        setReviews([]);
      }
    };

    filterAnimeData();
  }, [reviewData]);

  const averageReviews = () => {
    const sum = reviews.reduce((total, current) => total + current.star, 0);
    const average = sum / reviews.length;
    return average;
  };

  const handleClick = () => {
    openModal(<AnimeDetails anime={anime} />, "custom-modal-anime-details");
  };

  return (
    <EnlargeOnHover>
      <Card style={{ ...theme.card, cursor: "pointer", width: "300px", height:"300px" ,borderRadius: "0"}} onClick={handleClick}>
        <div
          style={{
            width: "100%",
            height: "200px",
            backgroundImage: `url(${anime.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Card.Body>
          <TitleLabel title={anime.title} size="m" />
          <Card.Text>
            <Container>
              <Row
                style={{ textAlign: "right", padding: "0.8rem" }}
                className="d-flex justify-content-end"
              >
                <Col xs="auto">
                  <Rating rating={averageReviews()} />
                </Col>
                <Col xs="auto">
                  <ReleaseYearLabel year={anime.releaseYear} />
                </Col>
              </Row>
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>
    </EnlargeOnHover>
  );
};

export default AnimeCard;
