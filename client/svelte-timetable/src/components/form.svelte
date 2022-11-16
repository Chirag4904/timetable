<script>
    import axios from "axios";
    import { onMount } from "svelte";
    export let incomingSubjects;
    const subjects = [];
    function populateSubjects() {
        incomingSubjects.forEach((subject) => {
            subjects.push(subject.id);
        });
    }
    populateSubjects();

    let name;
    let form;
    let email;
    let core1;
    let core2;
    let core3;
    onMount(() => {
        form = document.getElementById("form");
        name = document.getElementById("name");
        email = document.getElementById("email");
        core1 = document.getElementById("p1");
        core2 = document.getElementById("p2");
        core3 = document.getElementById("p3");

        // console.log(form);
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            let validName = validateName();
            if (!validName) {
                alert("Please Enter valid name -> First Name + Last Name");
            }
            let validEmail = validateEmail();
            if (!validEmail) {
                alert("Please Enter a valid Email");
            }
            let validPref = validatePreferences();
            if (!validPref) {
                alert("Please select different Preferences");
            }
            if (validName && validEmail && validPref) {
                connectToBackend();
            }
        });

        name.addEventListener("keydown", () => {
            validateName();
        });

        email.addEventListener("keydown", () => {
            validateEmail();
        });
    });

    const setError = (element, message) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector(".error");

        errorDisplay.innerText = message;
        inputControl.classList.add("error");
        inputControl.classList.add("success");
    };

    const setSuccess = (element) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector(".error");

        errorDisplay.innerText = "";
        inputControl.classList.add("success");
        inputControl.classList.add("error");
    };

    const validateName = () => {
        const nameValue = name.value.trim();

        if (nameValue === "" || nameValue === null) {
            setError(name, "Enter your Name!");
            return false;
        } else if (!reg.test(nameValue)) {
            setError(name, "Enter Valid Name!");
            return false;
        } else {
            setSuccess(name);
            return true;
        }
    };

    const validateEmail = () => {
        const emailValue = email.value.trim();

        if (emailValue === "" || emailValue === null) {
            setError(email, "Enter email!");
            return false;
        } else if (!regexp.test(String(emailValue).toLowerCase())) {
            setError(email, "Enter valid email!");
            return false;
        } else {
            setSuccess(email);
            return true;
        }
    };

    const validatePreferences = () => {
        if (pref1 == pref2 || pref1 == pref3 || pref2 == pref3) {
            return false;
        }
        return true;
    };
    function handleChange() {
        if (pref1 == pref2 && pref1 == pref3) {
            setError(core1, "All the preferences are the same");
            setError(core2, "All the preferences are the same");
            setError(core3, "All the preferences are the same");
        } else if (pref1 == pref2) {
            setError(core1, "same pref as Core 2");
            setError(core2, "same pref as Core 1");
            setSuccess(core3);
        } else if (pref1 == pref3) {
            setError(core1, "same pref as Core 3");
            setError(core3, "same pref as Core 1");
            setSuccess(core2);
        } else if (pref2 == pref3) {
            setError(core2, "same pref as Core 3");
            setError(core3, "same pref as Core 2");
            setSuccess(core1);
        } else {
            setSuccess(core1);
            setSuccess(core2);
            setSuccess(core3);
        }
    }

    async function connectToBackend() {
        const teachersUrl = "http://localhost:5000/api/teachers";

        const resp = await axios.post(teachersUrl, {
            name: name.value,
            email: email.value,
            subjects: [
                {
                    subjectId: pref1,
                    L: 0,
                    T: 0,
                    P: 0,
                    prefOrder: 1,
                },
                {
                    subjectId: pref2,
                    L: 0,
                    T: 0,
                    P: 0,
                    prefOrder: 2,
                },
                {
                    subjectId: pref3,
                    L: 0,
                    T: 0,
                    P: 0,
                    prefOrder: 3,
                },
            ],
        });

        if (resp.status == 200) {
            name.value = "";
            email.value = "";
            alert("Form submitted successfully");
        } else {
            alert("Form not submitted");
            console.log("test");
        }
    }
    let pref1;
    let pref2;
    let pref3;
    if (subjects.length > 0) {
        pref1 = subjects[0];
        pref2 = subjects[1];
        pref3 = subjects[2];
    }

    let reg = /^[a-zA-Z]+ [a-zA-Z]+$/;
    var regexp =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
</script>

{#if subjects.length > 0}
    <div
        class="w-screen h-screen bg-cover bg-[url('../../src/assets/formbg.jpg')] bg-no-repeat"
    >
        <div
            class=" flex space-x-2 justify-center text-[34px] text-white pt-10 italic "
        >
            Course Preference Form
        </div>
        <form
            id="form"
            autocomplete="off"
            class="bg-gradient-to-l from-[#accbee] to-[#e7f0fd] m-auto w-[50%] h-[75%] shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8"
        >
            <div class="mt-4 input-control relative">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="name"
                >
                    Name
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Enter Name"
                    autocomplete="off"
                />
                <div class="error text-red-600 text-sm absolute " />
            </div>

            <div class="mt-5 relative">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="email"
                >
                    E-mail
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    autocomplete="off"
                />

                <div class="error text-red-600 text-sm absolute" />
            </div>

            <div class="mt-5 relative">
                <div
                    class="error text-red-600 text-sm absolute -bottom-[20px]"
                />
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="pref"
                    id="core1"
                >
                    Core Preference-1
                </label>
                <select
                    id="p1"
                    bind:value={pref1}
                    on:change={handleChange}
                    placeholder="Select Pref1"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                >
                    {#each subjects as sub}
                        <option value={sub}>
                            {sub}
                        </option>
                    {/each}
                </select>
            </div>
            <div class="mt-5 relative">
                <div
                    class="error text-red-600 text-sm absolute -bottom-[20px] "
                />
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="pref"
                >
                    Core Preference-2
                </label>
                <select
                    id="p2"
                    bind:value={pref2}
                    on:change={handleChange}
                    placeholder="Select Pref1"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                >
                    {#each subjects as sub}
                        <option value={sub}>
                            {sub}
                        </option>
                    {/each}
                </select>
            </div>
            <div class="mt-5 relative">
                <div
                    class="error text-red-600 text-sm absolute -bottom-[20px] "
                />
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="pref"
                >
                    Core Preference-3
                </label>
                <select
                    id="p3"
                    bind:value={pref3}
                    on:change={handleChange}
                    placeholder="Select Pref1"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                >
                    {#each subjects as sub}
                        <option value={sub}>
                            {sub}
                        </option>
                    {/each}
                </select>
            </div>
            <div class="flex space-x-2 justify-center mt-10">
                <button
                    type="submit"
                    class="inline-block w-[30%] h-[30%] px-6 py-2 border-2 border-cyan-800 text-cyan-800 font-medium text-xl leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    >Submit</button
                >
            </div>
        </form>
    </div>
{/if}
