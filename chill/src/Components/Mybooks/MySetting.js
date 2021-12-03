import { React, useState } from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsCamera } from "react-icons/bs";
import Loading from "../common/Loading";
import {
  updatePersonalInfo,
  uploadBanner,
  uploadUserImg,
} from "../../utils/firebaseFunction";
import { alert } from "../../utils/utils";

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
  width: 100%;
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
  z-index: 4;
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
  z-index: 5;
  position: fixed;
  padding: 15px 0;
  width: 50%;
  background-color: #f1faf7;
  border-radius: 1rem;
`;
const Banner = styled.div`
  background-image: linear-gradient(
      rgba(39, 55, 70, 0.7),
      rgba(39, 55, 70, 0.6)
    ),
    url(${(props) => props.bannerPhoto});
  width: 100%;
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
  const [isLoading, setIsLoading] = useState(false);
  const [displayName, setDisplayName] = useState(userInfo.userName);
  const [selfInfo, setSelfInfo] = useState(userInfo.selfInfo);
  const [file, setFile] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const previewUrl = file ? URL.createObjectURL(file) : userInfo.imageUrl;
  const previemUserImg = userImg ? URL.createObjectURL(userImg) : userInfo.URL;
  const obj = {
    userName: displayName || "",
    selfInfo: selfInfo || "",
  };
  function onSubmit() {
    setIsLoading(true);
    if (file === null && userImg === null) {
      updatePersonalInfo(userInfo.uid, obj);
      alert("成功修改");
      setIsLoading(false);
      close(false);
    } else if (userImg === null) {
      uploadBanner(userInfo.uid, file, obj);
      alert("成功修改");
      setIsLoading(false);
      close(false);
    } else if (file === null) {
      uploadUserImg(userInfo.uid, userImg, obj);
      alert("成功修改");
      setIsLoading(false);
      close(false);
    } else {
      uploadBanner(userInfo.uid, file, obj);
      uploadUserImg(userInfo.uid, userImg, obj);
      alert("成功修改");
      setIsLoading(false);
      close(false);
    }
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
            accept="image/*"
            type="file"
            id="book-image"
            style={{ display: "none" }}
            onChange={(e) => {
              if (!e.target.files[0].type.includes("image")) {
                Swal.fire({
                  text: "檔案格式怪怪的喔！",
                  confirmButtonColor: "rgba(15, 101, 98, 0.8)",
                });
                return;
              }
              setFile(e.target.files[0]);
            }}
          />
        </Banner>
        <ImgTag userPhoto={previemUserImg}>
          <IconDiv as="label" htmlFor="user-image">
            <SamllCameraIcon />
          </IconDiv>
          <input
            accept="image/*"
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
              if (!e.target.files[0].type.includes("image")) {
                Swal.fire({
                  text: "檔案格式怪怪的喔！",
                  confirmButtonColor: "rgba(15, 101, 98, 0.8)",
                });
                return;
              }
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
      {isLoading ? <Loading /> : ""}
    </Mask>
  );
}

export default MySetting;
