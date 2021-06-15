import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import glue from 'schemaglue';
import { sequelize } from './models/index';
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
  verifyToken,
} from './helpers/authHelper';
import { verify } from 'jsonwebtoken';
import models from './models';

const app = express();
app.use(
  cors({
    origin: process.env.LOCAL_CLIENT_URL,
    credentials: true,
  }),
);
app.use(cookieParser());

app.post('/refresh_token', async (req, res) => {
  const token = req.cookies.refresh_token;
  if (!token) {
    return res.send({ ok: false, accessToken: '' });
  }

  let payload = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: '' });
  }

  // token is valid and
  // we can send back an access token
  const { User } = models;
  const user = await User.findOne({ id: payload.userId });

  if (!user) {
    return res.send({ ok: false, accessToken: '' });
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: '' });
  }

  sendRefreshToken(res, createRefreshToken(user));

  return res.send({ ok: true, accessToken: createAccessToken(user) });
});

global.appRoot = path.resolve(__dirname);

const { schema, resolver } = glue(path.join(global.appRoot, 'graphql'));
const typeDefs = schema;
const resolvers = resolver;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    const header = req.headers;
    const user = await verifyToken(models, header);
    const response = res;
    return {
      response,
      models,
      user,
    };
  },
});

server.applyMiddleware({ app, cors: false });

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port:${process.env.SERVER_PORT}`);
  sequelize
    .authenticate()
    .then(() => console.log('Connected to MySql Database.'))
    .catch(err => console.log('Error Connecting to MySql Database : ', err));
});
