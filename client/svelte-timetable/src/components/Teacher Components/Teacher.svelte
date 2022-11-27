<script>
    import { Router, Route, Link } from "svelte-routing";

    export let id;
    id = id.toString();
    export let name;
    export let isAvailable;
    export let profilePicture;
    // export let
</script>

<Router url="/">
    <Link to={id}>
        <div class="flex  mt-2 p-1 justify-around cursor-pointer items-center">
            <div class="w-full ">
                <img
                    src={profilePicture}
                    alt={name}
                    class="w-20 h-20 m-auto rounded-full"
                />
            </div>

            <div
                class=" w-96 rounded -md text-center text-[15px] text-lime-100 font-semibold p-6 {isAvailable
                    ? 'bg-gradient-to-r from-[#233329] to-[#63D471]'
                    : 'bg-gradient-to-r from-[#A71D31] to-[#3F0D12]'}"
            >
                {name}
            </div>
        </div>
    </Link>
</Router>
