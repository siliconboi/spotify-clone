import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

export const validateToken = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.NAPSTIFY_ACCESS_TOKEN;

    if (token) {
      let user;

      try {
        const { id } = jwt.verify("NAPSTIFY_ACCESS_TOKEN", "hello");
        user = await prisma.user.findUnique({
          where: { id },
        });
        if (!user) {
          throw new Error("User not found");
        }
      } catch (e) {
        res.status(401);
        return res.json({ e: "not authorized" });
      }
      return handler(req, res, user);
    }
    res.status(401);
    res.json({ e: "not authorized" });
  };
};