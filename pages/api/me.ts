import { validateToken } from "../../lib/auth";

export default validateToken((req, res, user) => {
  res.json(user);
});
