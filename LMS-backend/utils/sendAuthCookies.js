export const sendAuthCookies = (token, res) => {
  res.cookie("token",token, {
    httpOnly: true,
    maxAge: 10 * 24 * 60 * 60 * 1000,
    sameSite: "lax",
  });
};
