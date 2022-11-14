<script>
    import { Router, Route, Link } from "svelte-routing";
</script>

<Router url="/">
    <div class="relative h-screen bg-slate-200">
        <div
            class="h-[100px] w-screen bg-[url('../../src/assets/bg.webp')] bg-no-repeat bg-cover"
        />
        <div class="text-[50px] italic w-[83%] ml-[17%]">DashBoard</div>
        <div
            class="flex justify-around w-[83%] ml-[17%] items-center gap-x-2 mt-8 "
        >
            <Link to="subjects" class="w-6/12">
                <div
                    class="cursor-pointer h-80 bg-zinc-300 flex justify-center items-center rounded-lg"
                >
                    <div class="text-[35px] italic">Subjects</div>
                </div>
            </Link>
            <Link to="teachers" class="w-6/12">
                <div
                    class="cursor-pointer  h-80 bg-zinc-300 flex justify-center items-center rounded-lg"
                >
                    <div class="text-[35px] italic">Teachers</div>
                </div>
            </Link>

            <div
                class="absolute top-[5%] left-2 w-[15%] h-[90%] bg-gradient-to-l from-[#bdc3c7] to-[ #2c3e50] rounded-lg"
            >
                <div class="flex items-center">
                    <img src="../../src/assets/tt-logo.svg" width="96px" />
                    <div class="text-[25px] italic">Time-Table</div>
                </div>
                <div class="w-full">
                    <div
                        class="text-center text-[25px] text-emerald-900 flex flex-col gap-y-10 mt-20"
                    >
                        <!-- <div class="rounded-full h-32 w-32 bg-emerald-90 m-auto" /> -->
                        <img
                            src="https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg"
                            alt=""
                            class="rounded-full h-32 w-32 bg-emerald-90 m-auto"
                        />
                        <div class="cursor-pointer">My Profile</div>
                        <div class="cursor-pointer">Home</div>
                        <div class="cursor-pointer">About Us</div>
                        <div class="cursor-pointer">Log Out</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</Router>
