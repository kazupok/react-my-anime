import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
// useContext
import { useReviewData } from "context/data/ReviewDataContext";
import { useUser } from "context/auth/UserContext";
// commponents
import { TitleLabel } from "pages/components/index";
import {
  CustomButtonOnClick,
  CustomTextArea,
  EditRating,
} from "components/index";

const EditReview = ({ userReview, animeId, setIsOpenEditReview }) => {
  const { user } = useUser();
  const { updateReviewData, deleteReviewData } = useReviewData();
  const [id, setId] = useState("");
  const [star, setStar] = useState(1);
  const [comment, setComment] = useState("");

  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleUpdateReviewData = () => {
    const now = new Date();
    const updatedData = {
      id: id,
      animeId: animeId,
      userId: user.uid,
      star: star,
      comment: comment,
      timestamp: now,
    };
    updateReviewData(updatedData);
    handleCloseEditReview();
  };

  const handledeleteReviewData = () => {
    if (userReview) {
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
    if (userReview) {
      setId(userReview.id);
      setStar(userReview.star);
      setComment(userReview.comment);
      setShowDeleteButton(true);
    } else {
      setId(user.uid + "+" + animeId);
    }
  }, [userReview, animeId]);

  return (
    <Container style={{ padding: "2rem" }}>
      <Row>
        <Col>
          <div style={{ textAlign: "right" }}>
            <CustomButtonOnClick
              backgroundColor="transparent"
              borderColor="white"
              textColor="white"
              className="text-toggle-button"
              onClick={handleCloseEditReview}
            >
              ▲閉じる
            </CustomButtonOnClick>
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
      <Row style={{ padding: "1.5rem" }}>
        <Col>
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
        </Col>
      </Row>
      <Row>
        <Col>
          <div style={{ textAlign: "center" }}>
            <CustomButtonOnClick
              backgroundColor="transparent"
              borderColor="#ffff7a"
              textColor="#ffff7a"
              className="radius-button small-button"
              onClick={handleUpdateReviewData}
            >
              書く
            </CustomButtonOnClick>
          </div>
        </Col>
      </Row>
      {showDeleteButton ? (
        <Row>
          <Col>
            <div style={{ textAlign: "right" }}>
              <CustomButtonOnClick
                backgroundColor="transparent"
                borderColor="#ff7a7a"
                textColor="#ff7a7a"
                className="radius-button ssmall-button ssmall-padding-button"
                onClick={handledeleteReviewData}
              >
                削除
              </CustomButtonOnClick>
            </div>
          </Col>
        </Row>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default EditReview;
