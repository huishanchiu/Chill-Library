import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import shortLogo from "../images/shortLogo.png";
import { IoIosCompass } from "react-icons/io";
import { IoMdBeer } from "react-icons/io";
import { RiBook3Fill } from "react-icons/ri";
import { RiHome5Line } from "react-icons/ri";
import { MdMood } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import SignIn from "./SignIn";
import { useState, useEffect } from "react";
import firebase from "../utils/firebase";

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
const SideNav = styled.div`
  width: 300px;
  /* height: 100vmin; */
  /* background-color: #323741; */
  /* background-color: #343434; */
  background-color: rgba(44, 33, 59, 0.6);
`;
const Logo = styled.img`
  display: block;
  margin: 20px auto;
  width: 150px;
`;
const LogOutIcon = styled(RiLogoutCircleLine)`
  padding-right: 10px;
  width: 30px;
  height: 100%;
`;
const HomeIcon = styled(RiHome5Line)`
  padding-right: 10px;
  width: 30px;
  height: 100%;
`;
const ThemeIcon = styled(IoMdBeer)`
  padding-right: 10px;
  width: 30px;
  height: 100%;
`;
const FindIcon = styled(IoIosCompass)`
  padding-right: 10px;
  width: 35px;
  height: 100%;
`;
const BookIcon = styled(RiBook3Fill)`
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
const Btn = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  position: relative;
  text-decoration: none;
  border-radius: 50rem;
  padding: 0.3rem 0.6rem;
  color: #feae29;
  border: rgb(254, 239, 222) 1px solid;
  /* background-color: #f93c10; */
  box-shadow: 0px 3px 0 rgb(254, 239, 222, 0.7);
  transition: all 0.1s ease-in-out;
  &:hover {
    bottom: -7px;
    box-shadow: 0px 0px 0 #000;
  }
`;
console.log(firebase.auth().currentUser);
const SideMenu = () => {
  const [userId, setUserId] = useState("");
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(false);
  const db = firebase.firestore();
  const [authorName, setAuthorName] = useState("");
  const [authorPhoto, setAuthorPhoto] = useState("");
  const [authoremail, setAuthoremail] = useState("");
  const [authorUid, setAuthorUid] = useState("");
  const [news, setNews] = useState("");

  useEffect(() => {
    firebase
      .firestore()
      .collection("reviews")
      .orderBy("createdAt", "desc")
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setNews(data);
      });
  }, []);

  useEffect(() => {
    firebase.auth().currentUser ? (
      firebase.auth().onAuthStateChanged((currentUser) => {
        setUser(currentUser);
        setUserId(currentUser.uid);
      })
    ) : (
      <></>
    );
  }, []);

  useEffect(() => {
    user ? (
      db
        .collection("users")
        .doc(userId)
        .onSnapshot((docSnapshot) => {
          console.log(docSnapshot.data());
          setAuthorPhoto(docSnapshot.data().URL);
          setAuthorName(docSnapshot.data().userName);
          setAuthoremail(docSnapshot.data().email);
          setAuthorUid(docSnapshot.data().uid);
        })
    ) : (
      <></>
    );
  }, [userId]);

  // const userId = user.uid;

  return (
    <SideNav>
      {user ? (
        <>
          <NavLink to="/">
            <Logo src={shortLogo} alt="" />
          </NavLink>
          <NavLink to="/news">
            <Btn>
              <FindIcon />
              累積去憂#{news.length}
            </Btn>
          </NavLink>
          <NavLink to="/themes">
            <Btn>
              <ThemeIcon />
              去憂主題
            </Btn>
          </NavLink>
          <NavLink to={`/mybooks/${userId}/collection`}>
            <Btn>
              <BookIcon />
              我的書櫃
            </Btn>
          </NavLink>
          <NavLink>
            <Btn
              onClick={() =>
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    // history.push("/mybooks");
                    window.location.href = "/";
                  })
              }
            >
              <LogOutIcon />
              登出
            </Btn>
          </NavLink>
          <Nav>
            <AvatarImg src={authorPhoto} alt="" />
          </Nav>
          <Nav>{authorName}</Nav>
        </>
      ) : (
        <div>
          <NavLink to="/">
            <Logo src={shortLogo} alt="" />
          </NavLink>
          <NavLink to="/news">
            <Btn>
              <FindIcon />
              累積去憂#{news.length}
            </Btn>
          </NavLink>
          <NavLink to="/themes">
            <Btn>
              <ThemeIcon />
              去憂主題
            </Btn>
          </NavLink>
          <Nav>
            <Btn onClick={() => setButtonPopup(true)}>
              <Avatar />
              註冊/登入
            </Btn>
          </Nav>
        </div>
      )}

      <SignIn trigger={buttonPopup} setTrigger={setButtonPopup}></SignIn>
    </SideNav>
  );
};

export default SideMenu;
