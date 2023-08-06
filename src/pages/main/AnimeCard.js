import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
// useContext
import { useCustomTheme } from "contexts/CustomThemeContext";
import { useReviewData } from "contexts/data/ReviewDataContext";
import { useModal } from "contexts/ModalContext";
// components
import { Rating } from "components/index";
import { ReleaseYearLabel, TitleLabel } from "pages/components/index";
// hooks
import { useHover, useHoverScale } from "hooks/index";
// utils
import { sortData, averageData } from "utils/index";

import AnimeDetails from "pages/main/AnimeDetails";

const AnimeCard = ({
  anime,
  width,
  height,
  showDetails = true,
  onHoverScaleUp = true,
}) => {
  const theme = useCustomTheme().customTheme;
  const { openModal } = useModal();
  const { reviewData, filterReviewDataIncluded } = useReviewData();
  const [reviews, setReviews] = useState([]);

  const ref = useRef();
  const isHovered = useHover(ref, true);
  const scaleUpStyle = useHoverScale(isHovered && onHoverScaleUp, 1.1, 0.5, 3);

  useEffect(() => {
    const filterReviewData = () => {
      const filterReview = filterReviewDataIncluded([anime.id], "anime");
      if (filterReview) {
        setReviews(sortData(filterReview, "timestamp", "desc"));
      } else {
        setReviews([]);
      }
    };

    filterReviewData();
  }, [reviewData]);

  const handleClick = () => {
    openModal(<AnimeDetails anime={anime} />, "custom-modal-anime-details");
  };

  const cardImageHeight = () => {
    if (showDetails) {
      return `${parseInt(height, 10) - 120}px`;
    } else {
      return "100%";
    }
  };

  return (
    <div
      style={{
        ...theme.card,
        ...scaleUpStyle,
        cursor: "pointer",
        width: width,
        height: height,
        borderRadius: "0",
        margin: "2px",
      }}
      onClick={handleClick}
      ref={ref}
    >
      {showDetails ? (
        <div>
          <div
            style={{
              width: "100%",
              height: cardImageHeight(),
              backgroundImage: `url(${anime.image_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Container
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <Row style={{ flex: 1, paddingLeft: "10px" }}>
              <TitleLabel title={anime.title} size="m" />
            </Row>
            <Row
              style={{
                flex: 1,
                textAlign: "right",
                padding: "20px 10px 0px 0px",
              }}
              className="d-flex justify-content-end"
            >
              <Col xs="auto">
                <Rating rating={averageData(reviews, "star")} />
              </Col>
              <Col xs="auto">
                <ReleaseYearLabel year={anime.release_year} />
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: cardImageHeight(),
            backgroundImage: `url(${anime.image_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Container
            style={{
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.2s linear",
              position: "absolute",
              bottom: 0,
              padding: "10px",
              width: "100%",
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.1))",
              color: "white",
            }}
          >
            <Row style={{ paddingLeft: "10px" }}>
              <TitleLabel title={anime.title} size="m" />
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default AnimeCard;
