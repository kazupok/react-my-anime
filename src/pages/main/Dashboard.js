import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import CustomButtonOnClick from "components/button/CustomButtonOnClick";
import { ArrowRevButtonIcon, TitleLabel } from "pages/components/index";

import Collection from "pages/main/Collection";
import HorizontalCollection from "pages/main/HorizontalCollection";

const Dashboard = ({ dataMap }) => {
  const [currentAnimeIndex, setCurrentAnimeIndex] = useState(0);
  const [showCollection, setShowCollection] = useState(false);

  const handleSortData = (index) => {
    setCurrentAnimeIndex(index);
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

  return (
    <>
      {showCollection ? (
        <Container>
          <Row>
            <Container style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
              <ArrowRevButtonIcon onClick={handleRevButton} />
            </Container>
          </Row>
          <Row style={{textAlign:"center"}}>
            <TitleLabel title={dataMap[currentAnimeIndex].label} size={"m"}/>
          </Row>
          <Row>
            <Container style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
              <Collection animeData={dataMap[currentAnimeIndex].animeData} />
            </Container>
          </Row>
        </Container>
      ) : (
        <Container>
          <Row style={{ padding: "1rem"}}>
            <Col>
              {dataMap.map((data, index) => (
                <div key={index}>
                  <Row>
                    <Col>
                      <CustomButtonOnClick
                        {...commonButtonStyle}
                        onClick={() => handleSortData(index)}
                      >
                        {data.label+"　　　すべて見る▶︎"}
                      </CustomButtonOnClick>
                    </Col>
                  </Row>
                  <Row style={{ height: "300px", width:"100%", textAlign:"left" }}>
                    <HorizontalCollection animeData={data.animeData} />
                  </Row>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Dashboard;
