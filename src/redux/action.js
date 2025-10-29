export const getCurrentUser = (user) => {
  return {
    type: "USER_DATA",
    payload: user,
  };
};
