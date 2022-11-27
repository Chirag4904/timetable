<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import DropDown from "./DropDown.svelte";
    const teachersUrl = "http://localhost:5000/api/teachers";
    let teacher;
    export let teacherId;
    let teacherMongoId;
    let allotedSubjects;
    $: subjectTotalHours = 0;
    onMount(async function () {
        await httpGetTeacherInfo();
    });

    async function httpGetTeacherInfo() {
        const resp = await fetch(`${teachersUrl}?id=${teacherId}`);
        const data = await resp.json();
        teacher = data[0];
        // console.log(teacher);
        teacherMongoId = teacher._id;
        allotedSubjects = teacher.allotedSubjects;
    }

    async function httpGetAllotedSubjectsInfo(subjectId) {
        const subjectsUrl = "http://localhost:5000/api/subjects";
        const resp = await axios.get(`${subjectsUrl}?id=${subjectId}`);
        const data = await resp.data;
        const subject = data[0];
        // console.log(subject);
        subjectTotalHours =
            subject.totalLecture +
            subject.totalTutorial +
            subject.totalPractical;
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
    <div class="flex w-screen">
        <div class=" w-[15%] h-screen bg-[#002254] rounded-r-lg">
            <div class="w-full">
                <div class="text-center flex-col gap-y-10 mt-20">
                    <img
                        src={teacher.profilePicture}
                        alt={teacher.name}
                        class="rounded-full h-32 w-32 bg-[#002254] m-auto"
                    />
                    <div
                        class="text-center text-white text-[30px] pt-10 font-bold"
                    >
                        {teacher.name}
                    </div>
                    <div class="text-center text-white text-sm pt-2 ">
                        {teacher.email}
                    </div>
                </div>
            </div>
        </div>
        {#if allotedSubjects.length > 0}
            <div
                class="card relative w-[85%]  rounded-md m-10 p-5 shadow-[0_9px_17px_-6px_rgba(0,0,0,0.2)] "
            >
                <div class="text-[20px] pl-5 pb-5 font-semibold">
                    Subjects Alloted
                </div>
                {#each allotedSubjects as subject}
                    {#await httpGetAllotedSubjectsInfo(subject.id) then allotment}
                        <DropDown {allotment} {subjectTotalHours} />
                    {/await}
                {/each}
            </div>
        {:else}
            <div class="m-20 text-[25px] font-bold">No subjects alloted</div>
        {/if}
    </div>
{/if}
