import React, { useEffect, useRef } from "react";

import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles3.css";
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
import LocomotiveScroll from "locomotive-scroll";

import scroll from "../images/scroll.gif";
import { SectionsContainer, Section } from "react-fullpage";
import ReactFullPage from "@fullpage/react-fullpage";

// gsap.registerPlugin(ScrollTrigger);
// const locoScroll = new LocomotiveScroll({
//   el: document.querySelector(".background"),
//   smooth: true,
// });
// locoScroll.on("scroll", ScrollTrigger.update);
// ScrollTrigger.scrollerProxy(".smooth-scroll", {
//   scrollTop(value) {
//     return arguments.length
//       ? locoScroll.scrollTo(value, 0, 0)
//       : locoScroll.scroll.instance.scroll.y;
//   }, // we don't have to define a scrollLeft because we're only scrolling vertically.
//   getBoundingClientRect() {
//     return {
//       top: 0,
//       left: 0,
//       width: window.innerWidth,
//       height: window.innerHeight,
//     };
//   },
//   // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
//   pinType: document.querySelector(".smooth-scroll").style.transform
//     ? "transform"
//     : "fixed",
// });
// const scroll = new LocomotiveScroll({
//   el: document.querySelector(".background"),
//   smooth: true,
//   lerp: 0.01,
//   repeat: true,
//   tablet: {
//     smooth: true,
//     breakpoint: 250,
//   },
//   smartphone: {
//     smooth: false,
//   },
// });

