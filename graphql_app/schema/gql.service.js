const typeDefs = require('./typedef');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const {graphql} = require('graphql');
const rootResolver = require('./resolvers');

const queryData = async (source, variableValues) => {
  // fallback query incase campaign do not have a userQuery.
  const backupQuery = `
      query getUser {
        user {
          id
        }
      }
    `;

  // Store graphql query,
  source = source ?? backupQuery;

  // Generate schema.
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: rootResolver,
  });

  // Call graphql function to generate the data.
  // Context value is a shared resource among the resolvers.
  let output = await graphql({ schema, source, variableValues });

  if (output.error) {
    console.error(error);
    throw output.error
  }


  return JSON.parse(JSON.stringify(output));
}

module.exports = queryData;