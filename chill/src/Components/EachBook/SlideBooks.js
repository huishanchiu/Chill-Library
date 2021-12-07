import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getAllReviews } from "../../utils/firebaseFunction";
import { bookImgSrc, defaltBookImgSrc } from "../../utils/utils";

const Sliders = styled(Slider)`
  display: flex;
  margin: 10px auto 20px;
  width: 700px;
  @media (max-width: 1250px) {
    width: 600px;
  }
  @media (max-width: 1080px) {
    width: 550px;
  }
  @media (max-width: 768px) {
    width: 500px;
  }
  @media (max-width: 600px) {
    display: none;
  }
`;
const SideBookTag = styled(Link)`
  border-radius: 15px;
  height: 230px;
  margin: 10px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(241, 250, 247, 0.5);
`;
const SideBookImg = styled.img`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  align-self: center;
  justify-self: center;
  margin: 10px auto;
  height: 150px;
`;

const Hashtag = styled.div`
  color: rgba(52, 52, 52);
  margin: 10px 5px;
  font-weight: 700;
`;
const Hashtags = styled.div`
  display: flex;
  white-space: nowrap;
`;

function SlideBooks() {
  const [allReviews, setAllReviews] = useState([]);
  useEffect(() => {
    getAllReviews(setAllReviews);
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  return (
    <div>
      {allReviews.length > 0 ? (
        <>
          <Sliders {...settings}>
            {allReviews.map((item) => {
              return (
                <div key={uuidv4()}>
                  <SideBookTag to={`/book/${item.bookName}`}>
                    <SideBookImg />
                    <SideBookImg
                      src={bookImgSrc(item.bookId) || defaltBookImgSrc()}
                      alt=""
                    />
                    <Hashtags>
                      {item.hashtag1 ? <Hashtag>#{item.hashtag1}</Hashtag> : ""}
                      {item.hashtag2 ? <Hashtag>#{item.hashtag2}</Hashtag> : ""}
                      {item.hashtag3 ? <Hashtag>#{item.hashtag3}</Hashtag> : ""}
                    </Hashtags>
                  </SideBookTag>
                </div>
              );
            })}
          </Sliders>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default SlideBooks;
