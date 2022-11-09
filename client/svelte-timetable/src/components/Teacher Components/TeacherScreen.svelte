<script>
	import Teacher from "./Teacher.svelte";
	import { onMount } from "svelte";

	const teachersUrl = "http://localhost:5000/api/teachers";
	let teachers;
	onMount(async function () {
		await httpGetTeachers();
	});

	async function httpGetTeachers() {
		const resp = await fetch(`${teachersUrl}`);

		const data = await resp.json();
		teachers = data;
	}

	// console.log(sub[0]);
</script>

<div>
	<div class="text-center text-2xl ">T E A C H E R S</div>

	{#if teachers}
		<div class="flex gap-x-2 mt-4">
			{#each teachers as teacher}
				<Teacher {...teacher} />
			{/each}
		</div>
	{/if}
</div>
