import { addNewReview } from "./utils";

describe("test add new review", () => {
  it("check content not empty", () => {
    const content = "";
    const quote = "123";
    const hashtag1 = "123";
    const hashtag2 = "123";
    const hashtag3 = "123";
    const commentData = {
      bookName: "123",
      bookId: "123",
      content: "123",
      quote: "123",
      hashtag1: "123",
      hashtag2: "123",
      hashtag3: "123",
      rating: "123",
      createdAt: new Date(),
      author: {
        displayName: "123",
        photoURL: "123",
        uid: "123",
        email: "123",
      },
    };
    const userId = "123";
    const mockFn = jest.fn((x) => x);
    expect(
      addNewReview(
        content,
        quote,
        hashtag1,
        hashtag2,
        hashtag3,
        commentData,
        userId,
        mockFn
      )
    ).toEqual(false);
  });

  it("2", () => {
    const content = "";
    const quote = "";
    const hashtag1 = "123";
    const hashtag2 = "123";
    const hashtag3 = "123";
    const commentData = {
      bookName: "123",
      bookId: "123",
      content: "123",
      quote: "123",
      hashtag1: "123",
      hashtag2: "123",
      hashtag3: "123",
      rating: "123",
      createdAt: new Date(),
      author: {
        displayName: "123",
        photoURL: "123",
        uid: "123",
        email: "123",
      },
    };
    const userId = "123";
    const mockFn = jest.fn((x) => x);
    expect(
      addNewReview(
        content,
        quote,
        hashtag1,
        hashtag2,
        hashtag3,
        commentData,
        userId,
        mockFn
      )
    ).toEqual(false);
  });

  it("3", () => {
    const content = "123";
    const quote = "123";
    const hashtag1 = "";
    const hashtag2 = "123";
    const hashtag3 = "";
    const commentData = {
      bookName: "123",
      bookId: "123",
      content: "123",
      quote: "123",
      hashtag1: "123",
      hashtag2: "123",
      hashtag3: "123",
      rating: "123",
      createdAt: new Date(),
      author: {
        displayName: "123",
        photoURL: "123",
        uid: "123",
        email: "123",
      },
    };
    const userId = "123";
    const mockFn = jest.fn((x) => x);
    expect(
      addNewReview(
        content,
        quote,
        hashtag1,
        hashtag2,
        hashtag3,
        commentData,
        userId,
        mockFn
      )
    ).toEqual(true);
  });
});
