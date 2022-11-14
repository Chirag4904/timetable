<script>
    import axios from "axios";
    import { onMount } from "svelte";
    const teachersUrl = "http://localhost:5000/api/teachers";
    let teacher;
    export let teacherId;
    let teacherMongoId;
    let allotedSubjects;
    onMount(async function () {
        await httpGetTeacherInfo();
    });

    async function httpGetTeacherInfo() {
        const resp = await fetch(`${teachersUrl}?id=${teacherId}`);
        const data = await resp.json();
        teacher = data[0];
        console.log(teacher);
        teacherMongoId = teacher._id;
        allotedSubjects = teacher.allotedSubjects;
    }

    async function httpGetAllotedSubjectsInfo(subjectId) {
        const subjectsUrl = "http://localhost:5000/api/subjects";
        const resp = await axios.get(`${subjectsUrl}?id=${subjectId}`);
        const data = await resp.data;
        const subject = data[0];

        const allotedTeachers = subject.allotedTeachers;
        let allotment = {
            subjectName: "",
            subjectId: "",
            lectureHrs: "",
            tutorialHrs: "",
            practicalHrs: "",
        };
        allotedTeachers.forEach((teacher) => {
            if (teacher.teacher === teacherMongoId) {
                console.log("udhr");
                // console.log(teacher);
                allotment = {
                    subjectName: subject.name,
                    subjectId: subject.id,
                    lectureHrs: teacher.lectureHrs,
                    tutorialHrs: teacher.tutorialHrs,
                    practicalHrs: teacher.practicalHrs,
                };
            }
        });

        return allotment;
    }
</script>

{#if teacher}
    <div class="text-center text-2xl mt-2">{teacher.name}</div>
    {#if allotedSubjects.length > 0}
        <div class="flex flex-col gap-y-4 mt-4 bg-red-400">
            {#each allotedSubjects as subject}
                {#await httpGetAllotedSubjectsInfo(subject.id) then allotment}
                    <div class="bg-yellow-200 ">
                        <div class="flex gap-x-2 ">
                            <div>{allotment.subjectId}</div>
                            <div>{allotment.subjectName}</div>
                        </div>
                        <div class="flex gap-x-2">
                            <div>Lecture Hours</div>
                            <div>{allotment.lectureHrs}</div>
                        </div>
                        <div class="flex gap-x-2">
                            <div>Tutorial Hours</div>
                            <div>{allotment.tutorialHrs}</div>
                        </div>
                        <div class="flex gap-x-2">
                            <div>practicalHrs Hours</div>
                            <div>{allotment.practicalHrs}</div>
                        </div>
                    </div>
                {/await}
            {/each}
        </div>
    {:else}
        <div>No subjects alloted</div>
    {/if}
    <!-- {#await httpGetAllotedSubjectsInfo(teacher.allotedSubjects[0].id) then allotment}
        {#if allotment}
            <div>{allotment.lectureHrs}</div>
        {:else}
            <div>Not Alloted</div>
        {/if}
    {/await} -->
{/if}
