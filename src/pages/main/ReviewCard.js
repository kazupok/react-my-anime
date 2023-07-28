import React from "react";
import { Col, Container, Row } from "react-bootstrap";
// commponents
import { Rating } from "components/index";
import { TitleLabel, CommentText } from "pages/components/index";

const ReviewCard = ({ review }) => {
  return (
    <Container>
      <Row style={{ justifyContent: "flex-start" }}>
        <Col>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div style={{ marginRight: "10px" }}>
              <Rating rating={review.star} size={"l"}/>
            </div>
            <TitleLabel title={review.star} size={"m"} />
          </div>
        </Col>
      </Row>
      <Row>
        <hr />
      </Row>
      <Row style={{ padding: "1.5rem" }}>
        <CommentText title={review.comment} />
      </Row>
    </Container>
  );
};

export default ReviewCard;
