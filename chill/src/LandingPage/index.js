import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles.css";
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

function Landing() {
  // const scrollRef = React.createRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to("#triangle", {
      // y: -100,
      start: "top 50%",
      end: "+=300px",
      rotation: 360,
      duration: 2,
      ease: "back",
    });
    gsap.to(".light__1__left", {
      scrollTrigger: {
        trigger: ".light__1__left",
        start: "top 50%",
        end: "+=300px",
        scrub: 10,
        id: "light-1",
        // markers: true,
      },
      x: -300,
      y: 500,
      opacity: 0,
      ease: "none",
    });
    gsap.to(".light__1__right", {
      scrollTrigger: {
        trigger: ".light__1__left",
        start: "top 50%",
        end: "+=180px",
        scrub: 10,
        id: "light-1",
        // markers: true,
      },
      x: 300,
      y: 500,
      opacity: 0,
      ease: "none",
    });

    let l2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".light__2__left",
        start: "-80px 20%",
        end: "top 80px",
        scrub: 20,
        id: "light-2",
        // markers: true,
      },
    });
    l2.to(".light__2__left", {
      opacity: 1,
      duration: 5,
    }).to(".light__2__left", {
      x: -300,
      y: 500,
      duration: 25,
    });
    let r2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".light__2__left",
        start: "-80px 20%",
        end: "top 150px",
        scrub: 20,
        id: "light-2",
        // markers: true,
      },
    });
    r2.to(".light__2__right", {
      opacity: 1,
      duration: 6,
    }).to(".light__2__right", {
      x: 300,
      y: 500,
      duration: 25,
    });
    let l3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".light__3__left",
        start: "300px 50%",
        end: "+=30px",
        scrub: 20,
        id: "light__3__left",
        // markers: true,
      },
    });
    l3.to(".light__3__left", {
      opacity: 1,
      duration: 6,
    }).to(".light__3__left", {
      x: -250,
      y: 500,
      duration: 25,
    });
    let r3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".light__3__right",
        start: "700px 70%",
        end: "+=30px",
        scrub: 20,
        id: "light-3",
        // markers: true,
      },
    });
    r3.to(".light__3__right", {
      opacity: 1,
      duration: 6,
    }).to(".light__3__right", {
      x: 300,
      y: 500,
      duration: 25,
    });
    let l4 = gsap.timeline({
      scrollTrigger: {
        trigger: ".light__4__left",
        start: "150px 20%",
        end: "+=100px",
        scrub: 20,
        id: "light__4__left",
        // markers: true,
      },
    });
    l4.to(".light__4__left", {
      opacity: 1,
      duration: 6,
    }).to(".light__4__left", {
      x: -300,
      y: 500,
      duration: 25,
    });
  });

  return (
    <div className="background">
      <img className="road" src={roadPng} alt="landing-road" />
      <div className="light__1__left">
        <img className="big" src={building2Png} alt="" />
        <img className="mid" src={treePng} alt="" />
        <img src={lightPng} alt="" />
        <div className="box"></div>
        <img id="triangle" src={trianglePng} alt="" />
      </div>
      <div className="light__1__right">
        <img className="light" src={lightPng} alt="" />
        <img className="mid" src={treePng} alt="" />
        <img className="small" src={treePng} alt="" />
      </div>
      <div className="light__2__left">
        <img className="big" src={buildingPng} alt="" />
        <img className="light" src={lightPng} alt="" />
      </div>
      <div className="light__2__right">
        <img className="light" src={lightPng} alt="" />
        <img className="big" src={hospitalPng} alt="" />
      </div>
      <div className="light__3__left">
        <img className="light" src={lightPng} alt="" />
        <img className="mid" src={treePng} alt="" />
      </div>
      <div className="light__3__right">
        <img className="light" src={lightPng} alt="" />
        <img className="small" src={subwayPng} alt="" />
        <img className="small" src={treePng} alt="" />
      </div>
      <div className="light__4__left">
        <img className="light" src={lightPng} alt="" />
        <img className="big" src={playPng} alt="" />
        <img className="mid" src={treePng} alt="" />
      </div>
    </div>
  );
}

export default Landing;
