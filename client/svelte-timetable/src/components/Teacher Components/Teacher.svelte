<script>
	export let id;
	export let name;
	export let isAvailable;

	// export let
</script>

<div
	class="flex flex-col {isAvailable
		? 'bg-green-200'
		: 'bg-red-200'} p-1 justify-around"
>
	<img
		src="https://www.clipartmax.com/png/middle/144-1448593_avatar-icon-teacher-avatar.png"
		alt=""
		class="w-20 h-20"
	/>
	<div class="text-center">{name}</div>
</div>
