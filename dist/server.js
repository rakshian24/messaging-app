"use strict";

var _require = require('apollo-server'),
    ApolloServer = _require.ApolloServer,
    gql = _require.gql;

var path = require('path');

var glue = require('schemaglue');

var _require2 = require('./models/index'),
    sequelize = _require2.sequelize;

var models = require('./models');

global.appRoot = path.resolve(__dirname);

var _glue = glue(path.join(global.appRoot, 'graphql')),
    schema = _glue.schema,
    resolver = _glue.resolver;

var typeDefs = schema;
var resolvers = resolver;
var server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: function context() {
    return {
      models: models
    };
  }
});
server.listen().then(function (_ref) {
  var url = _ref.url;
  console.log("\uD83D\uDE80 Server ready at ".concat(url));
  sequelize.authenticate().then(function () {
    return console.log('Connected to MySql Database.');
  })["catch"](function (err) {
    return console.log('Error Connecting to MySql Database : ', err);
  });
});