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
      x: -200,
      opacity: 0,
      duration: 3,
      ease: "back",
    });
    let t2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".light__2__left",
        start: "-80px 20%",
        // end: "top 80px",
        end: "+=80px",
        scrub: 5,
        id: "theme__2",
        // markers: true,
      },
    });
    t2.to(".theme__2", {
      opacity: 1,
      duration: 5,
    }).to(".theme__2", {
      x: 100,
      opacity: 0,
      duration: 6,
    });
    let t3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".light__3__left",
        start: "10px 15%",
        end: "+=80px",
        scrub: 5,
        id: ".theme__2",
        // markers: true,
      },
    });
    t3.to(".theme__3", {
      opacity: 1,
      duration: 5,
    }).to(".theme__3", {
      x: -200,
      opacity: 0,
      duration: 3,
    });
    let t4 = gsap.timeline({
      scrollTrigger: {
        trigger: ".light__4__left",
        start: "130px 15%",
        end: "+=80px",
        scrub: 5,
        id: "light__4__left",
        // markers: true,
      },
    });
    t4.to(".theme__4", {
      opacity: 1,
      duration: 5,
    }).to(".theme__4", {
      x: 200,
      y: 150,
      opacity: 0,
      duration: 3,
    });
    let t5 = gsap.timeline({
      scrollTrigger: {
        trigger: ".light__5__right",
        start: "150px 20%",
        end: "+=100px",
        scrub: 10,
        id: "light__5__right",
        // markers: true,
      },
    });
    t5.to(".theme__5", {
      opacity: 1,
      duration: 5,
    }).to(".theme__5", {
      x: -200,
      y: -150,
      opacity: 0,
      duration: 3,
    });
    let t6 = gsap.timeline({
      scrollTrigger: {
        trigger: ".middle__6",
        start: "250px 10%",
        end: "+=30px",
        scrub: 10,
        id: ".middle__666",
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
        start: "250px 5%",
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
      // y: -100,
      // start: "top 50%",
      // end: "+=300px",
      rotation: 360,
      duration: 2,
      ease: "back",
      repeat: -1,
      opacity: 1,
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
    gsap.to(".light__2__left", {
      scrollTrigger: {
        trigger: ".light__1__left",
        start: "80px 30%",
        end: "+=50px",
        scrub: 5,
        id: "light-2",
        markers: true,
      },
      // x: -300,
      // y: 500,
      opacity: 1,
      duration: 1,
      // duration: 25,
      ease: "none",
    });
    gsap.to(".light__2__left", {
      scrollTrigger: {
        trigger: ".light__2__left",
        start: "100px 20%",
        end: "+=60px",
        scrub: 5,
        id: "light-22",
        markers: true,
      },
      x: -300,
      y: 500,

      duration: 1,
      // duration: 25,
      ease: "none",
    });
    // let l2 = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".light__2__left",
    //     start: "-80px 20%",
    //     end: "+=60px",
    //     scrub: 25,
    //     id: "light-2",
    //     // markers: true,
    //   },
    // });
    // l2.to(".light__2__left", {
    //   opacity: 1,
    //   duration: 7,
    // }).to(".light__2__left", {
    //   x: -300,
    //   y: 500,
    //   duration: 25,
    // });

    // let l2 = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".light__2__left",
    //     start: "-80px 20%",
    //     end: "+=60px",
    //     scrub: 25,
    //     id: "light-2",
    //     // markers: true,
    //   },
    // });
    // l2.to(".light__2__left", {
    //   opacity: 1,
    //   duration: 7,
    // }).to(".light__2__left", {
    //   x: -300,
    //   y: 500,
    //   duration: 25,
    // });
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
        start: "10px 15%",
        end: "+=80px",
        scrub: 40,
        id: "light__3__left",
        // markers: true,
      },
    });
    l3.to(".light__3__left", {
      opacity: 1,
      duration: 10,
    }).to(".light__3__left", {
      x: -250,
      y: 500,
      duration: 25,
    });
    let r3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".light__3__left",
        start: "600px 70%",
        end: "+=60px",
        scrub: 20,
        id: "light__3__right",
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
        start: "130px 15%",
        end: "+=80px",
        scrub: 30,
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
    let r4 = gsap.timeline({
      scrollTrigger: {
        trigger: ".light__4__left",
        start: "150px 10%",
        end: "+=50px",
        scrub: 30,
        id: "light__4__right",
        // markers: true,
      },
    });
    r4.to(".light__4__right", {
      opacity: 1,
      duration: 8,
    }).to(".light__4__right", {
      x: 300,
      y: 500,
      duration: 25,
    });
    let r5 = gsap.timeline({
      scrollTrigger: {
        trigger: ".light__5__right",
        start: "150px 20%",
        end: "+=100px",
        scrub: 20,
        id: "light__5__right",
        // markers: true,
      },
    });
    r5.to(".light__5__right", {
      opacity: 1,
      duration: 6,
    }).to(".light__5__right", {
      x: 200,
      y: 500,
      duration: 25,
    });
    let m6 = gsap.timeline({
      scrollTrigger: {
        trigger: ".middle__6",
        start: "150px 20%",
        end: "+=100px",
        scrub: 20,
        id: ".middle__6",
        // markers: true,
      },
    });
    m6.to(".middle__6", {
      opacity: 1,
      duration: 6,
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
