<script>
	import { Router, Route, Link } from "svelte-routing";

	export let id;
	export let isAssigned;
</script>

<Router url="/">
	<Link to={id}>
		<div
			class="relative w-24 h-14 rounded-md p-2 {isAssigned
				? 'bg-green-200'
				: 'bg-red-200'}"
		>
			<div class="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4">
				{id}
			</div>
		</div>
	</Link>
</Router>
