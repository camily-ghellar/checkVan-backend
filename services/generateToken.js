import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const token = jwt.sign(
  {
    id: 0,
    role: "admin"
  },
  process.env.JWT_SECRET
);

console.log("TOKEN GERADO:\n", token);
