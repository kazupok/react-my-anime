// AnimeDetails.js
import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
// useContext
import { useUser } from "context/auth/UserContext";
import { useUserData } from "context/data/UserDataContext";
import { useReviewData } from "context/data/ReviewDataContext";
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

import ReviewList from "./ReviewList";
import EditReview from "./EditReview";

const AnimeDetails = ({ anime }) => {
  const { user } = useUser();
  const { userData, updateUserData } = useUserData();
  const { reviewData } = useReviewData();

  const reviewSectionRef = useRef(null);

  const [isWatched, setIsWatched] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isReview, setIsReview] = useState(false);
  const [reviews, setReviews] = useState([]);

  const [isOpenEditReview, setIsOpenEditReview] = useState(false);

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

  useEffect(() => {
    if (userData) {
      setIsWatched(userData.watched.includes(anime.id));
      setIsFavorite(userData.favorites.includes(anime.id));
    }
  }, [userData, anime.id]);

  useEffect(() => {
    const userReview = reviews?.find((review) => {
      return review.userId === user.uid;
    });
    if (userReview) {
      setIsReview(true);
    } else {
      setIsReview(false);
    }
  }, [reviews]);

  const averageReviews = () => {
    const sum = reviews?.reduce((total, current) => total + current.star, 0);
    const average = sum / reviews.length;
    return average;
  };

  const handleToggleWatched = async () => {
    if (user) {
      const newWatchedList = isWatched
        ? //リストにあるのでそれ以外だけ取り出し
          userData.watched.filter((id) => id !== anime.id)
        : //リストにないので追加
          [...userData.watched, anime.id];
      //「視聴済み」のリストに含まれているかどうかをチェック
      const updatedData = { ...userData, watched: newWatchedList };

      updateUserData(user.uid, updatedData).catch((error) => {
        console.error("Error updating userData: ", error);
      });
    }
  };

  const handleToggleFavorite = async () => {
    if (user) {
      const newFavoriteList = isFavorite
        ? //リストにあるのでそれ以外だけ取り出し
          userData.favorites.filter((id) => id !== anime.id)
        : //リストにないので追加
          [...userData.favorites, anime.id];
      //「視聴済み」のリストに含まれているかどうかをチェック
      const updatedData = { ...userData, favorites: newFavoriteList };

      updateUserData(user.uid, updatedData).catch((error) => {
        console.error("Error updating userData: ", error);
      });
    }
  };

  const handleToggleOpenEditReview = () => {
    setIsOpenEditReview(true);
    if (reviewSectionRef.current) {
      reviewSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const userReview = () => {
    const userReview = reviews?.find((review) => {
      return review.userId === user.uid;
    });
    if (userReview) {
      return userReview;
    } else {
      return null;
    }
  };

  return (
    <>
      <CustomImageShadow src={anime.imageUrl} alt={anime.title} />
      <Container style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
        {/*メインタイトル */}
        <Row>
          <Col>
            <TitleLabel title={anime.title} size="l" />
          </Col>
        </Row>
        {/*キャッチフレーズ */}
        <Row style={{ padding: "1rem" }}>
          <TitleLabel title={anime.catchPhrase} size="m" />
        </Row>
        <Row className="justify-content-between" style={{ padding: "2rem" }}>
          <Col xs={12} md={5}>
            <Row style={{ padding: "1.5rem" }}>
              {/*レビュー */}
              <Col>
                <Rating rating={averageReviews()} />
              </Col>
              {/*リリース年 */}
              <Col>
                <ReleaseYearLabel year={anime.releaseYear} />
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
                    toggle={isReview}
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
            userReview={userReview()}
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
