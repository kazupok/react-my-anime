import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
// useContext
import { useAnimeData } from "context/data/AnimeDataContext";
import { useUserData } from "context/data/UserDataContext";
// components
import CustomButtonOnClick from "components/button/CustomButtonOnClick";
import { ArrowButton } from "pages/components/index";
// contents
import Collection from "./Collection";
import HorizontalCollection from "./HorizontalCollection";

const Dashboard = () => {
  const {
    animeData,
    allAnimeData,
    sortAnimeDataIncluded,
    sortAnimeDataExcluded,
  } = useAnimeData();
  const { userData } = useUserData();

  const [allData, setAllData] = useState([]);
  const [sortedWatchedData, setSortedWatchedData] = useState([]);
  const [sortedNotWatchedData, setSortedNotWatchedData] = useState([]);
  const [currentAnimeData, setCurrentAnimeData] = useState([]);

  const [showCollection, setShowCollection] = useState(false);

  useEffect(() => {
    setAllData(allAnimeData());
    setSortedWatchedData(sortAnimeDataIncluded(userData.watched));
    setSortedNotWatchedData(sortAnimeDataExcluded(userData.watched));
  }, [animeData, userData]);

  const handleSortData = (data) => {
    setCurrentAnimeData(data);
    setShowCollection(true);
  };

  const handleRevButton = () => {
    setShowCollection(false);
  };

  const commonButtonStyle = {
    backgroundColor: "transparent",
    textColor: "white",
    className: "text-toggle-button",
  };

  const buttons = [
    { label: "全てのアニメ", data: allData },
    { label: "まだ見てないアニメ", data: sortedNotWatchedData },
    { label: "もう見たアニメ", data: sortedWatchedData },
  ];

  return (
    <>
      {showCollection ? (
        <Container style={{ paddingTop: "3rem" }}>
          <div>
            <ArrowButton onClick={handleRevButton} />
          </div>

          <Container style={{ paddingTop: "3rem" }}>
            <Row>
              <Collection animeData={currentAnimeData} />
            </Row>
          </Container>
        </Container>
      ) : (
        <Container>
          <Row style={{ padding: "3rem" }}>
            <Col>
              {buttons.map((button, index) => (
                <>
                  <Row key={index}>
                    <Col>
                      <CustomButtonOnClick
                        {...commonButtonStyle}
                        onClick={() => handleSortData(button.data)}
                      >
                        {button.label}
                      </CustomButtonOnClick>
                    </Col>
                  </Row>
                  <Row style={{ height: "360px" }}>
                    <HorizontalCollection animeData={button.data} />
                  </Row>
                </>
              ))}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Dashboard;
