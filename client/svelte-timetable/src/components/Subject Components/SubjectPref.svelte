<script>
	import Teacher from "../Teacher Components/Teacher.svelte";
	const teachersUrl = "http://localhost:5000/api/teachers";
	export let pref1;
	export let pref2;
	export let pref3;

	async function getTeacher(candidate) {
		const resp = await fetch(`${teachersUrl}/?id=${candidate}`);
		const data = await resp.json();
		console.log(data[0]);
		return await data[0];
	}
</script>

<div class="flex flex-col gap-y-4">
	<div class="bg-red-100">
		<div>Number 1 preference</div>
		{#each pref1 as teacher}
			{#await getTeacher(teacher) then val}
				<Teacher name={val.name} isAvailable={val.isAvailable} id={val.id} />
			{/await}
		{/each}
	</div>

	<div class="bg-blue-100">
		<div>Number 2 preferences</div>
		{#each pref2 as teacher}
			{#await getTeacher(teacher) then val}
				<div>{val.name}</div>
			{/await}
		{/each}
	</div>

	<div class="bg-green-100">
		<div>Number 3 preferences</div>
		{#each pref3 as teacher}
			{#await getTeacher(teacher) then val}
				<div>{val.name}</div>
			{/await}
		{/each}
	</div>
</div>
