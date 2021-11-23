import React from "react";
import styled from "styled-components";
import search from "../images/search.png";
import { useState, useEffect } from "react";
import shortLogo from "../images/shortLogo.png";

import { Link, useHistory } from "react-router-dom";
import firebase from "../utils/firebase";
import { IoIosCompass } from "react-icons/io";
import { IoMdBeer } from "react-icons/io";
import { RiBook3Fill } from "react-icons/ri";
import { MdMood } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";

const SearchBar = styled.div`
  /* outline: red solid; */
  background-color: #f7f7f7;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  /* border: #0d6663 1px solid; */
  border-radius: 30px;
  height: 40px;
  width: 200px;
  margin: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Input = styled.input`
  outline: none;
  border: none;
  text-decoration: none;
  width: 190px;
  font-size: 16px;
  padding: 8px;
  background-color: transparent;
  border-radius: 30px;
`;

const SearchBtn = styled(Link)`
  background-image: url(${search});
  background-repeat: no-repeat;
  background-size: 20px;
  /* background-color: #f7f7f7; */
  width: 25px;
  height: 20px;
  /* padding: 8px; */
  outline: none;
  text-decoration: none;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const Div = styled.div`
  outline: red solid;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const HashtagDiv = styled.div`
  /* width: 100px; */

  color: #0d6663;
  display: flex;
  flex-direction: row;
`;
const Hashtag = styled.div`
  border-radius: 5px;
  padding: 3px;
  font-size: 15px;
  background-color: #0d6663;
  color: #f7f7f7;
  margin: 0 5px;
  cursor: pointer;
`;

const NavBar = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: flex-end;
`;

const ThemeHeader = () => {
  const [userId, setUserId] = useState("");
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [reviews, setReviews] = useState([]);
  function onsubmit(e) {
    setSearch(e.target.textContent);
  }
  useEffect(() => {
    firebase
      .firestore()
      .collection("reviews")
      .where("hashtag1", "!=", "")
      .limit(5)
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setReviews(data);
      });
  }, []);
  console.log(reviews);
  function onSubmit() {
    if (search.length <= 0) {
      alert("搜尋不到唷");
    }
  }

  return (
    <NavBar>
      <Div>
        <SearchBar>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="你在煩惱什麼？"
          ></Input>
          <SearchBtn onClick={onSubmit} to={`/book/search/${search}`} />
        </SearchBar>
        <HashtagDiv>
          {reviews.map((review) => {
            return (
              <Hashtag
                key={review.id}
                onClick={(e) => {
                  onsubmit(e);
                }}
              >
                {review.hashtag1}
              </Hashtag>
            );
          })}
        </HashtagDiv>
      </Div>
    </NavBar>
  );
};

export default ThemeHeader;
