<script>
    import Teacher from "./Teacher.svelte";
    import { onMount } from "svelte";

    const teachersUrl = "http://localhost:5000/api/teachers";
    let teachers;
    onMount(async function () {
        await httpGetTeachers();
    });

    async function httpGetTeachers() {
        const resp = await fetch(`${teachersUrl}`);

        const data = await resp.json();
        teachers = data;
    }

    // console.log(sub[0]);
</script>

<div>
    <div class=" teach ml-10 mt-3 text-[30px] font-bold ">T E A C H E R S</div>

    {#if teachers}
        <div class="flex gap-x-2 mt-4 ml-4 mb-10 flex-wrap">
            {#each teachers as teacher}
                <div
                    class="flex card rounded-lg shadow-[0px_0px_3px_rgba(3,102,214,0.3)] mb-10 ml-2 mr -2 bg-gray-50 h-30 transition duration-300 ease-in-out hover:opacity-70"
                >
                    <Teacher
                        id={teacher.id}
                        name={teacher.name}
                        profilePicture={teacher.profilePicture}
                        isAvailable={teacher.isAvailable}
                    />
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .teach {
        font-family: "Poppins";
    }
</style>
