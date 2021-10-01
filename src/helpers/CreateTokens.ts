import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";
import User from "../models/User";

export const createAccessToken = (user: User): string => {
  const { secret, expiresIn } = authConfig;

  return sign(
    {
      usarname: user.name,
      profile: user.profile,
      id: user.id,
      company: user.companies,
    },
    secret,
    {
      expiresIn,
    }
  );
};

export const createRefreshToken = (user: User): string => {
  const { refreshSecret, refreshExpiresIn } = authConfig;

  return sign(
    { id: user.id, tokenVersion: user.tokenVersion, company: user.companies },
    refreshSecret,
    {
      expiresIn: refreshExpiresIn,
    }
  );
};
