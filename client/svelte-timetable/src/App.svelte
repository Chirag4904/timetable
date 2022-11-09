<script>
	import { Router, Route, Link } from "svelte-routing";
	import Navbar from "./components/Navbar.svelte";
	import SubjectScreen from "./components/Subject Components/SubjectScreen.svelte";
	import TeacherScreen from "./components/Teacher Components/TeacherScreen.svelte";
	import SubjectPref from "./components/Subject Components/SubjectPref.svelte";
	import SubjectInfo from "./components/Subject Components/SubjectInfo.svelte";
	$: choice = "subjecs";
	function handleChoice(e) {
		choice = e.detail.text;
	}
	$: subjectInfo = {};
	function handleSubjectInfo(e) {
		subjectInfo = e.detail.subject;
		console.log(e.detail.subject);
	}
</script>

<Router>
	<body>
		<Route path="/app">
			<Navbar on:option={handleChoice} />
			<!-- {#if choice === "subjects"}
				<SubjectScreen on:subjectInfo={handleSubjectInfo} />
			{:else if choice === "teachers"}
				<TeacherScreen />
			{/if} -->
		</Route>
		<Route path="/app/subjects">
			<SubjectScreen on:subjectInfo={handleSubjectInfo} />
		</Route>
		<Route path="/app/teachers">
			<TeacherScreen />
		</Route>
		<Route path="/app/subjects/:id" let:params>
			<div>
				<SubjectInfo id={params.id} />
			</div>
		</Route>
	</body>
</Router>

<style global lang="postcss">
	@tailwind utilities;
	@tailwind components;
	@tailwind base;
</style>
