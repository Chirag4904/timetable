<script>
    let subjects = ['a','b','c','d'];
    let pref1;
    let pref2;
    let pref3;
    let name;
    let email;
    let valid = false;
    let reg =  /^[a-zA-Z]+ [a-zA-Z]+$/;
    var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let error = {username:'',usermail:''};
    $: isError = false;
    const submitHandler = ()=> {
      valid =  true;
      console.log(reg.test(name))
      if(name == '' || name== null){
          valid = false;
          isError = true;
          error.username = 'Enter your name !'
      }
      else if(!reg.test(name)){
        valid =  false;
        isError = true;
        error.username = 'Enter valid name !'
      }
      if(email== '' || email== null ){
          valid = false;
          isError = true;
          error.usermail = 'Enter your email !'
      }
      else if(!regexp.test(String(email).toLowerCase())){
        valid = false;
        isError = true;
        error.usermail = 'Enter valid email !'
      }
      if(valid){
        isError = false;
        console.log(name, email);
      }
    }	
    </script>
    
 
    
    <div class="w-screen h-screen bg-cover bg-[url('../../src/assets/formbg.jpg')] bg-no-repeat">
      <div class=" flex space-x-2 justify-center text-[34px] text-white pt-10 italic ">Course Preference Form</div>
      <form on:submit|preventDefault={submitHandler} class="bg-gradient-to-l from-[#accbee] to-[#e7f0fd] m-auto w-[50%] h-[70%] shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8">
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
              Name
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Enter Name" bind:value={name}>
            {#if isError}
            <div class="error text-red-600 text-sm  "> {error.username}</div>
            {/if}
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
              E-mail
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Enter email" bind:value={email}>
            {#if isError}
            <div class="error text-red-600 text-sm "> {error.usermail}</div>
            {/if}
          </div>
     
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="pref">
              Preference-1
            </label>
            <select bind:value={pref1} placeholder="Select Pref1" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline">
                {#each subjects as sub}
                    <option value={sub}>
                        {sub}
                    </option>
                {/each}
        </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="pref">
              Preference-2
            </label>
            <select bind:value={pref2} placeholder="Select Pref1" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline">
                {#each subjects as sub}
                    <option value={sub}>
                        {sub}
                    </option>
                {/each}
        </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="pref">
              Preference-3
            </label>
            <select bind:value={pref3} placeholder="Select Pref1" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline">
                {#each subjects as sub}
                    <option value={sub}>
                        {sub}
                    </option>
                {/each}
        </select>
          </div>
        <div class="flex space-x-2 justify-center mt-10">
         <button type="submit" class="inline-block w-[30%] h-[30%] px-6 py-2 border-2 border-cyan-800 text-cyan-800 font-medium text-xl leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Submit</button>
        </div>
    </form>
    </div>