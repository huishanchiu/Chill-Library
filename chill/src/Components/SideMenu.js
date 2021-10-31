import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import shortLogo from "../images/shortLogo.png";
import { IoIosCompass } from "react-icons/io";
import { IoMdBeer } from "react-icons/io";
import { RiBook3Fill } from "react-icons/ri";
import { RiHome5Line } from "react-icons/ri";
import { MdMood } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import SignIn from "./SignIn";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../utils/firebase";

const Avatar = styled(MdMood)`
  width: 30px;
  height: 100%;
  padding: 5px;
  color: #fff6a9;
`;
const SideNav = styled.div`
  width: 300px;
  height: 100vh;
  background-color: #2c213b;
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
  width: 30px;
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

const SideMenu = () => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(false);
  useEffect(() => {
    let isUnmount = false;
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (!isUnmount) {
        setUser(currentUser);
      }
    });
    return () => {
      isUnmount = true;
    };
  }, []);
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
              累積去憂#345
            </Btn>
          </NavLink>
          <NavLink to="/themes">
            <Btn>
              <ThemeIcon />
              去憂主題
            </Btn>
          </NavLink>
          <NavLink to="/mybooks">
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
        </>
      ) : (
        <div>
          <NavLink to="/">
            <Logo src={shortLogo} alt="" />
          </NavLink>
          <NavLink to="/news">
            <Btn>
              <FindIcon />
              累積去憂#345
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
