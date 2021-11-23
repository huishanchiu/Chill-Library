import React from "react";
import styled from "styled-components";
import Header from "./Header";
import "../themes.css";
import theme__1 from "../images/theme__1.png";
import theme__2 from "../images/theme__2.png";
import theme__3 from "../images/theme__3.png";
import theme__4 from "../images/theme__4.png";
import theme__5 from "../images/theme__5.png";
import theme__6 from "../images/theme__6.png";
import logo from "../images/ch.png";
import { IoIosCompass } from "react-icons/io";
import { IoMdBeer } from "react-icons/io";
import { RiBook3Fill } from "react-icons/ri";
import { RiHome5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import ReactFullpage from "@fullpage/react-fullpage";

class Themes extends React.Component {
  onLeave(origin, destination, direction) {
    console.log("Leaving section " + origin.index);
  }
  afterLoad(origin, destination, direction) {
    console.log("After load: " + destination.index);
  }
  render() {
    return (
      <ReactFullpage
        scrollOverflow={true}
        // sectionsColor={["orange", "purple", "green"]}
        onLeave={this.onLeave.bind(this)}
        afterLoad={this.afterLoad.bind(this)}
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage-wrapper">
              <div className="section section1">
                <div className="S1">
                  <img src={theme__1} className="theme__1__img" alt="" />

                  <div className="theme__1__book">
                    場生設系大品師處國要起形始名其朋，本育神自媽，而才而的量不由，機曾把部的當心。
                    全黨二金光不明，才具語天細資過……心告行裡是源，們系解兒世要回易十政，的甚比媽：沒風角月正來問度比汽方加地更火來設數單只及這低當想長身光輪能氣可得什，自未汽一和這讀的爭從多，能平流，有起有：灣改生國起為師、安共康會體就治，分要美林而是看境起在苦時他主外，成著一不定活我沒而格並後什器環標一：類心好眾治夜林的急展來題你成制實大麼的歡動已來家提是叫拿間年居為飯。
                    頭國個時媽，特始人獎當上緊完而，要政良院星原，們研能……性想獨濟式有量地二出，有例那制著找得一人市日工濟特我文導起汽果史之。
                    心因色受十去常，信之術，解得他已心。
                  </div>
                </div>
                <div className="content">
                  場生設系大品師處國要起形始名其朋，本育神自媽，而才而的量不由，機曾把部的當心。
                  全黨二金光不明，才具語天細資過……心告行裡是源，們系解兒世要回易十政，的甚比媽：沒風角月正來問度比汽方加地更火來設數單只及這低當想長身光輪能氣可得什，自未汽一和這讀的爭從多，能平流，有起有：灣改生國起為師、安共康會體就治，分要美林而是看境起在苦時他主外，成著一不定活我沒而格並後什器環標一：類心好眾治夜林的急展來題你成制實大麼的歡動已來家提是叫拿間年居為飯。
                  頭國個時媽，特始人獎當上緊完而，要政良院星原，們研能……性想獨濟式有量地二出，有例那制著找得一人市日工濟特我文導起汽果史之。
                  心因色受十去常，信之術，解得他已心。
                </div>
              </div>
              <div className="section">
                <div className="slide">
                  <h3>Slide 2.1</h3>
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
    );
  }
}

// const Themes = () => {
//   let { path, url } = useRouteMatch();
//   return (
//     <Div>
//       <Header />

//       <ThemesContainer>
//         <Theme1 to="/宅在家好發慌？" />
//         <Theme2 to="/錢錢去哪了？" />
//         <Theme3 to="/一個人好孤單？" />
//         <Theme4 to="/想不出好點子？" />
//         <Theme5 to="/如何上火箭？" />
//         <Theme6 to="/心裡總是卡卡的？" />
//       </ThemesContainer>
//       <LogoContainer>
//         <LogoOrange>Chill Library</LogoOrange>
//         <LinkTag>
//           <NavLink to="/">
//             <Btn>
//               <HomeIcon />
//             </Btn>
//           </NavLink>
//           <NavLink to="/news">
//             <Btn>
//               <FindIcon />
//             </Btn>
//           </NavLink>
//           <NavLink to="/themes">
//             <Btn>
//               <ThemeIcon />
//             </Btn>
//           </NavLink>
//           <NavLink to="/mybooks">
//             <Btn>
//               <BookIcon />
//             </Btn>
//           </NavLink>
//         </LinkTag>
//       </LogoContainer>
//     </Div>
//   );
// };

export default Themes;
