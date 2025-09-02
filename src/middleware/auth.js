import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}
export default auth;
