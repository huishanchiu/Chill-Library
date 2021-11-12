import React from "react";
import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";
import { useState } from "react";
import firebase from "../utils/firebase";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";
import "firebase/auth";
import socialMediaAuth from "../utils/auth";
import { facebookProvider, googleProvider } from "../utils/authMethods";

const CloseIcon = styled(AiOutlineCloseCircle)`
  color: #1abea7;
  width: 30px;
  height: 100%;
  cursor: pointer;
`;
const Mask = styled.div`
  z-index: 1;
  color: #1abea7;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupInner = styled.div`
  z-index: 2;
  position: fixed;
  padding: 30px;
  width: 400px;
  background-color: #f6e7db;
  border-radius: 1rem;
`;
const Close = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`;
const Btn = styled.div`
  margin: 15px auto;
  width: 40px;
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
  cursor: pointer;
`;
const Tab = styled.div`
  color: #b3b3b3;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 20px;
`;
const Input = styled.input`
  margin: auto;
  ::placeholder {
    color: #cdcdcd;
  }
  color: #3f403f;
  font-size: 16px;
  outline: none;
  border: none;
  width: 350px;
  height: 20px;
  padding: 8px;
  border-radius: 10px;
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
`;
const ThirdSigin = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin: 10px 20px;
  background-color: white;
  color: #3f403f;
  width: 100px;
  padding: 8px;
  border-radius: 10px;
  box-shadow: 0px 3px 0 #1abea7;
  cursor: pointer;
  &:hover {
    bottom: -7px;
    box-shadow: 0px 0px 0 #000;
  }
`;
const Title = styled.p`
  margin: 15px 0 5px 0;
  color: #868686;
`;
const SignUpDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 70px;
  color: #868686;
`;
const Message = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: tomato;
  font-weight: 500;
`;

function SignIn(props) {
  const history = useHistory();
  const [activeItem, setActiveItem] = useState("signin");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const active = {
    background: "#F1FAF7",
    color: "#0D6663",
    borderRadius: "20px",
    cursor: "pointer",
  };

  const handleOnClick = async (provider) => {
    const res = await socialMediaAuth(provider);
    console.log(res);
    ThirdAddToFirebase(res);
    history.push("/");
  };
  function ThirdAddToFirebase(data) {
    firebase.firestore().collection("users").doc(data.uid).set(
      {
        URL: data.photoURL,
        email: data.email,
        uid: data.uid,
        userName: data.displayName,
      },
      { merge: true }
    );
  }
  function AddToFirebase(data) {
    firebase.firestore().collection("users").doc(data.user.uid).set(
      {
        URL: "https://cdn-icons-png.flaticon.com/512/5914/5914031.png",
        email: data.user.email,
        uid: data.user.uid,
        userName: displayName,
      },
      { merge: true }
    );
  }

  function onSubmit() {
    setIsLoading(true);
    if (activeItem === "signin") {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          history.push("/");
          setIsLoading(false);
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              setErrorMessage("信箱格式不正確 ");
              break;
            case "auth/use-not-found":
              setErrorMessage("信箱不存在");
              break;
            case "auth/wrong-password":
              setErrorMessage("密碼錯誤");
              break;
            default:
          }
          setIsLoading(false);
        });
    } else if (activeItem === "signup") {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          history.push("/");
          setIsLoading(false);
          AddToFirebase(res);
          console.log(res);
          // return res.user.updateProfile({
          //   displayName: displayName,
          //   photoURL: "https://cdn-icons-png.flaticon.com/512/5914/5914031.png",
          // });
        })

        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              setErrorMessage("信箱已存在");
              break;
            case "auth/invalid-email":
              setErrorMessage("信箱格式不正確");
              break;
            case "auth/weak-password":
              setErrorMessage("密碼強度不足");
              break;
            default:
          }
          setIsLoading(false);
        });
    }
  }
  return props.trigger ? (
    <Mask>
      <PopupInner>
        <Close onClick={() => props.setTrigger(false)}>
          <CloseIcon />
        </Close>
        <SignUpDiv>
          <Tab
            active={activeItem === "signin"}
            onClick={() => {
              setErrorMessage("");
              setActiveItem("signin");
            }}
            style={activeItem === "signin" ? active : []}
          >
            登入
          </Tab>
          ｜
          <Tab
            active={activeItem === "signup"}
            onClick={() => {
              setErrorMessage("");
              setActiveItem("signup");
            }}
            style={activeItem === "signup" ? active : []}
          >
            註冊
          </Tab>
        </SignUpDiv>
        <hr />
        <Title>暱稱</Title>
        <Input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="請輸入暱稱"
          type="text"
        />
        <Title>電子信箱</Title>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="請輸入電子信箱"
        />
        <Title>密碼</Title>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="請輸入密碼"
          type="password"
        />
        {errorMessage && <Message>{errorMessage}</Message>}
        <Btn onClick={onSubmit}>
          {/* {isLoading ? <Loading/> :} */}

          {activeItem === "signup" && "註冊"}
          {activeItem === "signin" && "登入"}
        </Btn>

        <hr />
        <Title>
          {activeItem === "signup" && "第三方註冊"}
          {activeItem === "signin" && "第三方登入"}
        </Title>
        <Div>
          <ThirdSigin onClick={() => handleOnClick(facebookProvider)}>
            <BsFacebook />
          </ThirdSigin>
          <ThirdSigin onClick={() => handleOnClick(googleProvider)}>
            <BsGoogle />
          </ThirdSigin>
        </Div>
      </PopupInner>
    </Mask>
  ) : (
    ""
  );
}

export default SignIn;
