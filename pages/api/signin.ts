import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          time: Date.now(),
        },
        "hello",
        {
          expiresIn: "8h",
        }
      );

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("NAPSTIFY_ACCESS_TOKEN", token, {
          httpOnly: true,
          maxAge: 8 * 3600,
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        })
      );

      res.json(user);
    } else {
      res.status(401);
      res.json({ error: "invalid input" });
    }
  } catch (e) {
    res.status(401);
    return res.json({ error: "retry input" });
  }
};
