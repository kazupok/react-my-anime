import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
// useContext
import { useReviewData } from "contexts/data/ReviewDataContext";
// commponents
import {
  TitleLabel,
  ReviewWriteButtonIcon,
  TrashButtonIcon,
  OutlineClosedButtonIcon,
} from "pages/components/index";
import {
  CustomButtonOnClick,
  CustomTextArea,
  EditRating,
} from "components/index";

const EditReview = ({ userReview, userId, animeId, setIsOpenEditReview }) => {
  const { addReviewData, updateReviewData, deleteReviewData } = useReviewData();
  const [star, setStar] = useState(1);
  const [comment, setComment] = useState("");

  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleUpdateReviewData = () => {
    const newUserReview = {
      user: userId,
      anime: animeId,
      star: star,
      comment: comment,
    };
    console.log(newUserReview);
    userReview
      ? updateReviewData(userReview.id, newUserReview)
      : addReviewData(newUserReview);
    handleCloseEditReview();
  };

  const handledeleteReviewData = () => {
    if (userReview?.id) {
      deleteReviewData(userReview.id);
      handleCloseEditReview();
      setStar(1);
      setComment("");
      setShowDeleteButton(false);
    }
  };

  const handleCloseEditReview = () => {
    setIsOpenEditReview(false);
  };

  useEffect(() => {
    if (userReview?.id) {
      setStar(userReview.star);
      setComment(userReview.comment);
      setShowDeleteButton(true);
    }
  }, [userReview]);

  return (
    <Container style={{ padding: "2rem", position: "relative" }}>
      <Row>
        <Col>
          <div style={{ textAlign: "right", paddingBottom: "1rem" }}>
            <OutlineClosedButtonIcon onClick={handleCloseEditReview} />
          </div>
        </Col>
      </Row>
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
              <EditRating rating={star} setHandler={setStar} size={"l"} />
            </div>
            <TitleLabel title={star} size={"m"} />
          </div>
        </Col>
      </Row>
      <Row>
        <hr />
      </Row>
      {showDeleteButton ? (
        <Row>
          <Col>
            <div style={{ textAlign: "right" }}>
              <TrashButtonIcon onClick={handledeleteReviewData} />
            </div>
          </Col>
        </Row>
      ) : (
        <></>
      )}
      <Row style={{ padding: "1.5rem" }}>
        <Col>
          <div style={{ position: "relative" }}>
            <CustomTextArea
              id="comment"
              placeholder="コメント"
              name="comment"
              type="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="radius-input text-area-input"
              backgroundColor="transparent"
              borderColor="white"
              color="white"
              placeholderColor="grey"
              rows={5}
            />
            <ReviewWriteButtonIcon onClick={handleUpdateReviewData} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EditReview;
