<script>
	import EditTeacher from "../Teacher Components/EditTeacher.svelte";
	const teachersUrl = "http://localhost:5000/api/teachers";
	export let pref1;
	export let pref2;
	export let pref3;
	export let subjectId;
	export let subjectName;
	export let allotedTeachers;
	async function getTeacher(candidate) {
		const resp = await fetch(`${teachersUrl}/?id=${candidate}`);
		const data = await resp.json();
		// console.log(data[0]["_id"]);
		return await data[0];
	}

	// $: allotHours;

	const allot = (tid) => {
		console.log(tid);
		try {
			for (let i = 0; i < allotedTeachers.length; i++) {
				if (allotedTeachers[i].teacher == tid) {
					console.log("hua", i);
					// allotHours = allotedTeachers[i];
					// console.log(allot Hours);
					return allotedTeachers[i];
				} else {
					console.log("nahi hua", i);
				}
			}
		} catch (err) {
			console.log(err);
		}

		return {
			lectureHrs: 0,
			practicalHrs: 0,
			tutorialHrs: 0,
		};
	};
</script>

<div class="flex flex-col gap-y-4 pl-10 overflow-x-hidden">
	<div
		class="w-screen h-8 bg-red-10 justify-center text-[22px] font-medium flex gap-x-2"
	>
		<div>{subjectId}</div>
		<div>-</div>
		<div>{subjectName}</div>
	</div>
	<div class="">
		<div>Number 1 preference</div>
		<div class="flex gap-x-4">
			{#each pref1 as teacher}
				{#await getTeacher(teacher) then val}
					{#await allot(val["_id"]) then allotHours}
						{#if allotHours}
							<EditTeacher
								{...val}
								{subjectId}
								{allotedTeachers}
								{allotHours}
							/>
						{/if}
					{/await}
				{/await}
			{/each}
		</div>
	</div>

	<div class="">
		<div>Number 2 preferences</div>
		<div class="flex gap-x-4">
			{#each pref2 as teacher}
				{#await getTeacher(teacher) then val}
					{#await allot(val["_id"]) then allotHours}
						{#if allotHours}
							<EditTeacher
								{...val}
								{subjectId}
								{allotedTeachers}
								{allotHours}
							/>
						{/if}
					{/await}
				{/await}
			{/each}
		</div>
	</div>

	<div class="">
		<div>Number 3 preferences</div>
		<div class="flex gap-x-4">
			{#each pref3 as teacher}
				{#await getTeacher(teacher) then val}
					{#await allot(val["_id"]) then allotHours}
						{#if allotHours}
							<EditTeacher
								{...val}
								{subjectId}
								{allotedTeachers}
								{allotHours}
							/>
						{/if}
					{/await}
				{/await}
			{/each}
		</div>
	</div>
</div>
