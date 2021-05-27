const { ApolloServer, gql } = require('apollo-server');
const path = require('path');
const glue = require('schemaglue');
const { sequelize } = require('./models/index');

global.appRoot = path.resolve(__dirname);

const { schema, resolver } = glue(path.join(global.appRoot, 'graphql'));
const typeDefs = schema;
const resolvers = resolver;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
  sequelize
    .authenticate()
    .then(() => console.log('Connected to MySql Database.'))
    .catch((err) => console.log('Error Connecting to MySql Database : ', err));
});
