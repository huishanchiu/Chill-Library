import React from "react";
import styled from "styled-components";
import theme__1 from "../images/theme__1.png";
import theme__2 from "../images/theme__2.png";
import theme__3 from "../images/theme__3.png";
import theme__4 from "../images/theme__4.png";
import theme__5 from "../images/theme__5.png";
import theme__6 from "../images/theme__6.png";
let themeImg;
let conetnt;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ThemeContent = styled.div``;
const ImgTheme = styled.img`
  width: 500px;
`;

function AllThemes({ theme }) {
  switch (theme) {
    case "宅在家好發慌？":
      themeImg = theme__1;
      conetnt =
        "心應長進電次了要法回一操日股，過而都頭說不家教溫明頭走是空子證得交在東生車世又之只我生大十年來社子，回組色計合聲何之物！連行年為什是切間洲視院至一辦。放了合爭改不臺受身金維空我路爸四天、何電課。刻很需民技多分物修不生也生足調在受興實電一山？";
      break;
    case "錢錢去哪了？":
      themeImg = theme__2;
      conetnt =
        "心應長進電次了要法回一操日股，過而都頭說不家教溫明頭走是空子證得交在東生車世又之只我生大十年來社子，回組色計合聲何之物！連行年為什是切間洲視院至一辦。放了合爭改不臺受身金維空我路爸四天、何電課。刻很需民技多分物修不生也生足調在受興實電一山？";
      break;
    case "一個人好孤單？":
      themeImg = theme__3;
      conetnt =
        "心應長進電次了要法回一操日股，過而都頭說不家教溫明頭走是空子證得交在東生車世又之只我生大十年來社子，回組色計合聲何之物！連行年為什是切間洲視院至一辦。放了合爭改不臺受身金維空我路爸四天、何電課。刻很需民技多分物修不生也生足調在受興實電一山？";
      break;
    case "想不出好點子？":
      themeImg = theme__4;
      conetnt =
        "心應長進電次了要法回一操日股，過而都頭說不家教溫明頭走是空子證得交在東生車世又之只我生大十年來社子，回組色計合聲何之物！連行年為什是切間洲視院至一辦。放了合爭改不臺受身金維空我路爸四天、何電課。刻很需民技多分物修不生也生足調在受興實電一山？";
      break;
    case "如何上火箭？":
      themeImg = theme__5;
      conetnt =
        "心應長進電次了要法回一操日股，過而都頭說不家教溫明頭走是空子證得交在東生車世又之只我生大十年來社子，回組色計合聲何之物！連行年為什是切間洲視院至一辦。放了合爭改不臺受身金維空我路爸四天、何電課。刻很需民技多分物修不生也生足調在受興實電一山？";
      break;
    case "心裡總是卡卡的？":
      themeImg = theme__6;
      conetnt =
        "心應長進電次了要法回一操日股，過而都頭說不家教溫明頭走是空子證得交在東生車世又之只我生大十年來社子，回組色計合聲何之物！連行年為什是切間洲視院至一辦。放了合爭改不臺受身金維空我路爸四天、何電課。刻很需民技多分物修不生也生足調在受興實電一山？";
      break;
    default:
  }

  return (
    <Div>
      <ImgTheme src={themeImg} alt="" />
      <ThemeContent>{conetnt}</ThemeContent>
    </Div>
  );
}

export default AllThemes;
