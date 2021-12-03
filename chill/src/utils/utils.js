import Swal from "sweetalert2";
import { postReview } from "./firebaseFunction";

export const collectAlert = (isCollect, setPopup, text) => {
  if (isCollect) {
    setPopup(true);
  } else {
    alert(text);
  }
};
export const alert = (text) => {
  Swal.fire({
    text: text,
    confirmButtonColor: "rgba(15, 101, 98, 0.8)",
  });
};

export const linkToRead = (bookId) => {
  window.open(
    `https://play.google.com/books/reader?id=${bookId}&pg=GBS.PP1&hl=zh_TW`,
    "試閱"
  );
};
export const linkToBorrow = (bookISBN) => {
  window.open(
    `https://webpac.tphcc.gov.tw/webpac/search.cfm?m=ss&k0=${bookISBN}&t0=k&c0=and`,
    "新北市立圖書館"
  );
};
export const bookImgSrc = (bookId) => {
  return `https://books.google.com/books/publisher/content/images/frontcover/${bookId}?fife=w400-h600`;
};

export const defaltBookImgSrc = () => {
  return "https://i.pinimg.com/564x/28/3a/79/283a79781a0c5248d70199cc6d1a58a6.jpg";
};
export const defaltUserImgSrc = () => {
  return "https://images.blush.design/zzDbRuNIfaObRJJl3MMq?w=920&auto=compress&cs=srgb";
};

export const getOtherShelf = (userUid, currentUser, text) => {
  currentUser
    ? (window.location.href = `/mybooks/${userUid}/collection`)
    : alert(text);
};
export const searchKeyWord = (search, setSearch, history, text) => {
  if (search === "") {
    alert(text);
  } else {
    history.push(`/book/search/${search}`);
    setSearch("");
  }
};

export const addNewReview = (
  content,
  quote,
  hashtag1,
  hashtag2,
  hashtag3,
  commentData,
  userId,
  close
) => {
  if (
    content !== "" &&
    quote !== "" &&
    (hashtag1 !== "" || hashtag2 !== "" || hashtag3 !== "")
  ) {
    postReview(commentData, userId);
    close(false);
    alert("成功發表一篇去憂");
    return true;
  } else {
    alert("請填入Quote、去憂內容以及至少一個hashtag喔！");
    return false;
  }
  // if (
  //   content === "" ||
  //   quote === "" ||
  //   hashtag1 !== "" ||
  //   hashtag2 !== "" ||
  //   hashtag3 !== ""
  // ) {
  //   alert("請填入Quote、去憂內容以及至少一個hashtag喔！");
  //   return false;
  // } else {
  //   postReview(commentData, userId);
  //   close(false);
  //   alert("成功發表一篇去憂");
  //   return true;
  // }
};
