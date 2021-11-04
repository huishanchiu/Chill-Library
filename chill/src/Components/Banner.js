import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import c__1 from "../images/c1.png";
import c__2 from "../images/c2.png";
import c__3 from "../images/c3.png";
import c__4 from "../images/c4.png";
import c__5 from "../images/c5.png";
import c__6 from "../images/c6.png";

const Div = styled.div`
  outline: red solid;
`;
const Img = styled.img`
  border-radius: 10px;
  width: 600px;
  /* height: 100%; */
`;
const Sliders = styled(Slider)`
  /* outline: red solid; */
  width: 600px;
`;
function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  return (
    <Sliders {...settings}>
      <Link to="/宅在家好發慌？">
        <Img src={c__1} alt="" />
      </Link>
      <Link to="/錢錢去哪了？">
        <Img src={c__2} alt="" />
      </Link>
      <Link to="/一個人好孤單？">
        <Img src={c__3} alt="" />
      </Link>
      <Link to="/想不出好點子？">
        <Img src={c__4} alt="" />
      </Link>
      <Link to="/如何上火箭？">
        <Img src={c__5} alt="" />
      </Link>
      <Link to="/心裡總是卡卡的？">
        <Img src={c__6} alt="" />
      </Link>
    </Sliders>
  );
}

export default Banner;