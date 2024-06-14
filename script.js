const passwordBox=document.getElementById("password");
const generateBtn=document.getElementById("generateBtn");
const copyBtn=document.getElementById("copy-btn");
const crossBtn=document.getElementById("cross-icon");
const messageBox=document.getElementById("message");

const checkBox1=document.getElementById("check-box1");
const checkBox2=document.getElementById("check-box2");
const checkBox3=document.getElementById("check-box3");
const checkBox4=document.getElementById("check-box4");


const maxLength=12;

const upperCase="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LowerCase="abcdefghijklmnopqrstuvwxyz";
const number="0123456789";
const symbol="!@#$%&*()-=_+[]{}|;:/<>?"

function createPassword(){
    let password="";
    let allChars=""

    //check box
    if(!(checkBox1.checked) && !(checkBox2.checked) && !(checkBox3.checked) && !(checkBox4.checked)){
        messageBox.style.display="block";
        return;
    
    }
    else{
        messageBox.style.display="none";
        
        allChars+=checkBox1.checked? upperCase: "";
        allChars+=checkBox2.checked? LowerCase: "";
        allChars+=checkBox3.checked? number: "";
        allChars+=checkBox4.checked? symbol: "";
    }
    
    // password+=upperCase[Math.floor(Math.random()*upperCase.length)];
    // password+=LowerCase[Math.floor(Math.random()*LowerCase.length)];
    // password+=number[Math.floor(Math.random()*number.length)];
    // password+=symbol[Math.floor(Math.random()*symbol.length)];
    
    while(12 > password.length){
        password+=allChars[Math.floor(Math.random()*allChars.length)];
    }
    passwordBox.value=password;
}


generateBtn.addEventListener('click',()=>{
  
        createPassword();

    
    
});

//copy button function
copyBtn.addEventListener('click',()=>{
    passwordBox.select();
    document.execCommand('copy');
});

//delete button
crossBtn.addEventListener('click',()=>{
    passwordBox.value=""
})


