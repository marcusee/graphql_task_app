<script>
	import { onMount } from 'svelte';
	import {GQL_DOMAIN} from '../config';
	import { taskApiData, tasks, usersApiData, users } from '../store.js';
	import { Button, Dropdown, DropdownItem, Chevron } from 'flowbite-svelte'
	let dropdownOpen = false;

	export const convertDate = (/** @type {string} */ time) => {
		return new Intl.DateTimeFormat('en-US').format(new Date(time));
		// return  (new Date(time)).toISOString().slice(0, 10).replace(/-/g, "/").replace("T", " ");
	}

	export const fetchFromGraphQL = async (/** @type {string} */ query) => {
		const res = await fetch(`${GQL_DOMAIN}/graphql`, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			query,
			}),
		});
		return res.json();
	}

	onMount(async () => {
		const tasksData = await fetchFromGraphQL(`
			query getTasks {
			tasks {
				id
				title
				status
				created
				assignee {
				name
				}
			}
			}
		`);
		taskApiData.set(tasksData);

		const userData = await fetchFromGraphQL(`
			query getUsers {
			users {
				id
				name
			}
			}
		`);

		usersApiData.set(userData);
	});

	export async function onUserClick (/** @type {number} */ userId) {
		dropdownOpen = false;
		const res = await fetch(`${GQL_DOMAIN}/graphql`,
		{
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify({
				query: `
					query getTasks($assigneeId: Int!) {
						tasks (assigneeId: $assigneeId) {
							id
							title
							status
							created
							assignee {
								name
							}
						}
					}
				`,
				variables : {assigneeId : userId}
			}),
		});

		let tasksData = await res.json();
		taskApiData.set(tasksData);
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class=" flex flex-col items-center justify-center h-screen gap-4">
		<h1 class="text-white mb-6">Tasks</h1>
		<div class="flex w-full justify-between">
			<Button><Chevron>Filter User</Chevron></Button>
			<Dropdown bind:open={dropdownOpen}>
				{#each $users as user}
					<DropdownItem on:click ={() => onUserClick(user.id)}>{user.name}</DropdownItem>
				{/each}
			</Dropdown>
		</div>

		<table class="w-full mx-auto text-sm text-left text-gray-500 dark:text-gray-400">
		  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
			<tr>
			  <th scope="col" class="py-3 px-6">
				Title
			  </th>
			  <th scope="col" class="py-3 px-6">
				Status
			  </th>
			  <th scope="col" class="py-3 px-6">
				Created
			  </th>
			  <th scope="col" class="py-3 px-6">
				Assginee
			  </th>
			</tr>
		  </thead>
		  <tbody>
			{#each $tasks as task}
			<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
			  <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
				{task.title}
			  </th>
			  <td class="py-4 px-6">
				{task.status}
			  </td>
			  <td class="py-4 px-6">
				{ convertDate(task.created)}
			  </td>
			  <td class="py-4 px-6">
				{task.assignee?.name ?? '?'}
			  </td>
			</tr>
			{/each}
		  </tbody>
		</table>
	  </div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
