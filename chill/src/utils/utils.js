export const collectAlert = (isCollect, setPopup, Swal) => {
  if (isCollect) {
    setPopup(true);
  } else {
    Swal.fire({
      text: "請先收藏此書",
      confirmButtonColor: "rgba(15, 101, 98, 0.8)",
    });
  }
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
