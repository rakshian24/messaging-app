import { ApolloServer } from 'apollo-server';
import path from 'path';
import glue from 'schemaglue';
import { sequelize } from './models/index';
import models from './models';

global.appRoot = path.resolve(__dirname);

const { schema, resolver } = glue(path.join(global.appRoot, 'graphql'));
const typeDefs = schema;
const resolvers = resolver;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return {
      models,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
  sequelize
    .authenticate()
    .then(() => console.log('Connected to MySql Database.'))
    .catch((err) => console.log('Error Connecting to MySql Database : ', err));
});
