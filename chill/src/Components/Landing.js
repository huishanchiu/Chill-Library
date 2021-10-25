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

function Landing() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".theme__1", {
      scrollTrigger: {
        trigger: ".light__1__left",
        start: "top 50%",
        end: "+=300px",
        scrub: 5,
        id: "theme__1",
        // markers: true,
      },
      x: -20,
      opacity: 0,
      duration: 3,
      ease: "back",
    });

    let t2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".light__2__left",
        start: "-80px 20%",
        end: "+=80px",
        scrub: 15,
        id: "theme__2",
        // markers: true,
      },
    });
    t2.to(".theme__2", {
      opacity: 1,
      duration: 5,
    }).to(".theme__2", {
      x: 10,
      y: 80,
      opacity: 0,
      duration: 10,
    });
    let t3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".light__3__left",
        start: "400px 60%",
        end: "+=30px",
        scrub: 15,
        id: ".theme__2",
        // markers: true,
      },
    });
    t3.to(".theme__3", {
      opacity: 1,
      duration: 5,
    }).to(".theme__3", {
      x: -20,
      opacity: 0,
      duration: 3,
    });
    let t4 = gsap.timeline({
      scrollTrigger: {
        trigger: ".light__4__left",
        start: "300px 30%",
        end: "+=30px",
        scrub: 15,
        id: "t4",
        // markers: true,
      },
    });
    t4.to(".theme__4", {
      opacity: 1,
      duration: 5,
    }).to(".theme__4", {
      x: 20,
      y: 15,
      opacity: 0,
      duration: 3,
    });
    let t5 = gsap.timeline({
      scrollTrigger: {
        trigger: ".light__5__right",
        start: "400px 20%",
        end: "+=30px",
        scrub: 10,
        id: "light__5__right",
        // markers: true,
      },
    });
    t5.to(".theme__5", {
      opacity: 1,
      duration: 5,
    }).to(".theme__5", {
      x: -20,
      y: -15,
      opacity: 0,
      duration: 3,
    });
    let t6 = gsap.timeline({
      scrollTrigger: {
        trigger: ".theme__6",
        start: "450px 10%",
        end: "+=30px",
        scrub: 25,
        id: ".theme__6",
        // markers: true,
      },
    });
    t6.to(".theme__6", {
      opacity: 1,
      duration: 5,
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
        start: "550px 5%",
        end: "+=30px",
        scrub: 15,
        id: ".777",
        // markers: true,
      },
    });
    t7.to(".logo", {
      opacity: 1,
      duration: 4,
    });
  });
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
        trigger: ".light__1__left",
        start: "250px 80%",
        end: "+=50px",
        scrub: 10,
        id: "l1",
        // markers: true,
      },
      x: -60,
      y: 100,
      opacity: 0,
      ease: "none",
    });
    gsap.to(".light__1__right", {
      scrollTrigger: {
        trigger: ".light__1__left",
        start: "250px 80%",
        end: "+=50px",
        scrub: 10,
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
        trigger: ".light__2__right",
        start: "400px 78%",
        end: "+=30px",
        scrub: 5,
        id: "l2",
        // markers: true,
      },
      opacity: 1,
      duration: 2,
    });
    gsap.to(".light__2__left", {
      scrollTrigger: {
        trigger: ".light__2__left",
        start: "400px 70%",
        end: "+=50px",
        scrub: 25,
        id: "l2-2",
        // markers: true,
      },
      x: -270,
      y: 450,
      duration: 25,
    });
    gsap.to(".light__2__right", {
      scrollTrigger: {
        trigger: ".light__2__right",
        start: "400px 78%",
        end: "+=40px",
        scrub: 5,
        id: "r2",
        // markers: true,
      },
      opacity: 1,
      duration: 6,
    });
    gsap.to(".light__2__right", {
      scrollTrigger: {
        trigger: ".light__2__right",
        start: "400px 70%",
        end: "+=50px",
        scrub: 25,
        id: "r2-2",
        // markers: true,
      },
      x: 270, //300
      y: 450, //500
      duration: 25,
    });

    gsap.to(".light__3__left", {
      scrollTrigger: {
        trigger: ".light__3__left",
        start: "400px 60%",
        end: "+=30px",
        scrub: 5,
        id: "l3",
        // markers: true,
      },
      opacity: 1,
      duration: 6,
    });
    gsap.to(".light__3__left", {
      scrollTrigger: {
        trigger: ".light__3__left",
        start: "400px 55%",
        end: "+=60px",
        scrub: 25,
        id: "l3-2",
        // markers: true,
      },
      x: -270,
      y: 450,
      duration: 25,
    });
    gsap.to(".light__3__right", {
      scrollTrigger: {
        trigger: ".light__3__right",
        start: "400px 60%",
        end: "+=30px",
        scrub: 5,
        id: "l3",
        // markers: true,
      },
      opacity: 1,
      duration: 2,
    });
    gsap.to(".light__3__right", {
      scrollTrigger: {
        trigger: ".light__3__right",
        start: "400px 55%",
        end: "+=60px",
        scrub: 25,
        id: "l3-2",
        // markers: true,
      },
      x: 270,
      y: 450,
      duration: 25,
    });

    gsap.to(".light__4__left", {
      scrollTrigger: {
        trigger: ".light__4__left",
        start: "400px 50%",
        end: "+=30px",
        scrub: 5,
        id: "l4",
        // markers: true,
      },
      opacity: 1,
      duration: 2,
    });
    gsap.to(".light__4__left", {
      scrollTrigger: {
        trigger: ".light__4__left",
        start: "400px 40%",
        end: "+=60px",
        scrub: 25,
        id: "l4-2",
        // markers: true,
      },
      x: -270,
      y: 450,
      duration: 25,
    });

    gsap.to(".light__4__right", {
      scrollTrigger: {
        trigger: ".light__4__right",
        start: "400px 50%",
        end: "+=30px",
        scrub: 5,
        id: "l4",
        // markers: true,
      },
      opacity: 1,
      duration: 2,
    });
    gsap.to(".light__4__right", {
      scrollTrigger: {
        trigger: ".light__4__right",
        start: "400px 40%",
        end: "+=60px",
        scrub: 25,
        id: "l4-2",
        // markers: true,
      },
      x: 270,
      y: 450,
      duration: 25,
    });
    gsap.to(".light__5__right", {
      scrollTrigger: {
        trigger: ".light__5__right",
        start: "400px 40%",
        end: "+=30px",
        scrub: 5,
        id: "l5",
        // markers: true,
      },
      opacity: 1,
      duration: 2,
    });
    gsap.to(".light__5__right", {
      scrollTrigger: {
        trigger: ".light__5__right",
        start: "400px 30%",
        end: "+=60px",
        scrub: 25,
        id: "l5-2",
        // markers: true,
      },
      x: 270,
      y: 450,
      duration: 25,
    });

    gsap.to(".middle__6", {
      scrollTrigger: {
        trigger: ".middle__6",
        start: "400px 20%",
        end: "+=30px",
        scrub: 25,
        id: "l5",
        // markers: true,
      },
      opacity: 1,
      duration: 4,
    });
  });

  return (
    <div className="background">
      <LandingHeader />
      <img className="road" src={roadPng} alt="landing-road" />
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
      <div className="theme theme__1">
        <img className="theme__1__img" src={theme__1} alt="" />
        <div className="theme__1__content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
          tempora maxime dolorum debitis perspiciatis expedita rem ipsam eum
          ipsum est aliquid neque, nobis vitae quis, aut numquam non in iste.
        </div>
      </div>
      <div className="theme theme__2">
        <img className="theme__2__img" src={theme__2} alt="" />
        <div className="theme__2__content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
          tempora maxime dolorum debitis perspiciatis expedita rem ipsam eum
          ipsum est aliquid neque, nobis vitae quis, aut numquam non in iste.
        </div>
      </div>
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
      <div className="car">
        <img src={car} alt="" />
      </div>
    </div>
  );
}

export default Landing;
