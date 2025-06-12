const fields = [
  {name: 'Type of lesson', type: 'select', id: 'select', placeholder: 'Choose the type of lesson', options: [
    {option: 'Individual lesson', split: false},
    {option: 'Split lesson', split: true}
  ]},
  {name: 'First name', type: 'text', id: 'name', placeholder: 'Type your first name'},
  {name: 'Date of birth', type: 'date', id: 'birth', placeholder: 'Select your date of birth'},
  {name: 'Goal', type: 'text', id: 'goal', placeholder: 'Type goal of your lessons'},
  {name: 'Phone number', type: 'tel', id: 'number', placeholder: 'Type your number'}
 ]

 const splitFields = [
  {name: 'First name', type: 'text', id: 'name', placeholder: 'Type your first name'},
  {name: 'Date of birth', type: 'date', id: 'birth', placeholder: 'Select your date of birth'},
 ]

function displayInputs(){
  let html = '';

  fields.forEach((field ) => {
    const options = field.options;
    
    const newHTML = `
    ${field.type === 'select' ? `
       <div class='w-full flex flex-col'>
        <label class='w-full'>
          <div>${field.name}</div>
          <select data-placeholder='${field.placeholder}' class='select-input w-full border p-2 rounded-lg'>
          <option class="text-gray-400" disabled selected hidden>${field.placeholder}</option>
              ${options.map((option) => {
              return `<option class='rounded'>${option.option}</option>`;
            })}
          </select>
          <div class='select-p text-red-500 hidden'>${field.name} is required</div>
        </label>
       </div>
      ` : 
      `
       <div class='w-full flex flex-col'>
      <label class='w-full'>
        <div>${field.name}</div>
        <input data-id='${field.id}' class='${field.id} inputs border w-full p-2 rounded-lg' type=${field.type} placeholder="${field.placeholder}"/>
        <div class='p-${field.id} text-red-500 hidden'>${field.name} is required</div>
      </label>
    </div>
    ${field.id === 'birth' ? `<div class='added-div'></div>` : ''}
      `}
   
    `
    html += newHTML
 })
 document.querySelector('.input-div').innerHTML = html;

 const typeOfLesson = document.querySelector('.select-input');
 const selectData = typeOfLesson.dataset.placeholder;

typeOfLesson.addEventListener('change', () => {
  console.log(typeOfLesson.value);

  if(typeOfLesson.value === 'Split lesson'){
    let splitHTML = '';
    splitFields.forEach((field) => {
      const newSplitHTML = `
        <div class='w-full flex flex-col'>
          <label class='w-full'>
            <div>${field.name}</div>
            <input data-id='${field.id}' class='split-inputs border w-full p-2 rounded-lg' type=${field.type} placeholder="${field.placeholder}"/>
          </label>
          <div class='split-${field.id} text-red-500 hidden'>${field.name} is required</div>
        </div>
      `
      splitHTML +=newSplitHTML;
    })
    document.querySelector('.added-div').innerHTML = splitHTML;
  }else{
    document.querySelector('.added-div').innerHTML ='';
  }
  if(typeOfLesson.value !== selectData){
     document.querySelector('.select-p').classList.add('hidden')
  }
})



 document.querySelector('.submit-button').addEventListener('click', () => {
    let isValid = true;
    if(typeOfLesson.value === selectData){
      document.querySelector('.select-p').classList.remove('hidden');
      isValid = false;
    }

    handlleInput(isValid)
  })
}

 displayInputs();

 let flag = null;

function handlleInput(isValid){
  document.querySelectorAll('.inputs').forEach((input) => {
    const inputData = input.dataset.id;

    if(!input.value){
      document.querySelector(`.p-${inputData}`).classList.remove('hidden')
      isValid = false;
    }
   
   if (!input.hasAttribute('data-listener')){
      input.addEventListener('input', () =>{
       document.querySelector(`.p-${inputData}`).classList.add('hidden')
    })
   } 
  })

  document.querySelectorAll('.split-inputs').forEach((splitInput) => {
    const splitInputData = splitInput.dataset.id;

    if(!splitInput.value){
      document.querySelector(`.split-${splitInputData}`).classList.remove('hidden');
      isValid = false;
    }

    if (!splitInput.hasAttribute('data-listener')) {
      splitInput.addEventListener('input', () => {
      document.querySelector(`.split-${splitInputData}`).classList.add('hidden');
    })
    } 
  })
  if(isValid){
    document.querySelectorAll('.inputs').forEach(input => input.value = '');
    document.querySelectorAll('.split-inputs').forEach(input => input.value = '');
  }

  if(isValid){
    document.querySelector('.success-div').classList.remove('hidden');
  }
  
  clearTimeout(flag);
  const timeoutId = setTimeout(() => {
    document.querySelector('.success-div').classList.add('hidden');
  }, 5000)
  flag = timeoutId
}
