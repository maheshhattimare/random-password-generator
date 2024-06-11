const passwordBox=document.getElementById("password");
const generateBtn=document.getElementById("generateBtn");
const copyBtn=document.getElementById("copy-btn");

const maxLength=12;

const upperCase="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LowerCase="abcdefghijklmnopqrstuvwxyz";
const number="0123456789";
const symbol="!@#$%&*()-=_+[]{}|;:/<>?"

const allChars=upperCase+LowerCase+number+symbol;

function createPassword(){
    let password="";

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

passwordBox.addEventListener('keydown',function(e){
    
})



