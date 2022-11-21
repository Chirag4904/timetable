<script>
    import { Router, navigate, Link } from "svelte-routing";
    import Icon from "@iconify/svelte";
    import { slide } from "svelte/transition";
    export let allotment;
    export let subjectTotalHours;
    $: isOpen = false;
    const toggle = () => {
        isOpen = !isOpen;
    };
    const currentAllotedHours =
        allotment.lectureHrs + allotment.tutorialHrs + allotment.practicalHrs;
    const percent = Math.floor((currentAllotedHours / subjectTotalHours) * 100);
</script>

<Router url="/">
    <div
        class="  m-auto p-4 rounded-l shadow-[0_9px_17px_-3px_rgba(0,0,0,0.1)] w-full "
    >
        <div
            on:click={toggle}
            class="button  aria-expanded={isOpen} cursor-pointer flex justify-between items-center w-full"
        >
            <div
                class="bg-cyan-500 shadow-lg shadow-cyan-500/50 p-4 rounded-l text-white"
            >
                {allotment.subjectId}
            </div>
            <div class="text-[20px] pl-2 font-semibold">
                {allotment.subjectName}
            </div>
            <div class="text-[22px] pl-2 font-semibold text-orange-700">
                {currentAllotedHours}
            </div>
            <div
                role="progressbar"
                aria-valuenow="6"
                aria-valuemin="0"
                aria-valuemax="100"
                style={`--value:${percent}`}
            />
            <!-- <div class="shadow-[0_9px_17px_-3px_rgba(0,0,0,0.3)] ">
            <Icon icon="material-symbols:menu-book-outline-sharp" color="black" width="40" height="40" />
        </div> -->
            <Link to={`/app/subjects/${allotment.subjectId}`}>
                <div class="relative ">
                    <div>
                        <Icon
                            icon="material-symbols:menu-book-outline-sharp"
                            color="black"
                            width="40"
                            height="40"
                            class="drop-shadow-2xl"
                        />
                    </div>

                    <div
                        class=" absolute bottom-[-60px] opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-center text-[11px] text-blue-400 font-semibold"
                    >
                        Subject
                    </div>
                </div>
            </Link>
        </div>

        {#if isOpen}
            <div
                class="flex flex-col mt-4 gap-y-2"
                transition:slide={{ duration: 300 }}
            >
                <div class="flex gap-x-2 items-center ">
                    <Icon
                        icon="ic:baseline-keyboard-arrow-right"
                        width="20"
                        height="20"
                    />
                    <div class="text-[20px] pl-2 font-semibold self-end">
                        Lecture Hours :
                    </div>
                    <div class="text-[20px] pl-2 font-semibold">
                        {allotment.lectureHrs}
                    </div>
                </div>
                <div class="flex gap-x-2 items-center">
                    <Icon
                        icon="ic:baseline-keyboard-arrow-right"
                        width="20"
                        height="20"
                    />
                    <div class="text-[20px] pl-2 font-semibold">
                        Tutorial Hours :
                    </div>
                    <div class="text-[20px] pl-2 font-semibold">
                        {allotment.tutorialHrs}
                    </div>
                </div>
                <div class="flex gap-x-2 items-center">
                    <Icon
                        icon="ic:baseline-keyboard-arrow-right"
                        width="20"
                        height="20"
                    />
                    <div class="text-[20px] pl-2 font-semibold">
                        Practical Hours :
                    </div>
                    <div class="text-[20px] pl-2 font-semibold">
                        {allotment.practicalHrs}
                    </div>
                </div>
            </div>
        {/if}
    </div>
</Router>

<style>
    @keyframes progress {
        0% {
            --percentage: 0;
        }
        100% {
            --percentage: var(--value);
        }
    }

    @property --percentage {
        syntax: "<number>";
        inherits: true;
        initial-value: 0;
    }

    [role="progressbar"] {
        --percentage: var(--value);
        --primary: #369;
        --secondary: #adf;
        --size: 70px;
        animation: progress 2s 0.5s forwards;
        width: var(--size);
        aspect-ratio: 1;
        border-radius: 50%;
        position: relative;
        overflow: hidden;
        display: grid;
        place-items: center;
    }

    [role="progressbar"]::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: conic-gradient(
            var(--primary) calc(var(--percentage) * 1%),
            var(--secondary) 0
        );
        mask: radial-gradient(white 55%, transparent 0);
        mask-mode: alpha;
        -webkit-mask: radial-gradient(#0000 55%, #000 0);
        -webkit-mask-mode: alpha;
    }

    [role="progressbar"]::after {
        counter-reset: percentage var(--value);
        content: counter(percentage) "%";
        font-family: Helvetica, Arial, sans-serif;
        font-size: calc(var(--size) / 5);
        color: var(--primary);
    }
</style>
