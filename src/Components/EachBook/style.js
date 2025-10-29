import styled from "styled-components";
import { BsBookmarkFill, BsBookmark, BsEyeglasses } from "react-icons/bs";
import { IoIosPricetags } from "react-icons/io";
import { HiOutlineHashtag, HiOutlineLibrary } from "react-icons/hi";

export const PlaceIcon = styled(HiOutlineLibrary)`
  width: 20px;
  height: 100%;
`;

export const ReadIcon = styled(BsEyeglasses)`
  width: 20px;
  height: 100%;
`;
export const Tag = styled(HiOutlineHashtag)`
  color: #484141;
`;
export const CategoriesIcon = styled(IoIosPricetags)`
  color: #f3e5d3;
  width: 20px;
  height: 100%;
`;
export const BookCollection = styled(BsBookmarkFill)`
  cursor: pointer;
  width: 20px;
  height: 100%;
  color: #feae29;
`;
export const BookUnCollection = styled(BsBookmark)`
  cursor: pointer;
  width: 20px;
  height: 100%;
  color: #feae29;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
export const BookTag = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
export const BookInfoUp = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  padding: 30px;
  border-bottom: rgba(254, 174, 32, 0.3) 1px solid;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;
export const Div = styled.div`
  width: 50%;
  color: white;
  @media (max-width: 1250px) {
    width: 70%;
  }
  @media (max-width: 875px) {
    width: 90%;
  }
`;

export const BookContent = styled.div`
  width: 40vmin;
  display: flex;
  flex-direction: column;
  margin: 0 30px;
`;
export const BookImg = styled.img`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  height: 300px;
  @media (max-width: 600px) {
    width: 300px;
    height: 100%;
  }
`;
export const BookTitle = styled.div`
  padding-bottom: 15px;
  border-bottom: rgba(254, 174, 32, 0.3) 1px solid;
  font-size: 24px;
  font-weight: 900;
  color: rgba(255, 240, 221, 1);
`;
export const BookSummary = styled.div`
  width: 100%;
  white-space: pre-line;
  color: rgba(255, 240, 221, 1);
  margin: 15px;
`;

export const BookInfo = styled.div`
  margin-right: auto;
  font-size: 16px;
  flex-wrap: 500;
  color: rgba(255, 240, 221, 0.8);
  margin-top: 10px;
`;
export const BookCategories = styled(BookInfo)`
  margin: 20px 0;
  display: flex;
  justify-content: flex-start;
`;
export const BtnTag = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  @media (max-width: 600px) {
    flex-direction: row;
  }
`;
export const Btn = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 10px 0;
  font-weight: 500;
  white-space: nowrap;
  border-radius: 10px;
  padding: 0.4rem 0.7rem;
  color: #feae29;
  border: rgb(254, 239, 222) 1px solid;
  background-color: rgba(15, 101, 98, 0.6);
  box-shadow: 0px 3px 0 rgb(254, 239, 222, 0.9);
  &:hover {
    bottom: -7px;
    box-shadow: 0px 0px 0 #000;
  }
  @media (max-width: 600px) {
    margin: 0 10px;
  }
`;

export const ReviewTag = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
export const Categories = styled.div`
  background-color: rgba(255, 240, 221, 0.8);
  width: 170px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.3);
  padding: 5px;
  margin: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #484141;
`;
export const BtnTagIcon = styled(IoIosPricetags)`
  cursor: pointer;
  width: 20px;
  height: 100%;
  color: #feae29;
`;
