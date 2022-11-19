<script>
    import { onMount } from "svelte";
    import AddTeacher from "../Teacher Components/AddTeacher.svelte";
    import SubjectPref from "./SubjectPref.svelte";
    export let id;
    const subjectsUrl = "http://localhost:5000/api/subjects";
    let subject;
    $: manualTeachers = [];
    onMount(async function () {
        await httpGetSubjects();
    });

    async function httpGetSubjects() {
        const resp = await fetch(`${subjectsUrl}?id=${id}`);
        const data = await resp.json();
        subject = data[0];
        manualTeachers = subject.manualTeachers;
        // console.log(subject);
        let lecHours = subject.originalStructure.L * subject.lectureBatches;
        let tutHours = subject.originalStructure.T * subject.tutLabBatches;
        let labHours = subject.originalStructure.P * subject.tutLabBatches;
        let total = lecHours + tutHours + labHours;
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
</script>

{#if subject}
    <div class="bg-gray-100">
        <div class="">
            <SubjectPref
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
            <AddTeacher subjectId={id} on:teacherAdded={handleTeacherAdded} />
        </div>
    </div>
{/if}
