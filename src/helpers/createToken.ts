import jwt from "jsonwebtoken";

const { SECRET_KEY_ACCESS = "", SECRET_KEY_REFRESH = "" } = process.env;

const createToken = (_id:string) => {
  const payload = {
    id: _id,
  };
  const accessToken = jwt.sign(payload, SECRET_KEY_ACCESS, {
    expiresIn: "45m",
  });
  const refreshToken = jwt.sign(payload, SECRET_KEY_REFRESH, {
    expiresIn: "1w",
  });
  return { accessToken, refreshToken };
};

export default createToken;
