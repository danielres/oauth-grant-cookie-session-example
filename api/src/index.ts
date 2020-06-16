import express, { Express } from "express";
import config from "./config";
import cookieSession from "./middleware/cookieSession";
import ensureAuthenticated from "./middleware/ensureAuthenticated";
import grant from "./middleware/grant";
import handleOAuthResponse from "./middleware/handleOAuthResponse";
import unlessRouteIn from "./middleware/utils/unlessRouteIn";

const { PUBLIC_ROUTES, PORT } = config;

const app: Express = express();

app.use(
  cookieSession,
  grant,
  handleOAuthResponse,
  unlessRouteIn(PUBLIC_ROUTES)(ensureAuthenticated)
);

app.get("/", (req, res) => {
  const user = req.session?.user;
  res.send(`home | grant: ${JSON.stringify({ user, session: req.session })}`);
});

app.get("/private", (req, res) => {
  const user = req.session?.user;
  res.send(`private | grant: ${JSON.stringify({ user })}`);
});

app.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server ready on http://localhost:${PORT}`);
});
