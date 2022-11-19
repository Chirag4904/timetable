<script>
    import { onMount } from "svelte";
    import axios from "axios";
    const teachersUrl = "http://localhost:5000/api/teachers";
    const subjectsUrl = "http://localhost:5000/api/subjects";

    export let subjectId;
    export let pref1;
    export let pref2;
    export let pref3;
    export let manualTeachers;
    let teachers;

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    //This is dispatching or firing the evend teacherAdded whenever add button is clicked
    //This lets us know when the add button is clicked which is captured by the parent component
    function dispatchTeacherAdded() {
        dispatch("teacherAdded");
    }

    onMount(async function () {
        await httpGetTeachers();
    });
    let selectedTeacher;
    async function httpGetTeachers() {
        const resp = await fetch(`${teachersUrl}`);

        const data = await resp.json();
        teachers = data;
        selectedTeacher = teachers[0].id;
        // console.log(teachers);
    }

    async function handleAddTeacher() {
        try {
            if (
                pref1.includes(selectedTeacher) ||
                pref2.includes(selectedTeacher) ||
                pref3.includes(selectedTeacher) ||
                manualTeachers.includes(selectedTeacher)
            ) {
                alert("Teacher already exists");
                return;
            }
            const resp = await axios.post(`${subjectsUrl}/addTeacher`, {
                subjectId: subjectId,
                teacherId: selectedTeacher,
            });
            dispatchTeacherAdded();
            console.log(resp);
        } catch (err) {
            console.log(err);
        }
    }
</script>

{#if teachers}
    <div class="flex p-4 bg-[#04aa6d] rounded-lg w-[30%] m-auto">
        <div class="w-[80%]">
            <select
                bind:value={selectedTeacher}
                class="w-full h-8 rounded-lg"
                placeholder="Select Teacher"
            >
                {#each teachers as teacher}
                    <option value={teacher.id} class="text-center">
                        {teacher.name}
                    </option>
                {/each}
            </select>
        </div>

        <button
            on:click={handleAddTeacher}
            class="cursor-pointer w-[20%] bg-black text-white rounded-lg"
        >
            Add
        </button>
    </div>
{/if}
