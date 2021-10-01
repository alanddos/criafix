  import { Op } from "sequelize";
  import User from "../../models/User";
  import AppError from "../../errors/AppError";
  import {
    createAccessToken,
    createRefreshToken,
  } from "../../helpers/CreateTokens";
  import { SerializeUser } from "../../helpers/SerializeUser";
  import Company from "../../models/Company";

  interface SerializedUser {
    id: number;
    name: string;
    email: string;
    profile: string;
  }

  interface Request {
    name: string;
    email: string;
    password: string;
  }

  interface Response {
    serializedUser: SerializedUser;
    token: string;
    refreshToken: string;
  }

  const AuthUserService = async ({
    name,
    email,
    password,
  }: Request): Promise<Response> => {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          {
            name: email,
          },
          {
            email,
          },
          {
            name,
          },
          {
            email: name,
          },
        ],
      },
      include: [
        {
          model: Company,
          required: false,
        },
      ],
    });

    if (!user) {
      throw new AppError("ERR_INVALID_CREDENTIALS", 401);
    }

    if (!(await user.checkPassword(password))) {
      throw new AppError("ERR_INVALID_CREDENTIALS", 401);
    }

    const token = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    const serializedUser = SerializeUser(user);

    return {
      serializedUser,
      token,
      refreshToken,
    };
  };

  export default AuthUserService;
