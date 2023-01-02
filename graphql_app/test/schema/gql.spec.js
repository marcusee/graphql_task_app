import { expect, test } from 'vitest'
import queryData from '../../schema/gql.service'

test('Get all users', async () => {
  const query = ` 
    query getUsers {
      users {
        id
        name
      }
    }
  `;
  
  let output = await queryData(query);
  expect(output).toStrictEqual(
    {"data":{"users":[{"id":1,"name":"Eric"},{"id":2,"name":"John"},{"id":3,"name":"Thomas"}]}}  );
});

test('Get all tasks', async () => {

  const query = ` 
    query getTasks {
      tasks {
        id
        title
      }
    }
  `;
  
   
  const {data} = await queryData(query);
  expect(data).toStrictEqual(
    {
      tasks: [
        { id: 1, title: 'Create footer' },
        { id: 2, title: 'Create header' },
        { id: 3, title: 'Create body' },
        { id: 4, title: 'Create button' }
      ]
    }
  );
});


test ("Get all task assignee filter", async () => {
  const query = ` 
    query getTasks($assigneeId: Int!) {
      tasks (assigneeId: $assigneeId) {
        id
        title
        assignee {
          id
        }
      }
    }

  `;

  const variableValues = { assigneeId: 1 };
  const {data} = await queryData(query, variableValues);
  expect(data).toStrictEqual(
    {
      tasks: [
        { id: 1, title: 'Create footer', assignee: {id : 1} },
        { id: 2, title: 'Create header', assignee: {id : 1} }
      ]
    }
  );
});
