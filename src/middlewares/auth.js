import bcrypt from "bcrypt";
import joi from "joi";

import { sessionsCollection, usersCollection } from "../db.js";

const userSchema = joi.object({
  name: joi.string().required().min(1),
  email: joi.string().email().required().min(1),
  password: joi.string().required().min(1),
});

export function validateUserSchema(req, res, next) {
  const user = req.body;
  const { error } = userSchema.validate(user, { abortEarly: false });

  if (error) {
    const errorArray = error.details.map((detail) => detail.message);
    return res.status(400).send(errorArray);
  }

  res.locals.user = user;

  next();
}

export async function validateLogin(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.sendStatus(401);
    }
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      return res.sendStatus(401);
    }
    res.locals.user = user;
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

  next();
}

export async function validateAuthRoute(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const session = await sessionsCollection.findOne({ token });
    if (!session) {
      return res.sendStatus(401);
    }
    const user = await usersCollection.findOne({ _id: session?.userId });
    if (!user) {
      return res.sendStatus(401);
    }

    res.locals.user = user;
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

  next();
}
