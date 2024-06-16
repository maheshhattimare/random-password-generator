var slider=document.getElementById('length-slider');
const lengthValue=document.getElementById('length-value');
const generateBtn=document.getElementById('generate-btn');
const inputBox=document.getElementById('input-box');
const copyMessage = document.getElementById('copy-message');
const warningMessage = document.getElementById('warning-message');

const uppercaseBox=document.getElementById("uppercase");
const lowercaseBox=document.getElementById("lowercase");
const numberBox=document.getElementById("number");
const symbolBox=document.getElementById("symbol");

const upperCase="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LowerCase="abcdefghijklmnopqrstuvwxyz";
const number="0123456789";
const symbol="!@#$%&*()-=_+[]{}|;:/<>?"

//slider
slider.addEventListener('input',function(){
    lengthValue.textContent=this.value;
});
//button code
generateBtn.addEventListener('click',()=>{
    if(!(uppercaseBox.checked) && !(lowercaseBox.checked) && !(numberBox.checked) && !(symbolBox.checked)){
        warningMessage.style.display="block"
        setTimeout(() => {
            warningMessage.style.display="none"
        }, 3000);
        return;
    
    }
    else{
        createPassword();
    }
})

function createPassword(){
    let passLength=slider.value;
    console.log(passLength);
    let password="";
    let allChars="";

    allChars+=uppercaseBox.checked? upperCase: "";
    allChars+=lowercaseBox.checked? LowerCase: "";
    allChars+=numberBox.checked? number: "";
    allChars+=symbolBox.checked? symbol: "";

    while(passLength>password.length){
        password+=allChars[Math.floor(Math.random()*allChars.length)];
        
    }
    inputBox.value=password;
}

//copy password code
inputBox.addEventListener('click',()=>{
    inputBox.select();
    document.execCommand('copy');
    showCopyMessage();
})

//if all checkbox false then:
function showCopyMessage(){
    if(inputBox.value!==""){
        copyMessage.classList.add('show');
        setTimeout(() => {
            copyMessage.classList.remove('show');
            
        }, 2000);
    }
}
