<script>
	export let id;
	export let name;
	export let isAvailable;
	export let profilePicture;
	// export let
</script>

<div class="flex flex-col mt-2  p-1 justify-around">
	<div class="w-full">
		<img
			src={profilePicture}
			alt={name}
			class="w-20 h-20 m-auto rounded-full"
		/>
	</div>

	<div class="text-center {isAvailable ? 'bg-green-200' : 'bg-red-200'}">
		{name}
	</div>
</div>
