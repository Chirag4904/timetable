<script>
    import { onMount } from "svelte";
    import AddTeacher from "../Teacher Components/AddTeacher.svelte";
    import SubjectPref from "./SubjectPref.svelte";
    export let id;
    const subjectsUrl = "http://localhost:5000/api/subjects";
    let subject;
    $: manualTeachers = [];
    $: remaningHours = {
        lecture: 0,
        tutorial: 0,
        practical: 0,
    };

    onMount(async function () {
        await httpGetSubjects();
    });

    async function httpGetSubjects() {
        const resp = await fetch(`${subjectsUrl}?id=${id}`);
        const data = await resp.json();
        subject = data[0];
        manualTeachers = subject.manualTeachers;
        console.log(subject);
        let lecHours = subject.originalStructure.L * subject.lectureBatches;
        let tutHours = subject.originalStructure.T * subject.tutLabBatches;
        let labHours = subject.originalStructure.P * subject.tutLabBatches;
        let total = lecHours + tutHours + labHours;
        remaningHours = {
            lecture: lecHours - subject.allotedHours.lecture,
            tutorial: tutHours - subject.allotedHours.tutorial,
            practical: labHours - subject.allotedHours.practical,
        };
        console.log(subject.name);
        console.log("lecture Hours", lecHours);
        console.log("tutorial Hours", tutHours);
        console.log("lab Hours", labHours);
        console.log("total hours", total);
    }
    //This function captures when add buttons is clicked in the AddTeacher component
    //It updates the values of subject by calling the httpGetSubjects function
    async function handleTeacherAdded(e) {
        // console.log(e);
        // console.log("info me hun");
        await httpGetSubjects();
        // manualTeachers = e.detail.subject.manualTeachers;
    }

    function handleUpdateRemaningHours(e) {
        console.log(e.detail);

        remaningHours = e.detail;
    }

    // function calculate
</script>

{#if subject}
    <div class="bg-gray-100 h-screen">
        <div
            class="w-screen h-8 bg-red-10 justify-center text-[22px] font-medium flex gap-x-2"
        >
            <div>{subject.id}</div>
            <div>-</div>
            <div>{subject.name}</div>
        </div>
        <div class="flex gap-x-4 justify-around mt-2">
            <div class="p-2 bg-yellow-200 rounded-md">
                Remaining lecture : {remaningHours.lecture}
            </div>
            <div class="p-2 bg-yellow-200 rounded-md">
                Remaining tutorial : {remaningHours.tutorial}
            </div>
            <div class="p-2 bg-yellow-200 rounded-md">
                Remaining practical : {remaningHours.practical}
            </div>
        </div>
        <div class="">
            <SubjectPref
                on:remaningHours={handleUpdateRemaningHours}
                subjectId={subject.id}
                subjectName={subject.name}
                pref1={subject.choice1}
                pref2={subject.choice2}
                pref3={subject.choice3}
                allotedTeachers={subject.allotedTeachers}
                {manualTeachers}
            />
        </div>
        <div class="w-full mt-4">
            <AddTeacher
                subjectId={id}
                on:teacherAdded={handleTeacherAdded}
                pref1={subject.choice1}
                pref2={subject.choice2}
                pref3={subject.choice3}
                {manualTeachers}
            />
        </div>
    </div>
{/if}
