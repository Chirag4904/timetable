<script>
    import { Router, Route, Link, navigate } from "svelte-routing";
    import { onMount } from "svelte";
    import Navbar from "./components/Navbar.svelte";
    import SubjectScreen from "./components/Subject Components/SubjectScreen.svelte";
    import TeacherScreen from "./components/Teacher Components/TeacherScreen.svelte";
    import SubjectInfo from "./components/Subject Components/SubjectInfo.svelte";
    import Form from "./components/form.svelte";
    import TeacherSubjectsInfo from "./components/Teacher Components/TeacherSubjectsInfo.svelte";

    const subjectsUrl = "http://localhost:5000/api/subjects";
    let subjects;
    onMount(async function () {
        // temporary routing to app if user goes to '/' path
        if (window.location.pathname === "/") {
            navigate("/app", { replace: true });
        }
        await httpGetSubjects();
    });

    async function httpGetSubjects() {
        const resp = await fetch(`${subjectsUrl}`);

        const data = await resp.json();
        subjects = data;
    }
</script>

<Router>
    <body>
        <Route path="/app">
            <Navbar />
        </Route>
        <Route path="/app/subjects">
            <SubjectScreen />
        </Route>
        <Route path="/app/teachers">
            <TeacherScreen />
        </Route>
        <Route path="/app/subjects/:id" let:params>
            <div>
                <SubjectInfo id={params.id} />
            </div>
        </Route>
        <Route path="/app/teachers/:id" let:params>
            <div>
                <TeacherSubjectsInfo teacherId={params.id} />
            </div>
        </Route>
        <Route path="/app/form">
            {#if subjects}
                <Form incomingSubjects={subjects} />
            {/if}
        </Route>
    </body>
</Router>

<style global lang="postcss">
    @tailwind utilities;
    @tailwind components;
    @tailwind base;
</style>
