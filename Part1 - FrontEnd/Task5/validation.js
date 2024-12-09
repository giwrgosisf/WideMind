window.addEventListener("DOMContentLoaded", function () {
  const form = document.forms['register'];
  const elements = form.elements
  let isFormValid = true;

  let dateOfBirth = this.document.getElementById("Date-of-birth")
  let password = this.document.getElementById("Password")
  let confirmPassword = this.document.getElementById("Confirm-password")
  let submitBtn = document.querySelector('button[type="submit"]')
  const address = this.document.getElementById('Home-addres')
  

  const radios = document.getElementsByName('social')
  const checkBoxes = document.getElementsByName('awnser')

  const other1 = document.getElementById('Other1');
  const other2 = document.getElementById('Other2');

  dateOfBirth.addEventListener('change', function () {
    const today = new Date();
    const birthDate = new Date(dateOfBirth.value);
    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < 16) {
      dateOfBirth.setCustomValidity("You are underaged to use this platform!")
      dateOfBirth.reportValidity();
    }else{
      dateOfBirth.setCustomValidity('')
    }
    
  })



  address.addEventListener('input',function(){
   const regex =  new RegExp("([A-Z][a-z]* )+[0-9]+");
   if (regex.test(this.value)){
    address.setCustomValidity("");
   } else{
    address.setCustomValidity("Invalid input! Write the addres format ass its name followed by a number")
   }
   
  })

  submitBtn.addEventListener('click', function () {

    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity('Passwords missmach')
      confirmPassword.reportValidity()
    } else {
        confirmPassword.setCustomValidity('')
    }



    for (let element of elements) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {

        element.style.borderColor = '';
        element.style.backgroundColor = '';
        
        if (!element.validity.valid) {
          isFormValid = false; 
          element.style.borderColor = 'red'; 
          element.style.backgroundColor = '#ffe6e6';
      
    }

  }

}
    let  socialsisChecked = false;
    let  awnsersChecked = false;
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        socialsisChecked = true; 
      }else if(checkBoxes[i].checked){
        awnsersChecked = true;
      }

    }

    if (!socialsisChecked) {
      alert("Please select a way to stay updated !");
    } else if(!awnsersChecked &&(other1.value.trim() === '' && other2.value.trim() === '')){
      alert("You have unanswered questions!");
    } 

    if(isFormValid){
      alert("Registration successful");
    } 

  })



})