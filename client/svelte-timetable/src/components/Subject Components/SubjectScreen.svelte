<script>
    import Subject from "./Subject.svelte";
    import { fly } from "svelte/transition";
    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function dispatchSubjectInfo(subject) {
        dispatch("subjectInfo", {
            subject: subject,
        });
    }

    const subjectsUrl = "http://localhost:5000/api/subjects";
    let subjects;
    onMount(async function () {
        await httpGetSubjects();
    });

    async function httpGetSubjects() {
        const resp = await fetch(`${subjectsUrl}`);

        const data = await resp.json();
        subjects = data;
    }

    // console.log(sub[0]);
</script>

<div class="overflow-hidden ">
    <!-- <div in:fly={{ x: 200, duration: 2000 }} class="text-center mt-2 text-2xl">
        S U B J E C T S
    </div> -->
    <div class="flex gap-x-4 pl-2 mt-[20px] mb-[10px]">
        <div class="title text-[35px] ml-[30px] mr-[15px] font-bold">
            S U B J E C T S
        </div>
        <div class="flex gap-x-2 items-center">
            <div class="w-5 h-5 bg-red-400 rounded-sm" />
            <div>No teachers available</div>
        </div>
        <div class="flex gap-x-2 items-center">
            <div class="w-5 h-5 bg-green-400 rounded-sm" />
            <div>Subject Alloted</div>
        </div>
        <div class="flex gap-x-2 items-center">
            <div class="w-5 h-5 bg-yellow-400 rounded-sm" />
            <div>Subject to be alloted</div>
        </div>
    </div>
    {#if subjects}
        <div class="flex gap-4 mt-3 pl-2 flex-wrap">
            {#each subjects as sub}
                {#if sub.choice1.length == 0 && sub.choice2.length == 0 && sub.choice3.length == 0}
                    <Subject
                        id={sub.id}
                        isAssigned={sub.isAssigned}
                        isTaken={false}
                    />
                {:else}
                    <Subject id={sub.id} isAssigned={sub.isAssigned} />
                {/if}
            {/each}
        </div>
    {/if}
</div>
