import React, { useEffect, useRef } from "react";

import styled from "styled-components";
import { gsap, Power1, Power2 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles2.css";
import roadPng from "../images/grayRoad.png";
import lightPng from "../images/yellowLight.png";
import treePng from "../images/tree.png";
import buildingPng from "../images/skyline.png";
import building2Png from "../images/building2.png";
import hospitalPng from "../images/hospital.png";
import subwayPng from "../images/subway.png";
import busPng from "../images/bus.png";
import marketPng from "../images/market.png";
import playPng from "../images/playground.png";
import trianglePng from "../images/triangle.png";
import traficPng from "../images/trafic.png";
import logoPng from "../images/logo.png";
import theme__1 from "../images/theme__1.png";
import theme__2 from "../images/theme__2.png";
import theme__3 from "../images/theme__3.png";
import theme__4 from "../images/theme__4.png";
import theme__5 from "../images/theme__5.png";
import theme__6 from "../images/theme__6.png";
import car from "../images/car.png";
import logo from "../images/ch.png";
import dining from "../images/dining.png";
import LandingHeader from "./LandingHeader";
import ReactScrollJacker from "react-scroll-jacker";

import ReactFullpage from "@fullpage/react-fullpage";

class Landing extends React.Component {
  onLeave(origin, destination, direction) {
    console.log("Leaving section " + origin.index);
  }
  afterLoad(origin, destination, direction) {
    console.log("After load: " + destination.index);
  }

  render() {
    return (
      <>
        <img className="road" src={roadPng} alt="landing-road" />
        <ReactFullpage
          scrollOverflow={true}
          // sectionsColor={["orange", "purple", "green"]}
          onLeave={this.onLeave.bind(this)}
          afterLoad={this.afterLoad.bind(this)}
          render={({ state, fullpageApi }) => {
            return (
              <div id="fullpage-wrapper">
                <LandingHeader />

                <div className="section theme theme__1">
                  <img className="theme__1__img" src={theme__1} alt="" />
                  <div className="theme__1__content">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Itaque tempora maxime dolorum debitis perspiciatis expedita
                    rem ipsam eum ipsum est aliquid neque, nobis vitae quis, aut
                    numquam non in iste.
                  </div>
                </div>
                <div className="section">
                  <div className="light__1__left">
                    <img className="big" src={building2Png} alt="" />
                    <img className="mid" src={treePng} alt="" />
                    <img className="light" src={lightPng} alt="" />
                    <div className="box"></div>
                    <img className="triangle" src={trianglePng} alt="" />
                  </div>
                  <div className="slide">
                    <h3>Slide 2.2</h3>
                  </div>
                  <div className="slide">
                    <h3>Slide 2.3</h3>
                  </div>
                </div>
                <div className="section">
                  <h3>Section 3</h3>
                  <button onClick={() => fullpageApi.moveTo(1, 0)}>
                    Move top
                  </button>
                </div>
              </div>
            );
          }}
        />
      </>
    );
  }
}

export default Landing;
