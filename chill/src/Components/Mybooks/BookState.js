import React from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import { useParams } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import bookShelf from "../../images/bookShelf.jpeg";
import book from "../../images/library.png";
import { BsPencilSquare } from "react-icons/bs";
import { MdFileDownloadDone } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";

const BackIcon = styled(RiLogoutCircleLine)`
  margin-right: 8px;
  cursor: pointer;
  width: 19px;
  height: 19px;
`;
const EditIcon = styled(BsPencilSquare)`
  margin-right: 8px;
  cursor: pointer;
  width: 18px;
  height: 18px;
`;
const DoneIcon = styled(MdFileDownloadDone)`
  margin-right: 5px;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const Mask = styled.div`
  z-index: 4;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
`;

const PopupInner = styled.div`
  z-index: 5;
  background-image: linear-gradient(
      rgba(241, 250, 247, 0.9),
      rgba(241, 250, 247, 0.7)
    ),
    url(${book});

  display: flex;
  justify-content: center;
  position: relative;
  padding: 10px;
  width: 50%;
  background-color: #f1faf7;
  border-radius: 1rem;
  @media (max-width: 1250px) {
    width: 60%;
  }

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    /* width: 60%; */
  }
  @media (max-width: 768px) {
    width: 80%;
  }
`;
const BookImg = styled.img`
  cursor: pointer;
  width: 25%;
  height: 100%;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.19),
    10px 10px 10px rgba(0, 0, 0, 0.23);
  margin: 20px 30px;
  @media (max-width: 699px) {
    width: 40%;
  }
`;

const Div = styled.div`
  margin: 20px 10px;
  width: 90%;
`;
const Inner = styled.div`
  color: #1aa98f;
  font-size: 20px;
  font-weight: 500;
  padding: 8px;
`;
const InnerGrey = styled(Inner)`
  color: #b2babb;
`;
const Input = styled.input``;
const Inline = styled.div`
  display: flex;
  flex-direction: row;
  outline: red solid;
`;
const BtnDiv = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  @media (max-width: 699px) {
    flex-direction: column;
    width: 90%;
    margin: auto;
  }
`;
const Btn = styled.div`
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #0d6663;
  color: #f1faf7;
  text-align: center;
  margin: 10px;
  padding: 5px 10px;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;
const BtnDelete = styled(Btn)`
  color: #0d6663;
  background-color: #f1faf7;
`;

function BookState() {
  const history = useHistory();
  const [book, setBook] = useState({});
  const [check, setCheck] = useState("");
  const [borrow, setBorrow] = useState("");
  const [bookShelf, setBookShelf] = useState({});
  const [edit, setEdit] = useState(false);
  const [borrowPerson, setbBorrowPerson] = useState(false);
  const [person, setPerson] = useState("");
  let BookName = useParams();

  function addToFirebase(bookInfo) {
    firebase
      .firestore()
      .collection("users")
      .doc(BookName.userid)
      .collection("collectedBooks")
      .doc(bookInfo)
      .update({
        read: check,
        borrow: borrow,
        borrowPerson: person,
      });
    setEdit(false);
    setbBorrowPerson(false);
    Swal.fire({
      text: "已儲存",
      confirmButtonColor: "rgba(15, 101, 98, 0.8)",
    });
  }

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(BookName.userid)
      .collection("collectedBooks")
      .where("title", "==", BookName.id)
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        console.log(data);
        setBookShelf(data[0]);
      });
  }, [BookName.userid, BookName.id]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("books")
      .doc(BookName.id)
      .get()
      .then((doc) => {
        console.log(doc.data());
        setBook(doc.data());
      });
  }, []);

  function toggleUncellect(title) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        text: "確定要移除這本書嗎？",
        // icon: "warning",
        showCancelButton: true,
        confirmButtonText: "確認",
        cancelButtonText: "再想想",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            text: "刪除成功",
          });
          firebase
            .firestore()
            .collection("books")
            .doc(title)
            .update({
              collectedBy: firebase.firestore.FieldValue.arrayRemove(
                BookName.userid
              ),
            });
          history.push(`/mybooks/${BookName.userid}/collection`);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  }

  return (
    <>
      <Mask>
        {Object.keys(bookShelf).length >= 0 ? (
          <PopupInner>
            <BookImg
              src={
                `https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w400-h600` ||
                ""
              }
              alt=""
            />
            <Div>
              <Inner>書名：{book.title}</Inner>
              <Inner>作者：{book.authors}</Inner>
              <Inner>
                閱讀狀態：
                {edit ? (
                  <>
                    <label>
                      <Input
                        onChange={(e) => {
                          setCheck(e.target.value);
                        }}
                        value="未讀"
                        type="radio"
                        name="readState"
                      />
                      未讀
                    </label>
                    <label>
                      <input
                        onChange={(e) => {
                          setCheck(e.target.value);
                        }}
                        value="正在讀"
                        type="radio"
                        name="readState"
                      />
                      正在讀
                    </label>
                    <label>
                      <input
                        onChange={(e) => {
                          setCheck(e.target.value);
                        }}
                        value="讀完了！"
                        type="radio"
                        name="readState"
                      />
                      讀完了！
                    </label>
                  </>
                ) : (
                  <>{bookShelf.read}</>
                )}
              </Inner>

              <Inner>
                是否出借：
                {edit ? (
                  <>
                    <label>
                      <input
                        onChange={(e) => {
                          setBorrow(e.target.value);
                          setbBorrowPerson(true);
                        }}
                        value="是"
                        type="radio"
                        name="borrow"
                      />
                      是
                    </label>
                    <label>
                      <input
                        onChange={(e) => {
                          setBorrow(e.target.value);
                          setbBorrowPerson(false);
                        }}
                        value="否"
                        type="radio"
                        name="borrow"
                      />
                      否
                    </label>
                  </>
                ) : (
                  <>{bookShelf.borrow}</>
                )}
              </Inner>

              <Inner>
                出借對象：
                {borrowPerson ? (
                  <input
                    onChange={(e) => {
                      setPerson(e.target.value);
                    }}
                    value={person}
                  />
                ) : (
                  <>{bookShelf.borrowPerson}</>
                )}
              </Inner>
              {BookName.userid === firebase.auth().currentUser.uid ? (
                <BtnDiv>
                  <Btn
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    <EditIcon />
                    編輯
                  </Btn>
                  <Btn
                    onClick={(e) => {
                      addToFirebase(book.title);
                    }}
                  >
                    <DoneIcon />
                    儲存
                  </Btn>
                  <Btn
                    onClick={(e) => {
                      history.push(`/mybooks/${BookName.userid}/collection`);
                    }}
                  >
                    <BackIcon />
                    返回
                  </Btn>
                  <BtnDelete onClick={(e) => toggleUncellect(book.title)}>
                    移除此書
                  </BtnDelete>
                </BtnDiv>
              ) : (
                ""
              )}
            </Div>
          </PopupInner>
        ) : (
          ""
        )}
      </Mask>
    </>
  );
}

export default BookState;
