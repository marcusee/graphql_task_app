
/**
 * 
 * Example queries
 * see more in tests/unit/readonly-tests/schema/index.spec.js
 *  
 *  query getUser {
 *     user {
 *       email
 *       isSubscriber
 *       profile {
 *         firstName 
 *       }
 *     }
 *   }
 * 
 */

// Used for graphql schema
const typedefs = `
  type Query {
    users: [User]
    tasks (assigneeId: Int) : [Task]
    task: Task
  }

  type User {
    id: Int
    name: String
  }

  type Task {
    id: Int
    title: String 
    status: String
    created: String
    assignee : User
  }
`;


module.exports = typedefs;