<script>
    import axios from "axios";
    import { createEventDispatcher } from "svelte";

    export let name;
    export let profilePicture;
    export let allotedSubjects;
    // console.log("alloted subjects", allotedSubjects);
    export let subjectId;

    export let allotHours;
    // console.log("alloted Hours", allotHours);
    let originalHours = allotHours;
    // console.log(originalHours);
    $: currentLoad =
        originalHours.lectureHrs +
        originalHours.practicalHrs +
        originalHours.tutorialHrs;
    export let id;

    const dispatch = createEventDispatcher();
    function dispatchTeacherAssigned(resp) {
        dispatch("teacherAssigned", {
            lecture: resp.data.available_subject_workload.lecture,
            practical: resp.data.available_subject_workload.practical,
            tutorial: resp.data.available_subject_workload.tutorial,
        });
    }

    const allotTeacherUrl = "http://localhost:5000/api/general/commit_ltp";
    const saveHours = async () => {
        try {
            const resp = await axios.post(allotTeacherUrl, {
                teacher_id: id.toString(),
                subject_id: subjectId,
                lecture_hours: allotHours.lectureHrs,
                tutorial_hours: allotHours.tutorialHrs,
                practical_hours: allotHours.practicalHrs,
            });

            console.log(resp);

            let isAssigned = false;
            const subjectWorkload = resp.data.available_subject_workload;
            console.log(subjectWorkload);
            if (
                subjectWorkload.lecture == 0 &&
                subjectWorkload.tutorial == 0 &&
                subjectWorkload.practical == 0
            ) {
                isAssigned = true;
            }
            const updateSubjectUrl = "http://localhost:5000/api/subjects";
            try {
                await axios.post(updateSubjectUrl, {
                    id: subjectId,
                    isAssigned: isAssigned,
                });
                // console.log(resp);
            } catch (err) {
                console.log(err);
            }
            originalHours = allotHours;
            dispatchTeacherAssigned(resp);
            // allotHours.lectureHrs = ;
        } catch (err) {
            alert(err.response.data.erro_desc.message);
            allotHours = originalHours;
        }
    };

    // console.log(allotHours);
    function handleLectures(e) {
        if (e.target.textContent == "+" && allotHours.lectureHrs < 8) {
            allotHours.lectureHrs += 1;
        } else if (e.target.textContent == "-" && allotHours.lectureHrs > 0) {
            allotHours.lectureHrs -= 1;
        }
    }
    function handleTutorials(e) {
        if (e.target.textContent == "+") {
            allotHours.tutorialHrs += 1;
        } else if (e.target.textContent == "-" && allotHours.tutorialHrs > 0) {
            allotHours.tutorialHrs -= 1;
        }
    }
    function handlePracticals(e) {
        if (e.target.textContent == "+") {
            allotHours.practicalHrs += 2;
        } else if (e.target.textContent == "-" && allotHours.practicalHrs > 0) {
            allotHours.practicalHrs -= 2;
        }
    }

    function isSubjectInAllottedSubjects() {
        let flag = false;
        allotedSubjects.forEach((subject) => {
            if (subject.id == subjectId) {
                flag = true;
            }
        });
        return flag;
    }
</script>

<div class="mt-2 bg-white px-4 rounded-md pb-1 relative">
    {#if allotedSubjects.length > 2}
        <div
            class="absolute top-[-9%] w-full left-0 text-center rounded-md bg-red-400"
        >
            <span>Alloted {allotedSubjects.length} subjects</span>
        </div>
    {:else if allotedSubjects.length == 2 && !isSubjectInAllottedSubjects()}
        <div
            class="absolute top-[-9%] w-full left-0 text-center rounded-md bg-red-400"
        >
            <span>Alloted {allotedSubjects.length} subjects</span>
        </div>
    {/if}
    <div class="flex justify-between">
        <div>Current Hours</div>
        <div>{currentLoad}</div>
    </div>

    <div class="w-full mt-1">
        <img
            src={profilePicture}
            alt={name}
            class="w-20 h-20 rounded-full m-auto"
        />
    </div>
    <div class="text-center">{name}</div>
    <div class="flex flex-col gap-y-2">
        <div class="flex gap-x-2 items-center">
            <div class="w-14">Lecture</div>
            <button on:click={handleLectures}>-</button>
            <div>{allotHours.lectureHrs}</div>
            <button on:click={handleLectures}>+</button>
        </div>
        <div class="flex gap-x-2 items-center">
            <div class="w-14">Tutorial</div>
            <button on:click={handleTutorials}>-</button>
            <div>{allotHours.tutorialHrs}</div>
            <button on:click={handleTutorials}>+</button>
        </div>
        <div class="flex gap-x-2 items-center">
            <div class="w-14">Practical</div>
            <button on:click={handlePracticals}>-</button>
            <div>{allotHours.practicalHrs}</div>
            <button on:click={handlePracticals}>+</button>
        </div>
    </div>

    <button on:click={saveHours} class="w-full save">Save</button>
</div>

<style>
    button {
        background-color: #04aa6d;
        border: none;
        color: white;
        padding: 4px 8px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        border-radius: 2px;
    }

    .save {
        background-color: black;
        border-radius: 6px;
    }

    span {
        animation: blink 1s linear infinite;
    }

    @keyframes blink {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            opacity: 1;
        }
    }
</style>
