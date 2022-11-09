<script>
	import Subject from "./Subject.svelte";
	import { fly } from "svelte/transition";
	import { onMount } from "svelte";
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	function dispatchSubjectInfo(subject) {
		dispatch("subjectInfo", {
			subject: subject,
		});
	}

	const subjectsUrl = "http://localhost:5000/api/subjects";
	let subjects;
	onMount(async function () {
		await httpGetSubjects();
	});

	async function httpGetSubjects() {
		const resp = await fetch(`${subjectsUrl}`);

		const data = await resp.json();
		subjects = data;
	}

	// console.log(sub[0]);
</script>

<div class="overflow-hidden ">
	<div in:fly={{ x: 200, duration: 2000 }} class="text-center mt-2 text-2xl">
		S U B J E C T S
	</div>
	{#if subjects}
		<div class="flex gap-x-4 mt-4 ml-2 ">
			{#each subjects as sub}
				<Subject {...sub} on:click={() => dispatchSubjectInfo(sub)} />
			{/each}
		</div>
	{/if}
</div>
