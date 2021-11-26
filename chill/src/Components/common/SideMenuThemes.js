import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import shortLogo from "../../images/shortLogo.png";
import { IoIosCompass } from "react-icons/io";
import { IoMdBeer } from "react-icons/io";
import { RiBook3Fill } from "react-icons/ri";
import { RiHome5Line } from "react-icons/ri";
import { MdMood } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import SignIn from "../common/SignIn";
import { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import search from "../../images/search.png";
import { BiMenuAltLeft } from "react-icons/bi";
import { useSelector } from "react-redux";

const SideNav = styled.div`
  background-color: rgba(44, 33, 59, 0.6);
  width: 20%;
  display: flex;
  flex-direction: column;
  @media (max-width: 1250px) {
    width: 30%;
  }
  @media (max-width: 875px) {
    display: ${(props) => (props.show ? "block" : "none")};
    width: 50%;
    position: fixed;
    z-index: 2;
  }
  @media (max-width: 500px) {
    display: ${(props) => (props.show ? "block" : "none")};
    width: 100%;
    position: fixed;
    z-index: 2;
  }
`;
const SideMenuIcon = styled.div`
  display: none;
  background-color: rgba(44, 33, 59, 0.6);
  width: 10%;
  @media (max-width: 875px) {
    display: block;
    z-index: 3;
  }
`;
const MenuIcon = styled(BiMenuAltLeft)`
  padding-top: 10px;
  width: 10vmin;
  height: 10vmin;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AvatarImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50px;
`;

const Avatar = styled(MdMood)`
  width: 30px;
  height: 100%;
  padding: 5px;
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
  margin-left: 20%;
  font-style: italic;
  font-weight: 600;
  padding: 0.5rem;
  font-size: 20px;
  cursor: pointer;
`;
const NavSearch = styled(Nav)`
  display: none;
  @media (max-width: 1250px) {
    display: block;
  }
`;
const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-left: 20%;
  font-style: italic;
  font-weight: 600;
  padding: 0.5rem;
  font-size: 20px;
  text-decoration: none;
`;
const Btn = styled.div`
  width: 180px;
  display: flex;
  align-items: center;
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

const SideMenu = () => {
  const currentUserRedux = useSelector((state) => state.currentUser);
  const [showMenu, setShowMenu] = useState(false);
  const [userId, setUserId] = useState("");
  const history = useHistory();
  const [user, setUser] = useState();
  const [buttonPopup, setButtonPopup] = useState(false);
  const db = firebase.firestore();
  const [authorName, setAuthorName] = useState("");
  const [authorPhoto, setAuthorPhoto] = useState("");
  const [authoremail, setAuthoremail] = useState("");
  const [authorUid, setAuthorUid] = useState("");
  const [news, setNews] = useState("");
  const [search, setSearch] = useState("");

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
    let isUnmount = false;
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (!isUnmount) {
        setUser(currentUser);
        // setUserId(currentUserRedux.uid);
      }
    });
    return () => {
      isUnmount = true;
    };
  }, []);
  // useEffect(() => {
  //   firebase.auth().currentUser ? (
  //     firebase.auth().onAuthStateChanged((currentUser) => {
  //       setUser(currentUser);
  //       setUserId(currentUser.uid);
  //     })
  //   ) : (
  //     <></>
  //   );
  // }, [user]);

  useEffect(() => {
    user ? (
      db
        .collection("users")
        .doc(currentUserRedux.uid)
        .onSnapshot((docSnapshot) => {
          setAuthorPhoto(docSnapshot.data().URL);
          setAuthorName(docSnapshot.data().userName);
          setAuthoremail(docSnapshot.data().email);
          setAuthorUid(docSnapshot.data().uid);
        })
    ) : (
      <></>
    );
  }, []);
  function onSubmit() {
    if (search.length <= 0) {
      alert("搜尋不到唷");
    }
  }
  function showSideMenu() {
    if (showMenu) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  }

  return (
    <>
      <SideMenuIcon>
        <MenuIcon onClick={showSideMenu} />
      </SideMenuIcon>
      <SideNav show={showMenu}>
        {user ? (
          <Div>
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
            <NavLink to={`/mybooks/${currentUserRedux.uid}/collection`}>
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
                      window.location.href = "/";
                    })
                }
              >
                <LogOutIcon />
                登出
              </Btn>
            </NavLink>
            <NavSearch></NavSearch>
            <Nav>
              <AvatarImg src={authorPhoto} alt="" />
            </Nav>
            <Nav>{authorName}</Nav>
          </Div>
        ) : (
          <Div>
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
          </Div>
        )}

        <SignIn trigger={buttonPopup} setTrigger={setButtonPopup}></SignIn>
      </SideNav>
    </>
  );
};

export default SideMenu;
