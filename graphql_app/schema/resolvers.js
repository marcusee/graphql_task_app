const users = require('../repository/users');
const tasks = require('../repository/tasks');

/// ==== Resolver Functions ======

// resolvers functions used by graphql
// they have certain params.
// 1. parent - the resolved parent object. If the current resolver is at root level is usually undefined
// 2. args - params used in the graphql query
// 3. context - shared resource among the resolvers you can set it at the graphql method
// 4. info - the ast tree for the graphql query. Contains all the fields and information in the query. 

// Get the user info.
const resolveUsers = (parent, args, context, info) => {
  return users;
}

// Get the Tasks
const resolveTasks = (parent, args, context, info) => {
  console.log(args);
  if (args.assigneeId) {
    return tasks.filter(t => t.assigneeId == args.assigneeId);
  }
  return tasks;
}

// Get the Tasks
const resolveAssignee = (parent, args, context, info) => {
  return users.find(u => parent.assigneeId === u.id) ?? null;
}

/// This is the root resolver that holds all the other resolver method.
const rootResolver = {
  // Root query
  Query: {
    users: resolveUsers,
    tasks : resolveTasks,
  },

  Task : {
    // It only fires this resolver if user specify the Task in the query.
    assignee : resolveAssignee
  }
}
  
module.exports = rootResolver
