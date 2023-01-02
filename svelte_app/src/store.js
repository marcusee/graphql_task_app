import { writable, derived } from 'svelte/store';


/**
 * @type {any}
 */
export const taskApiData = writable({});

export const tasks = derived(taskApiData, ($taskApiData) => {
    // @ts-ignore
    if ($taskApiData?.data?.tasks ?? false){
      // @ts-ignore
      return $taskApiData.data.tasks.map(task => task);
    }
    return [];
  });


export const usersApiData = writable([]);


export const users = derived(usersApiData, ($usersApiData) => {
    // @ts-ignore
    if ($usersApiData?.data?.users ?? false){
      // @ts-ignore
      return $usersApiData.data.users.map(user => user);
    }
    return [];
  });


