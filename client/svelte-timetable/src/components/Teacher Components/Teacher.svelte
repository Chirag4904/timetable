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
        <div class="flex flex-col mt-2 p-1 justify-around cursor-pointer">
            <div class="w-full">
                <img
                    src={profilePicture}
                    alt={name}
                    class="w-20 h-20 m-auto rounded-full"
                />
            </div>

            <div
                class="text-center {isAvailable
                    ? 'bg-green-200'
                    : 'bg-red-200'}"
            >
                {name}
            </div>
        </div>
    </Link>
</Router>
