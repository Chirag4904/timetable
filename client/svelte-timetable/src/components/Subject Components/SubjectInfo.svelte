<script>
    import { onMount } from "svelte";
    import SubjectPref from "./SubjectPref.svelte";
    export let id;
    const subjectsUrl = "http://localhost:5000/api/subjects";
    let subject;
    onMount(async function () {
        await httpGetSubjects();
    });

    async function httpGetSubjects() {
        const resp = await fetch(`${subjectsUrl}?id=${id}`);
        const data = await resp.json();
        subject = data[0];
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
</script>

{#if subject}
    <div class="bg-gray-100">
        <SubjectPref
            subjectId={subject.id}
            subjectName={subject.name}
            pref1={subject.choice1}
            pref2={subject.choice2}
            pref3={subject.choice3}
            allotedTeachers={subject.allotedTeachers}
        />
    </div>
{/if}
