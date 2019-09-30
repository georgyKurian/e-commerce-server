import express from "express";
import users from "./mocks/users";
import bodyParser from "body-parser";
import logger from "./middlewear/logger";
import withAuthentication from "./middlewear/withAuthentication";
import db from "./db/index";
import { UserModel } from "./models/User";
import { ProductModel } from "./models/Product";

const app = express();
const port = 8085; // process.env.PORT

// middlewears
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(withAuthentication);
app.use(logger);

// routes
app.get("/", (req, res) => {
  res.send({ dateTime: new Date().toJSON() });
});

app.get("/v1/users", async (req, res) => {
  const users = (await UserModel.find()) || [];
  res.send(users);
});

app.get("/v1/users/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    console.log(user);
    if (user) {
      res.send(user);
    } else {
      res.status(400).end();
    }
  } catch (e) {
    res.status(404).end();
  }
});

app.post("/v1/users", (req, res) => {
  console.log(req.body);
  res.send(users);
});

app.put("/v1/users/:id", async (req, res) => {
  res.status(400).end();
});

app.delete("/v1/users/:id", (req, res) => {
  console.log(req.params.id);
  res.send(users);
});

app.get("/v1/products", async (req, res) => {
  const products = (await ProductModel.find()) || [];
  res.send(products);
});

app.get("/v1/products/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(400).end();
    }
  } catch (e) {
    res.status(404).end();
  }
});

app.post("/v1/products", async (req, res) => {
  try {
    const product = await ProductModel.create(req.body);
    if (product) {
      res.send(product).end();
    } else {
      res.status(400).end();
    }
  } catch (e) {
    res.status(404).end();
  }
});

app.put("/v1/products/:id", async (req, res) => {
  try {
    await ProductModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      function(err, updatedProduct) {
        if (err) {
          console.log(err);
          res.status(400).end();
        } else {
          res.send(updatedProduct).end();
        }
      }
    );
  } catch (e) {
    res.status(404).end();
  }
});

app.delete("/v1/products/:id", async (req, res) => {
  try {
    await ProductModel.findOneAndDelete({ _id: req.params.id }, function(
      err,
      updatedProduct
    ) {
      if (err) {
        res.status(400).end();
      } else {
        res.status(200).end();
      }
    });
  } catch (e) {
    res.status(404).end();
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

/**
 * Listening to port
 */
app.listen(port, () => {
  console.log(`App listening on port ${port}! http://localhost:${port}`);
});
