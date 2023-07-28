import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import ReviewCard from "./ReviewCard";

const ReviewList = ({ reviews }) => {
  return (
    <Container>
      <Row style={{ padding: "1.5rem" }}>
        <Container>
          {reviews.map((review) => {
            return (
              <Row key={review.id} style={{ padding: "1.5rem" }}>
                <Col>
                  <ReviewCard review={review} />
                </Col>
              </Row>
            );
          })}
        </Container>
      </Row>
    </Container>
  );
};

export default ReviewList;
