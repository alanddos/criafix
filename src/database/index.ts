import { Sequelize } from "sequelize-typescript";
import User from "../models/User";
import Contact from "../models/Contact";
import Image from "../models/Image";
import Company from "../models/Company";
import UserCompany from "../models/UserCompany";

// eslint-disable-next-line
const dbConfig = require("../config/database");
// import dbConfig from "../config/database";

const sequelize = new Sequelize(dbConfig);

const models = [User, Contact, Image, Company, UserCompany];

sequelize.addModels(models);

export default sequelize;
