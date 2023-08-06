import React, { useState, useEffect } from "react";

import AnimeCard from "pages/main/AnimeCard";
import { CustomCarousel } from "components/index";

const HorizontalCollection = ({ animeData }) => {
  const [displayCount, setDisplayCount] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setDisplayCount(1);
      } else if (window.innerWidth <= 1200) {
        setDisplayCount(2);
      } else if (window.innerWidth <= 1600) {
        setDisplayCount(3);
      } else if (window.innerWidth <= 2000) {
        setDisplayCount(4);
      }
    };

    window.addEventListener("resize", handleResize);

    // 初回レンダリング時にもサイズをチェック
    handleResize();

    // クリーンアップ関数
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 4つのカードを表示する場合の横幅と高さの計算
  const cardWidth = `${96 / displayCount}%`; // 4つのカードを均等に表示
  
  return (
    <CustomCarousel displayCount={displayCount} padding="5px">
      {animeData?.map((anime) => (
        <AnimeCard
          key={anime.id}
          anime={anime}
          width={cardWidth}
          height={"220px"}
          showDetails={false}
          onHoverScaleUp={true}
        />
      ))}
    </CustomCarousel>
  );
};

export default HorizontalCollection;
