<script>
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	function dispatchSubject() {
		dispatch("option", {
			text: "subjects",
		});
	}
	function dispatchTeachers() {
		dispatch("option", {
			text: "teachers",
		});
	}
</script>

<nav class="flex justify-around  items-center gap-x-2 ">
	<div
		class="cursor-pointer w-6/12 h-10 bg-blue-100 flex justify-center items-center"
		on:click={dispatchSubject}
	>
		Subjects
	</div>
	<div
		class="cursor-pointer w-6/12 h-10 bg-blue-100 flex justify-center items-center"
		on:click={dispatchTeachers}
	>
		Teachers
	</div>
</nav>

<style>
	* {
		box-sizing: border-box;
	}
</style>
