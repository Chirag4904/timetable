<script>
	import { Router, Route, Link } from "svelte-routing";

	export let id;
	export let isAssigned;
</script>

<Router url="/">
	<Link to="subject/{id}">
		<div class="w-24 h-10 p-2 {isAssigned ? 'bg-green-200' : 'bg-red-200'}">
			<div class="text-center">{id}</div>
		</div>
	</Link>
</Router>
