import React, { useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../styles.css";
import roadPng from "../../images/grayRoad.png";
import lightPng from "../../images/yellowLight.png";
import treePng from "../../images/tree.png";
import buildingPng from "../../images/skyline.png";
import building2Png from "../../images/building2.png";
import hospitalPng from "../../images/hospital.png";
import subwayPng from "../../images/subway.png";
import busPng from "../../images/bus.png";
import marketPng from "../../images/market.png";
import playPng from "../../images/playground.png";
import trianglePng from "../../images/triangle.png";
import traficPng from "../../images/trafic.png";
import logoPng from "../../images/logo.png";
import theme__1 from "../../images/theme__1.png";
import theme__2 from "../../images/theme__2.png";
import theme__3 from "../../images/theme__3.png";
import theme__4 from "../../images/theme__4.png";
import theme__5 from "../../images/theme__5.png";
import theme__6 from "../../images/theme__6.png";
import car from "../../images/car.png";
import logo from "../../images/ch.png";
import LandingHeader from "./LandingHeader";
import scroll from "../../images/scroll.gif";
import { Link } from "react-router-dom";
import { GiClick } from "react-icons/gi";

const ClickIcon = styled(GiClick)`
  padding-right: 10px;
  width: 30px;
  height: 100%;
`;

function Landing() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".scroll", {
      scrollTrigger: {
        trigger: ".scroll",
        start: "bottom 30%",
        scrub: 3,
        id: "scroll",
      },
      y: -10,
      opacity: 0,
      duration: 3,
      ease: "back",
    });
    let t1 = gsap.timeline({
      scrollTrigger: {
        scrub: 40,
        id: "theme__111111",
      },
    });
    t1.to(".theme__1 ", {
      opacity: 1,
      duration: 5,
    }).to(".theme__1", {
      xPercent: 100,
      y: -15,
    });

    ScrollTrigger.create({
      animation: t1,
      trigger: ".theme__1",
      start: "-100px top",
      end: "+=1500px",
      scrub: 5,
      pin: true,
      anticipatePin: 4,
    });

    let t2 = gsap.timeline({
      scrollTrigger: {
        scrub: 40,
        id: "theme__2",
      },
    });
    t2.to(".theme__2", {
      opacity: 1,
      duration: 5,
    }).to(".theme__2", {
      xPercent: 100,
    });
    let t3 = gsap.timeline({
      scrollTrigger: {
        scrub: 40,
        id: ".theme__3",
      },
    });
    t3.to(".theme__3", {
      opacity: 1,
      duration: 5,
    }).to(".theme__3", {
      xPercent: 100,
    });
    let t4 = gsap.timeline({
      scrollTrigger: {
        scrub: 40,
        id: "t4",
      },
    });
    t4.to(".theme__4", {
      opacity: 1,
      duration: 5,
    }).to(".theme__4", {
      xPercent: 100,
    });
    let t5 = gsap.timeline({
      scrollTrigger: {
        scrub: 40,
        id: "light__5__right",
      },
    });
    t5.to(".theme__5", {
      opacity: 1,
      duration: 5,
    }).to(".theme__5", {});
    let t6 = gsap.timeline({
      scrollTrigger: {
        scrub: 40,
        id: ".theme__6",
      },
    });
    t6.to(".theme__6", {
      opacity: 1,
      duration: 3,
    });
    t6.to(".theme__6", {
      xPercent: 100,
    });
    ScrollTrigger.create({
      animation: t2,
      trigger: ".theme__2",
      start: "-100px top",
      end: "+=1500px",
      scrub: 20,
      pin: true,
      anticipatePin: 4,
    });
    ScrollTrigger.create({
      animation: t3,
      trigger: ".theme__3",
      start: "-100px top",
      end: "+=1500px",
      scrub: 20,
      pin: true,
      anticipatePin: 4,
    });
    ScrollTrigger.create({
      animation: t4,
      trigger: ".theme__4",
      start: "-100px top",
      end: "+=1500px",
      scrub: 20,
      pin: true,
      anticipatePin: 4,
    });
    ScrollTrigger.create({
      animation: t5,
      trigger: ".theme__5",
      start: "-100px top",
      end: "+=1500px",
      scrub: 20,
      pin: true,
      anticipatePin: 4,
      ease: "back",
    });
    ScrollTrigger.create({
      animation: t6,
      trigger: ".theme__6",
      start: "-100px top",
      end: "+=1500px",
      scrub: 20,
      pin: true,
      anticipatePin: 4,
    });

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
        endTrigger: ".theme__1",
        end: "bottom 100px",
        scrub: 10,
        id: "l1",
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
        endTrigger: ".theme__1",
        end: "bottom 50px",
        scrub: 20,
        id: "r1",
      },
      x: 60,
      y: 100,
      opacity: 0,
      duration: 3,
      ease: "none",
    });
    gsap.to(".light__2__left", {
      scrollTrigger: {
        trigger: ".theme__2",
        start: "top 20%",
        scrub: 5,
        id: "l2",
      },
      opacity: 1,
      duration: 2,
    });
    gsap.to(".light__2__left", {
      scrollTrigger: {
        trigger: ".theme__2",
        start: "top 20%",
        endTrigger: ".theme__3",
        end: "top 500px",
        scrub: 50,
        id: "l2-2",
      },
      x: -360,
      y: 600,
    });
    gsap.to(".light__2__right", {
      scrollTrigger: {
        trigger: ".theme__2",
        start: "top 20%",
        scrub: 5,
        id: "r2",
      },
      opacity: 1,
      duration: 3,
    });
    gsap.to(".light__2__right", {
      scrollTrigger: {
        trigger: ".theme__2",
        start: "top 20%",
        endTrigger: ".theme__3",
        end: "top 500px",
        scrub: 50,
        id: "r2-2",
      },
      x: 360,
      y: 600,
      duration: 25,
    });

    gsap.to(".light__3__left", {
      scrollTrigger: {
        trigger: ".theme__3",
        start: "top 60%",
        scrub: 5,
        id: "l3",
      },
      opacity: 1,
      duration: 1,
    });
    gsap.to(".light__3__left", {
      scrollTrigger: {
        trigger: ".theme__3",
        start: "top 40%",
        endTrigger: ".theme__4",
        end: "top 600px",
        scrub: 40,
        id: "l3-2",
      },
      x: -360,
      y: 600,
      duration: 25,
    });
    gsap.to(".light__3__right", {
      scrollTrigger: {
        trigger: ".theme__3",
        start: "top 60%",
        scrub: 5,
        id: "l3",
      },
      opacity: 1,
      duration: 1,
    });
    gsap.to(".light__3__right", {
      scrollTrigger: {
        trigger: ".theme__3",
        start: "top 40%",
        endTrigger: ".theme__4",
        end: "top 600px",
        scrub: 40,
        id: "l3-2",
      },
      x: 360,
      y: 600,
    });
    gsap.to(".light__4__left", {
      scrollTrigger: {
        trigger: ".theme__4",
        start: "top 30%",
        scrub: 5,
        id: "l4",
      },
      opacity: 1,
      duration: 3,
    });
    gsap.to(".light__4__left", {
      scrollTrigger: {
        trigger: ".theme__4",
        start: "top 30%",
        endTrigger: ".theme__5",
        end: "top 500px",
        scrub: 50,
        id: "l4-2",
      },
      x: -360,
      y: 600,
      duration: 25,
    });

    gsap.to(".light__4__right", {
      scrollTrigger: {
        trigger: ".theme__4",
        start: "top 30%",
        scrub: 5,
        id: "l4",
      },
      opacity: 1,
      duration: 3,
    });
    gsap.to(".light__4__right", {
      scrollTrigger: {
        trigger: ".theme__4",
        start: "top 30%",
        endTrigger: ".theme__5",
        end: "top 500px",
        scrub: 50,
        id: "l4-2",
      },
      x: 330,
      y: 550,
      duration: 25,
    });
    gsap.to(".light__5__right", {
      scrollTrigger: {
        trigger: ".theme__5",
        start: "bottom 40%",
        scrub: 5,
        id: "l5",
      },
      opacity: 1,
      duration: 3,
    });
    gsap.to(".light__5__right", {
      scrollTrigger: {
        trigger: ".theme__5",
        start: "bottom 40%",
        endTrigger: ".theme__6",
        end: "top 300px",
        scrub: 30,
        id: "l5-2",
      },
      x: 330,
      y: 550,
      duration: 25,
    });
    gsap.to(".middle__6", {
      scrollTrigger: {
        trigger: ".theme__6",
        start: "bottom 20%",
        endTrigger: ".logo",
        end: "top 100px",
        scrub: 20,
        id: "l5",
      },
      opacity: 1,
      duration: 4,
    });
    gsap.to(".logo", {
      scrollTrigger: {
        trigger: ".theme__6",
        start: "bottom 20%",
        scrub: 20,
        id: "l5",
      },
      opacity: 1,
      duration: 4,
    });
  }, []);

  return (
    <div className="background">
      <LandingHeader />
      <img className="road" src={roadPng} alt="landing-road" />
      <div>
        <img className=" theme scroll" src={scroll} alt="" />
      </div>
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
      <div className="themes">
        <div className="theme theme__0"></div>
        <div className="theme theme__1">
          <img className="theme__1__img" src={theme__1} alt="" />
          <div className="theme__1__content">
            <strong>宅在家好發慌？</strong>
            <br />
            <strong>
              「慢一點，好讓靈魂跟上來！」安頓自我第一步，啟動心靈連線。疫病時代，一個重新靠近、傾聽自己的最佳契機。
            </strong>
          </div>
        </div>
        <div className="theme theme__2">
          <img className="theme__2__img" src={theme__2} alt="" />
          <div className="theme__2__content">
            <strong>錢錢去哪了？</strong>
            <br />
            <strong>
              認真工作的你，為什麼總是為錢所困？只有「讓錢為你工作」，才能實現財富自由！本書將讓你從一位勞動者，轉身成為資本家，透過財富的力量，讓自己擁有選擇的自由。
            </strong>
          </div>
        </div>
        <div className="theme theme__3">
          <img className="theme__3__img" src={theme__3} alt="" />
          <div className="theme__3__content">
            <strong>一個人好孤單？</strong>
            <br />
            <strong>
              停下腳步，按下暫停鍵，跟久違的自己相遇！
              變動時代的日常喘息，忙碌身心的安頓練習。
              一個重新靠近自己，傾聽內在聲音的最佳時機。
            </strong>
          </div>
        </div>
        <div className="theme theme__4">
          <img className="theme__4__img" src={theme__4} alt="" />
          <div className="theme__4__content">
            <strong>想不出好點子？</strong>
            <br />
            <strong>
              筆記抄滿紙，不及畫一張圖！ 秒懂重點 × 找出邏輯 × 瞬間溝通 ×
              引爆創意 沒想法OUT，好點子GET！
            </strong>
          </div>
        </div>
        <div className="theme theme__5">
          <img className="theme__5__img" src={theme__5} alt="" />
          <div className="theme__5__content">
            <strong>如何上火箭？</strong>
            <br />
            <strong>
              我們都得了「覺得自己不夠好」這種病！ 你自卑，常覺得自己不完美；
              你沒自信，必須等一切到位再說； 你找藉口，各種理由一大堆……
              請問你還要讓這種負面想法寄生多久？
              否定自己，請到此為止；認識自己，從現在開始！
            </strong>
          </div>
        </div>
        <div className="theme theme__6">
          <img className="theme__6__img" src={theme__6} alt="" />
          <div className="theme__6__content">
            <strong>心裡總是卡卡的？</strong>
            <br />
            <strong>
              這世界變得愈來愈快， 但總有些文字能撫平內心的皺摺， 療癒困難的心，
              願你能學會「和自己相處」， 從「我」了解「我們」，
              看見自己和別人身上的光。
            </strong>
          </div>
        </div>
        <div className="logo">
          <div>
            <img className="logo__orange__1" src={logo} alt="" />
          </div>
          <div className="logo__orange">Chill Library</div>
          <Link className="btn" to="/themes">
            <ClickIcon />
            進入去憂圖書館
          </Link>
        </div>
      </div>

      <div className="car">
        <img src={car} alt="" />
      </div>
    </div>
  );
}

export default Landing;
