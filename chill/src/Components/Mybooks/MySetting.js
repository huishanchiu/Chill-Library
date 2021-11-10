import React from "react";
import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import "firebase/firestore";
import firebase from "../../utils/firebase";
import bookCover from "../../images/021.jpeg";
import { BsCamera } from "react-icons/bs";
import { useParams } from "react-router-dom";
import "firebase/storage";

const CameraIcon = styled(BsCamera)`
  color: #f1faf7;
  align-self: center;
`;
const SamllCameraIcon = styled(CameraIcon)`
  width: 30px;
  align-self: center;
`;
const CloseIcon = styled(AiOutlineCloseCircle)`
  color: #1abea7;
  width: 30px;
  height: 100%;
  cursor: pointer;
`;
const Icon = styled.div`
  width: 680px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`;
const Btn = styled.div`
  cursor: pointer;
  padding: 5px 15px;
  border-radius: 15px;
  background-color: #0d6662;
  color: #f1faf7;
  font-size: 16px;
  font-weight: 500;
`;
const Mask = styled.div`
  z-index: 1;
  color: #1abea7;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100p;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupInner = styled.div`
  z-index: 2;
  position: fixed;
  padding: 15px 0;
  width: 700px;
  background-color: #f1faf7;
  border-radius: 1rem;
`;
const Banner = styled.div`
  background-image: linear-gradient(
      rgba(39, 55, 70, 0.7),
      rgba(39, 55, 70, 0.6)
    ),
    url(${(props) => props.bannerPhoto});
  width: 700px;
  height: 200px;
  display: flex;
  justify-content: center;
`;
const ImgTag = styled.div`
  border: grey 3px solid;
  background-image: linear-gradient(
      rgba(39, 55, 70, 0.7),
      rgba(39, 55, 70, 0.6)
    ),
    url(${(props) => props.userPhoto});
  background-size: cover;
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 70px;
  margin: -30px 10px 0 10px;
  display: flex;
  justify-content: center;
`;

const DisplayNameEdit = styled.input`
  margin-bottom: 10px;
  outline: 0;
  border-width: 0 0 1px;
  border-color: #dedede;
  width: 100%;
  height: 40px;
  &:focus {
    background-color: rgba(26, 190, 167, 0.1);
    border-color: #0d6662;
  }
`;
const Self = styled.textarea`
  margin-top: 10px;
  outline: 0;
  border-width: 0 0 1px;
  border-color: #dedede;
  width: 100%;
  height: 60px;
  &:focus {
    background-color: rgba(26, 190, 167, 0.1);
    border-color: #0d6662;
  }
`;
const Div = styled.div`
  margin-top: 10px;
  font-size: 16px;
  color: #999c9d;
  font-weight: 400;
`;
const Edit = styled.div`
  padding: 20px;
`;
const IconDiv = styled.div`
  display: flex;
  cursor: pointer;
`;

function MySetting({ close, userInfo }) {
  const [displayName, setDisplayName] = useState("");
  const [selfInfo, setSelfInfo] = useState("");
  const [file, setFile] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const previewUrl = file ? URL.createObjectURL(file) : userInfo.imageUrl;

  const previemUserImg = userImg ? URL.createObjectURL(userImg) : userInfo.URL;
  console.log(userInfo);
  function onSubmit() {
    const documentRef = firebase
      .firestore()
      .collection("users")
      .doc(userInfo.uid);
    const fileRef = firebase.storage().ref("bookshelf-image/" + userInfo.uid);
    const metadata = {
      contentType: file.type,
    };
    fileRef.put(file, metadata).then(() => {
      fileRef.getDownloadURL().then((imageUrl) => {
        documentRef.update({
          userName: displayName,
          selfInfo: selfInfo,
          imageUrl,
        });
      });
    });
    const doctRef = firebase.firestore().collection("users").doc(userInfo.uid);
    const userImgRef = firebase.storage().ref("user-photo/" + userInfo.uid);

    userImgRef.put(userImg, metadata).then(() => {
      userImgRef.getDownloadURL().then((userImageUrl) => {
        doctRef.update({
          URL: userImageUrl,
        });
      });
    });
  }
  return (
    <Mask>
      <PopupInner>
        <Icon>
          <Btn onClick={onSubmit}>儲存</Btn>
          <CloseIcon onClick={() => close(false)} />
        </Icon>
        <Banner bannerPhoto={previewUrl}>
          <IconDiv as="label" htmlFor="book-image">
            <CameraIcon />
          </IconDiv>
          <input
            type="file"
            id="book-image"
            style={{ display: "none" }}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
        </Banner>
        <ImgTag userPhoto={previemUserImg}>
          <IconDiv as="label" htmlFor="user-image">
            <SamllCameraIcon />
          </IconDiv>
          <input
            type="file"
            id="user-image"
            style={{ display: "none" }}
            onChange={(e) => {
              setUserImg(e.target.files[0]);
            }}
          />
        </ImgTag>
        <Edit>
          <Div>暱稱</Div>

          <DisplayNameEdit
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
            defaultValue={userInfo.userName}
          />
          <Div>個人簡介</Div>
          <Self
            value={selfInfo}
            onChange={(e) => {
              setSelfInfo(e.target.value);
            }}
          />
        </Edit>
      </PopupInner>
    </Mask>
  );
}

export default MySetting;