function Landing() {
  const onLeave = (origin, destination, direction) => {
    console.log("Leaving section " + origin.index);
  };
  const afterLoad = (origin, destination, direction) => {
    console.log("After load: " + destination.index);
  };
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".scroll", {
      scrollTrigger: {
        trigger: ".light__1__left",
        start: "top 20%",
        endTrigger: ".theme__1",
        end: "top 400px",
        scrub: 5,
        // pin: true,
        id: "scroll",
        markers: true,
      },
      y: -10,
      opacity: 0,
      duration: 3,
      ease: "back",
    });
    let t1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll",
        start: "bottom 40%",
        endTrigger: ".theme__2",
        end: "top 600px",
        // end: "+=80px",
        scrub: 20,
        id: "theme__1",
        markers: true,
        ease: "back",
      },
    });
    t1.to(".theme__1 ", {
      opacity: 1,
      duration: 15,
    }).to(".theme__1", {
      x: 200,
      y: -150,
      opacity: 0,
      duration: 10,
    });
    let t2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".theme__1",
        start: "bottom 20%",
        endTrigger: ".theme__3",
        end: "top 500px",
        // end: "+=80px",
        scrub: 20,
        id: "theme__2",
        // markers: true,
        ease: "back",
      },
    });
    t2.to(".theme__2", {
      opacity: 1,
      duration: 15,
    }).to(".theme__2", {
      x: 200,
      y: 150,
      opacity: 0,
      duration: 10,
    });
    let t3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".theme__2",
        start: "top 0%",
        endTrigger: ".theme__4",
        end: "top 600px",
        // end: "+=30px",
        scrub: 20,
        id: ".theme__3",
        // markers: true,
        ease: "back",
      },
    });
    t3.to(".theme__3", {
      opacity: 1,
      duration: 15,
    }).to(".theme__3", {
      x: -200,
      opacity: 0,
      duration: 3,
    });
    let t4 = gsap.timeline({
      scrollTrigger: {
        trigger: ".theme__3",
        start: "bottom 30%",
        endTrigger: ".theme__5",
        end: "top 500px",
        // end: "+=30px",
        scrub: 10,
        id: "t4",
        ease: "back",
        // markers: true,
      },
    });
    t4.to(".theme__4", {
      opacity: 1,
      duration: 15,
    }).to(".theme__4", {
      x: 100,
      y: 150,
      opacity: 0,
      duration: 3,
    });
    let t5 = gsap.timeline({
      scrollTrigger: {
        trigger: ".theme__4",
        start: "bottom 40%",
        endTrigger: ".theme__6",
        end: "top 300px",
        // end: "+=30px",
        scrub: 10,
        id: "light__5__right",
        // markers: true,
      },
    });
    t5.to(".theme__5", {
      opacity: 1,
      duration: 15,
    }).to(".theme__5", {
      x: -20,
      y: -15,
      opacity: 0,
      duration: 3,
    });
    let t6 = gsap.timeline({
      scrollTrigger: {
        trigger: ".theme__5",
        start: "bottom 40%",
        endTrigger: ".logo",
        end: "top 100px",
        // end: "+=30px",
        scrub: 20,
        id: ".theme__6",
        // markers: true,
      },
    });
    t6.to(".theme__6", {
      opacity: 1,
      duration: 15,
    });
    t6.to(".theme__6", {
      x: -200,
      y: 150,
      opacity: 0,
      duration: 3,
    });
    let t7 = gsap.timeline({
      scrollTrigger: {
        trigger: ".middle__6",
        start: "top -420%",
        // end: "+=30px",
        scrub: 10,
        id: ".777",
        // markers: true,
      },
    });
    t7.to(".logo", {
      opacity: 1,
      duration: 4,
    });
  }, []);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".triangle", {
      rotation: 360,
      duration: 2,
      ease: "back",
      repeat: -1,
      opacity: 1,
    });
    gsap.to(".light__1__left", {
      scrollTrigger: {
        trigger: ".scroll",
        start: "bottom 40%",
        endTrigger: ".theme__2",
        end: "top 600px",
        scrub: 5,
        id: "l1",
        markers: true,
      },
      x: -60,
      y: 100,
      opacity: 0,
      ease: "none",
    });
    gsap.to(".light__1__right", {
      scrollTrigger: {
        trigger: ".scroll",
        start: "bottom 40%",
        endTrigger: ".theme__2",
        end: "top 600px",
        scrub: 20,
        id: "r1",
        // markers: true,
      },
      x: 60,
      y: 100,
      opacity: 0,
      ease: "none",
    });
    gsap.to(".light__2__left", {
      scrollTrigger: {
        trigger: ".theme__1",
        start: "bottom 20%",
        endTrigger: ".theme__3",
        end: "top 500px",
        scrub: 5,
        id: "l2",
        // markers: true,
      },
      opacity: 1,
      duration: 2,
    });
    gsap.to(".light__2__left", {
      scrollTrigger: {
        trigger: ".theme__1",
        start: "bottom 20%",
        endTrigger: ".theme__3",
        end: "top 500px",
        scrub: 20,
        id: "l2-2",
        // markers: true,
      },
      x: -270,
      y: 450,
      duration: 80,
    });
    gsap.to(".light__2__right", {
      scrollTrigger: {
        trigger: ".theme__1",
        start: "bottom 20%",
        endTrigger: ".theme__3",
        end: "top 500px",
        scrub: 10,
        id: "r2",
        // markers: true,
      },
      opacity: 1,
      duration: 6,
    });
    gsap.to(".light__2__right", {
      scrollTrigger: {
        trigger: ".theme__1",
        start: "bottom 20%",
        endTrigger: ".theme__3",
        end: "top 500px",
        scrub: 10,
        id: "r2-2",
        // markers: true,
      },
      x: 270, //300
      y: 450, //500
      duration: 25,
    });

    gsap.to(".light__3__left", {
      scrollTrigger: {
        trigger: ".theme__2",
        start: "top 0%",
        endTrigger: ".theme__4",
        end: "top 600px",
        scrub: 10,
        id: "l3",
        // markers: true,
      },
      opacity: 1,
      duration: 6,
    });
    gsap.to(".light__3__left", {
      scrollTrigger: {
        trigger: ".theme__2",
        start: "top 0%",
        endTrigger: ".theme__4",
        end: "top 600px",
        scrub: 10,
        id: "l3-2",
        // markers: true,
      },
      x: -270,
      y: 450,
      duration: 25,
    });
    gsap.to(".light__3__right", {
      scrollTrigger: {
        trigger: ".theme__2",
        start: "top 0%",
        endTrigger: ".theme__4",
        end: "top 600px",
        scrub: 5,
        id: "l3",
        // markers: true,
      },
      opacity: 1,
      duration: 2,
    });
    gsap.to(".light__3__right", {
      scrollTrigger: {
        trigger: ".theme__2",
        start: "top 0%",
        endTrigger: ".theme__4",
        end: "top 600px",
        scrub: 20,
        id: "l3-2",
        // markers: true,
      },
      x: 270,
      y: 450,
      duration: 25,
    });

    gsap.to(".light__4__left", {
      scrollTrigger: {
        trigger: ".theme__3",
        start: "bottom 30%",
        endTrigger: ".theme__5",
        end: "top 500px",
        scrub: 5,
        id: "l4",
        // markers: true,
      },
      opacity: 1,
      duration: 2,
    });
    gsap.to(".light__4__left", {
      scrollTrigger: {
        trigger: ".theme__3",
        start: "bottom 30%",
        endTrigger: ".theme__5",
        end: "top 500px",
        scrub: 20,
        id: "l4-2",
        // markers: true,
      },
      x: -270,
      y: 450,
      duration: 25,
    });

    gsap.to(".light__4__right", {
      scrollTrigger: {
        trigger: ".theme__3",
        start: "bottom 30%",
        endTrigger: ".theme__5",
        end: "top 500px",
        scrub: 5,
        id: "l4",

        // markers: true,
      },
      opacity: 1,
      duration: 2,
    });
    gsap.to(".light__4__right", {
      scrollTrigger: {
        trigger: ".theme__3",
        start: "bottom 30%",
        endTrigger: ".theme__5",
        end: "top 500px",
        scrub: 20,
        id: "l4-2",
        // markers: true,
      },
      x: 270,
      y: 450,
      duration: 25,
    });
    gsap.to(".light__5__right", {
      scrollTrigger: {
        trigger: ".theme__4",
        start: "bottom 40%",
        endTrigger: ".theme__6",
        end: "top 300px",
        scrub: 5,
        id: "l5",
        // markers: true,
      },
      opacity: 1,
      duration: 2,
    });
    gsap.to(".light__5__right", {
      scrollTrigger: {
        trigger: ".theme__4",
        start: "bottom 40%",
        endTrigger: ".theme__6",
        end: "top 300px",
        scrub: 20,
        id: "l5-2",
        // markers: true,
      },
      x: 270,
      y: 450,
      duration: 25,
    });

    gsap.to(".middle__6", {
      scrollTrigger: {
        trigger: ".theme__5",
        start: "bottom 40%",
        endTrigger: ".logo",
        end: "top 100px",
        scrub: 10,
        id: "l5",
        markers: true,
      },
      opacity: 1,
      duration: 4,
    });
  }, []);
  let options = {
    activeClass: "theme__1 theme__2 theme__3", // the class that is appended to the sections links
    anchors: [], // the anchors for each sections
    arrowNavigation: true, // use arrow keys
    className: "SectionContainer", // the class name for the section container
    delay: 1000, // the scroll animation speed
    navigation: true, // use dots navigatio
    scrollBar: false, // use the browser default scrollbar
    sectionClassName: "Section", // the section class name
    sectionPaddingTop: "0", // the section top padding
    sectionPaddingBottom: "0", // the section bottom padding
    verticalAlign: false, // align the content of each section vertical
  };

  return (
    <div className="background">
      <LandingHeader />
      <img className="road" src={roadPng} alt="landing-road" />
      {/* <div>
        <img className=" theme scroll" src={scroll} alt="" />
      </div> */}
      <div className="light__1__left">
        <img className="big" src={building2Png} alt="" />
        <img className="mid" src={treePng} alt="" />
        <img className="light" src={lightPng} alt="" />
        <div className="box"></div>
        <img className="triangle" src={trianglePng} alt="" />
      </div>
      <div className="light__1__right">
        <img className="light" src={lightPng} alt="" />
        <img className="mid" src={treePng} alt="" />
        <img className="small" src={treePng} alt="" />
      </div>
      <div className="light__2__left">
        <img className="big" src={buildingPng} alt="" />
        <img className="light" src={lightPng} alt="" />
        <div className="box__2"></div>
      </div>
      <div className="light__2__right">
        <img className="light" src={lightPng} alt="" />
        <img className="big" src={hospitalPng} alt="" />
        <div className="box__C"></div>
      </div>
      <div className="light__3__left">
        <img className="light" src={lightPng} alt="" />
        <img className="mid" src={logoPng} alt="" />
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
      <div className="light__4__right">
        <img className="light" src={lightPng} alt="" />
        <img className="small" src={marketPng} alt="" />
        <img className="mid" src={treePng} alt="" />
      </div>
      <div className="light__5__right">
        <img className="big" src={busPng} alt="" />
      </div>
      <div className="middle__6">
        <img className="big" src={traficPng} alt="" />
      </div>

      <div>
        <div className="theme theme__0"></div>
        <Section className="theme theme__1">
          <img className="theme__1__img" src={theme__1} alt="" />
          <div className="theme__1__content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
            tempora maxime dolorum debitis perspiciatis expedita rem ipsam eum
            ipsum est aliquid neque, nobis vitae quis, aut numquam non in iste.
          </div>
        </Section>
        <Section className="theme theme__2">
          <img className="theme__2__img" src={theme__2} alt="" />
          <div className="theme__2__content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
            tempora maxime dolorum debitis perspiciatis expedita rem ipsam eum
            ipsum est aliquid neque, nobis vitae quis, aut numquam non in iste.
          </div>
        </Section>
        <div className="theme theme__3">
          <img className="theme__3__img" src={theme__3} alt="" />
          <div className="theme__3__content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
            tempora maxime dolorum debitis perspiciatis expedita rem ipsam eum
            ipsum est aliquid neque, nobis vitae quis, aut numquam non in iste.
          </div>
        </div>
        <div className="theme theme__4">
          <img className="theme__4__img" src={theme__4} alt="" />
          <div className="theme__4__content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
            tempora maxime dolorum debitis perspiciatis expedita rem ipsam eum
            ipsum est aliquid neque, nobis vitae quis, aut numquam non in iste.
          </div>
        </div>
        <div className="theme theme__5">
          <img className="theme__5__img" src={theme__5} alt="" />
          <div className="theme__5__content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
            tempora maxime dolorum debitis perspiciatis expedita rem ipsam eum
            ipsum est aliquid neque, nobis vitae quis, aut numquam non in iste.
          </div>
        </div>
        <div className="theme theme__6">
          <img className="theme__6__img" src={theme__6} alt="" />
          <div className="theme__6__content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
            tempora maxime dolorum debitis perspiciatis expedita rem ipsam eum
            ipsum est aliquid neque, nobis vitae quis, aut numquam non in iste.
          </div>
        </div>
        <div className="logo">
          <div>
            <span className="logo__green">[</span>
            <img className="logo__orange__1" src={logo} alt="" />
            <span className="logo__green">]</span>
          </div>
          <div className="logo__orange">Chill Library</div>
        </div>
      </div>

      <div className="car">
        <img src={car} alt="" />
      </div>
    </div>
  );
}

export default Landing;
