<script>
  import { element } from "svelte/internal";
  import {onMount} from 'svelte'

  let name;
  let form;
  let email;
  onMount(()=>{
    form = document.getElementById('form');
    name = document.getElementById('name');
    email = document.getElementById('email');
    console.log(form);
    form.addEventListener('submit',e=>{
      e.preventDefault();
      
      validateName();
      validateEmail();
    });

    name.addEventListener('keydown',(e)=>{
      validateName()
    })

    email.addEventListener('keydown',(e)=>{
      validateEmail()
    })

  })


    

    
    const setError = (element, message)=> {
      const inputControl = element.parentElement;
      const errorDisplay = inputControl.querySelector('.error');

      errorDisplay.innerText = message;
      inputControl.classList.add('error');
      inputControl.classList.add('success');


    }

    const setSuccess = element =>{
      const inputControl = element.parentElement;
      const errorDisplay = inputControl.querySelector('.error');
      
      errorDisplay.innerText = '';
      inputControl.classList.add('success');
      inputControl.classList.add('error');
    };

    const validateName = () => {
      const nameValue = name.value.trim();

      if(nameValue === '' || nameValue === null){
          setError(name,'Enter your Name!');
      }
      else if(!reg.test(nameValue)){
        setError(name,'Enter Valid Name!');
      }else{
        setSuccess(name);
      }
    }

    const validateEmail = () => {
      const emailValue = email.value.trim();

      if(emailValue === '' || emailValue === null ){
         setError(email,'Enter email!')
      }
      else if(!regexp.test(String(emailValue).toLowerCase())){
       setError(email,'Enter valid email!');
      }
      else{
        setSuccess(email);
      }
    }
  

    let subjects = ['a','b','c','d'];
    let pref1;
    let pref2;
    let pref3;
    let reg =  /^[a-zA-Z]+ [a-zA-Z]+$/;
    var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    </script>
    
 
    
    <div class="w-screen h-screen bg-cover bg-[url('../../src/assets/formbg.jpg')] bg-no-repeat">
      <div class=" flex space-x-2 justify-center text-[34px] text-white pt-10 italic ">Course Preference Form</div>
      <form id="form" class="bg-gradient-to-l from-[#accbee] to-[#e7f0fd] m-auto w-[50%] h-[70%] shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8">
        
        <div class="mt-4 input-control relative">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
              Name
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Enter Name">
            <div class="error text-red-600 text-sm absolute "></div>
          </div>

          <div class="mt-5 relative">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
              E-mail
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Enter email">
           
            <div class="error text-red-600 text-sm absolute"></div>
            
          </div>
     
          
          <div class="mt-5">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="pref">
              Core Preference-1
            </label>
            <select bind:value={pref1} placeholder="Select Pref1" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline">
                {#each subjects as sub}
                    <option value={sub}>
                        {sub}
                    </option>
                {/each}
        </select>
          </div>
          <div class="mt-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="pref">
              Core Preference-2
            </label>
            <select bind:value={pref2} placeholder="Select Pref1" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline">
                {#each subjects as sub}
                    <option value={sub}>
                        {sub}
                    </option>
                {/each}
                
        </select>
          </div>
          <div class="mt-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="pref">
              Core Preference-3
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