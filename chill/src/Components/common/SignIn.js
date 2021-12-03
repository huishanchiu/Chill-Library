import { React, useState } from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsFacebook, BsGoogle } from "react-icons/bs";
import firebase from "../../utils/firebase";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";
import "firebase/auth";
import socialMediaAuth from "../../utils/auth";
import { facebookProvider, googleProvider } from "../../utils/authMethods";

const CloseIcon = styled(AiOutlineCloseCircle)`
  color: #1abea7;
  width: 30px;
  height: 100%;
  cursor: pointer;
`;
const Mask = styled.div`
  z-index: 3;
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
  z-index: 99;
  position: fixed;
  padding: 30px;
  width: 50%;
  background-color: #f6e7db;
  border-radius: 1rem;
`;
const Close = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`;
const Btn = styled.div`
  margin: 20px auto;
  width: 70px;
  text-align: center;
  cursor: pointer;
  padding: 5px 15px;
  border-radius: 15px;
  background-color: #0d6662;
  color: #f1faf7;
  font-size: 16px;
  font-weight: 500;
`;
const Tab = styled.div`
  white-space: nowrap;
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
  width: 100%;
  height: 30px;
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
  justify-content: space-around;
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
          Swal.fire({
            text: "成功註冊/登入",
            confirmButtonColor: "rgba(15, 101, 98, 0.8)",
          });
          history.push("/themes");
          setIsLoading(false);
          props.setTrigger(false);
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
          history.push("/themes");
          setIsLoading(false);
          AddToFirebase(res);
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
      {isLoading ? <Loading /> : ""}
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
