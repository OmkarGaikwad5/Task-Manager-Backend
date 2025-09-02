import app from "../src/app.js";

// Express apps are request handlers: just export a default handler
export default function handler(req, res) {
  return app(req, res);
}
