// AnimeDetails.js
import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
// useContext
import { useUserData } from "contexts/data/UserDataContext";
import { useReviewData } from "contexts/data/ReviewDataContext";
// commponets
import { CustomImageShadow, Rating, SlideToggle } from "components/index";
import {
  ReleaseYearLabel,
  TitleLabel,
  IconDescriptionLabel,
  DescriptionText,
  WatchedIcon,
  FavoriteIcon,
  StarIcon,
  AccentWrapper,
} from "pages/components/index";
// utils
import { averageData, toggleListItem, sortData } from "utils/index";

import ReviewList from "./ReviewList";
import EditReview from "./EditReview";

const AnimeDetails = ({ anime }) => {
  const { userData, updateUserData } = useUserData();
  const { reviewData } = useReviewData();

  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState({});

  const [isWatched, setIsWatched] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOpenEditReview, setIsOpenEditReview] = useState(false);

  const reviewSectionRef = useRef(null);

  // 対象のアニメのレビューのみフィルターし、日付が新しい順にソート
  useEffect(() => {
    const filterAnimeData = () => {
      const filteredReviews = reviewData.filter(
        (data) => data.anime === anime.id
      );
      if (filteredReviews?.length) {
        console.log(filteredReviews);
        const sortedReviews = sortData(filteredReviews, "timestamp", "desc", "time");
        setReviews(sortedReviews);
      } else {
        setReviews([]);
      }
    };
    filterAnimeData();
  }, [reviewData]);

  // 「お気に入り」と「もう見た」の状態変数を更新
  useEffect(() => {
    if (userData.id) {
      setIsWatched(userData.watched.includes(anime.id));
      setIsFavorite(userData.favorites.includes(anime.id));
    }
  }, [userData, anime.id]);

  // ユーザーのレビューがあるかの状態変数を更新
  useEffect(() => {
    setUserReview(
      reviews.find((review) => {
        return review.user === userData.user;
      })
    );
  }, [reviews, userData]);

  // 「もう見た」を更新する
  const handleToggleWatched = async () => {
    const updatedData = toggleListItem(userData.watched, isWatched, anime.id);
    await updateUserData({ watched: updatedData });
  };

  // 「お気に入り」を更新する
  const handleToggleFavorite = async () => {
    const updatedData = toggleListItem(
      userData.favorites,
      isFavorite,
      anime.id
    );
    await updateUserData({ favorites: updatedData });
  };

  // レビュー編集部分を開く
  const handleToggleOpenEditReview = () => {
    setIsOpenEditReview(true);
    if (reviewSectionRef.current) {
      reviewSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <>
      <CustomImageShadow src={anime.image_url} alt={anime.title} />
      <Container style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
        {/*メインタイトル */}
        <Row>
          <Col>
            <TitleLabel title={anime.title} size="l" />
          </Col>
        </Row>
        {/*キャッチフレーズ */}
        <Row style={{ padding: "1rem" }}>
          <TitleLabel title={anime.catch_phrase} size="m" />
        </Row>
        <Row className="justify-content-between" style={{ padding: "2rem" }}>
          <Col xs={12} md={5}>
            <Row style={{ padding: "1.5rem" }}>
              {/*レビュー */}
              <Col>
                <Rating rating={averageData(reviews, "star")} />
              </Col>
              {/*リリース年 */}
              <Col>
                <ReleaseYearLabel year={anime.release_year} />
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={7}>
            <Row style={{ padding: "1.5rem" }}>
              {/*もう見た */}
              <Col>
                <Row style={{ textAlign: "center" }}>
                  <WatchedIcon
                    toggle={isWatched}
                    onClick={handleToggleWatched}
                  />
                </Row>
                <Row style={{ padding: "0.5rem", textAlign: "center" }}>
                  <IconDescriptionLabel description={"もう見た"} />
                </Row>
              </Col>
              {/*お気に入り */}
              <Col>
                <Row style={{ textAlign: "center" }}>
                  <FavoriteIcon
                    toggle={isFavorite}
                    onClick={handleToggleFavorite}
                  />
                </Row>
                <Row style={{ padding: "0.5rem", textAlign: "center" }}>
                  <IconDescriptionLabel description={"お気に入り"} />
                </Row>
              </Col>
              {/*評価する */}
              <Col>
                <Row style={{ textAlign: "center" }}>
                  <StarIcon
                    toggle={userReview}
                    onClick={handleToggleOpenEditReview}
                  />
                </Row>

                <Row style={{ padding: "0.5rem", textAlign: "center" }}>
                  <IconDescriptionLabel description={"評価する"} />
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <AccentWrapper styleName={"accentColor1"}>
        <Container>
          {/*ストーリー */}
          <Row style={{ padding: "1rem" }}>
            <Col>
              <Row style={{ padding: "0.5rem" }}>
                <TitleLabel title={"ストーリー"} size="m" />
              </Row>
              <Row style={{ padding: "1rem" }}>
                <DescriptionText title={anime.description} size="s" />
              </Row>
            </Col>
          </Row>
        </Container>
      </AccentWrapper>
      <Container style={{ padding: "1rem", paddingTop: "5rem" }}>
        {/*評価ラベル */}
        <Row style={{ padding: "1rem" }} ref={reviewSectionRef}>
          <Col>
            <TitleLabel title={"評価"} size={"m"} />
          </Col>
        </Row>
      </Container>
      <SlideToggle isVisible={isOpenEditReview} speed={400}>
        <AccentWrapper styleName={"accentColor1"}>
          {/*レビュー編集 */}
          <EditReview
            userReview={userReview}
            userId={userData.user}
            animeId={anime.id}
            setIsOpenEditReview={setIsOpenEditReview}
          />
        </AccentWrapper>
      </SlideToggle>
      <Container>
        {/*レビューリスト */}
        <ReviewList reviews={reviews} />
      </Container>
    </>
  );
};

export default AnimeDetails;
