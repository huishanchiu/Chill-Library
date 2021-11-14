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

const AvatarImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50px;
`;

const Avatar = styled(MdMood)`
  width: 30px;
  height: 100%;
  padding: 5px;
  color: #fff6a9;
`;
const SearchBar = styled.div`
  background-color: #f7f7f7;
  border: #0d6663 1px solid;
  border-radius: 30px;
  height: 40px;
  width: 250px;
  margin: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Input = styled.input`
  outline: none;
  border: none;
  text-decoration: none;
  width: 200px;
  font-size: 16px;
  padding: 8px;
  background-color: transparent;
  border-radius: 30px;
`;

const SearchBtn = styled(Link)`
  background-image: url(${search});
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: 10px;
  background-color: #f7f7f7;
  width: 25px;
  height: 20px;
  padding: 8px;
  outline: none;
  text-decoration: none;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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

const ThemeIcon = styled(IoMdBeer)`
  padding-right: 10px;
  width: 30px;
  height: 100%;
`;
const FindIcon = styled(IoIosCompass)`
  padding-right: 10px;
  width: 30px;
  height: 100%;
`;
const BookIcon = styled(RiBook3Fill)`
  padding-right: 10px;
  width: 30px;
  height: 100%;
`;
const LogOutIcon = styled(RiLogoutCircleLine)`
  padding-right: 10px;
  width: 30px;
  height: 100%;
`;
const Nav = styled.div`
  display: flex;
  align-items: center;
  margin-left: 50px;
  font-style: italic;
  font-weight: 600;
  padding: 0.5rem;
  font-size: 20px;
  text-decoration: none;
  cursor: pointer;
`;
const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  /* justify-content:center; */
  margin-left: 50px;
  font-style: italic;
  font-weight: 600;
  padding: 0.5rem;
  font-size: 20px;
  text-decoration: none;
`;
const Logo = styled.img`
  /* display: block; */
  margin: 10px;
  width: 80px;
`;
const Btn = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  position: relative;
  text-decoration: none;
  border-radius: 50rem;
  padding: 0.3rem 0.6rem;
  color: #2c213b;
  background-color: #f93c10;
  box-shadow: 0px 3px 0 #1abea7;
  transition: all 0.1s ease-in-out;
  &:hover {
    bottom: -7px;
    box-shadow: 0px 0px 0 #000;
  }
`;
const NavBar = styled.div`
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
