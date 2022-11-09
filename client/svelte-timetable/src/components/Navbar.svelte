<!-- <script>
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
</style> -->
<script>
	import { createEventDispatcher } from "svelte";
	import { Router, Route, Link } from "svelte-routing";
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

<!-- <header>
	  <h1>DashBoard</h1>
	  <h4>Time-Table</h4>
  </header> -->
<Router url="/">
	<div class="relative h-screen bg-slate-200">
		<div
			class="h-[100px] w-screen bg-[url('../../src/assets/bg.webp')] bg-no-repeat bg-cover"
		>
			<!-- <img  src="../../src/assets/tt-logo.svg" width="125px"> -->
			<!-- <div>
			  <div class="text-[27px] italic"> Time-Table</div>
			  <div class="text-[30px] italic"> DashBoard</div>
		  </div> -->
		</div>
		<div class="text-[50px] italic w-[83%] ml-[17%]">DashBoard</div>
		<div
			class="flex justify-around w-[83%] ml-[17%] items-center gap-x-2 mt-8 "
		>
			<div
				class="cursor-pointer w-6/12 h-80 bg-zinc-300 flex justify-center items-center rounded-lg"
				on:click={dispatchSubject}
			>
				<Link to="subjects">
					<div class="text-[35px] italic">Subjects</div>
				</Link>
			</div>

			<div
				class="cursor-pointer w-6/12 h-80 bg-zinc-300 flex justify-center items-center rounded-lg"
				on:click={dispatchTeachers}
			>
				<Link to="teachers">
					<div class="text-[35px] italic">Teachers</div>
				</Link>
			</div>

			<div
				class="absolute top-[5%] left-2 w-[15%] h-[90%] bg-gradient-to-l from-[#bdc3c7] to-[ #2c3e50] rounded-lg"
			>
				<div class="flex items-center">
					<img src="../../src/assets/tt-logo.svg" width="96px" />
					<div class="text-[25px] italic">Time-Table</div>
				</div>
				<div class="w-full">
					<div
						class="text-center text-[25px] text-emerald-900 flex flex-col gap-y-10 mt-20"
					>
						<!-- <div class="rounded-full h-32 w-32 bg-emerald-90 m-auto" /> -->
						<img
							src="https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg"
							alt=""
							class="rounded-full h-32 w-32 bg-emerald-90 m-auto"
						/>
						<div class="cursor-pointer">My Profile</div>
						<div class="cursor-pointer">Home</div>
						<div class="cursor-pointer">About Us</div>
						<div class="cursor-pointer">Log Out</div>
					</div>
				</div>
			</div>
		</div>

		<!-- <div class="flex ">
  </div> -->
		<!-- <div class="flex bg-red-400 items-center">
	  <div class="h-20 bg-blue-400 text-center w-10 ">fad</div>
	  <div class="bg-green-400">djhebfh</div>
  </div> -->
	</div>
</Router>
