let xp=0;
let health=100;
let gold=50;
let currentWeapon=0;
let fighting;
let monsterHealth;
let inventory=["stick"];

const button1=document.querySelector("#button1");
const button2=document.querySelector("#button2");
const button3=document.querySelector("#button3");
const xpText=document.querySelector("#xpText");
const healthText=document.querySelector("#healthText");
const goldText=document.querySelector("#goldText");
const monsterNameText=document.querySelector("#monsterName");
const monsterHealthText=document.querySelector("#monsterHealth");

const weapons=[
  {
    name:"stick",
    power:5
  },
  {
    name:"dagger",
    power:30
  },
  {
    name:"claw hammer",
    power:50
  },
  {
    name:"sword",
    power:100
  }
];

const monsters=[{

  name:"slime",
  level:2,
  health:15
},{
  name:"fanged beast",
  level:8,
  health:60
},{
  name:"dragon",
  level:20,
  health:300
}
  ];
  
const locations=[
  {
  name:"town square",
  "button text":["Go to store","Go to cave","Fight dragon"],
  "button functions":[goStore,goCave,fightDragon],
  text:"You are in the town square.You see a sign that says \"store\"."
  
},
{
  name:"store",
  "button text":["Buy 10 Health(10 gold)","Buy a weapon(30 gold)","return to town square "],
  "button functions":[buyHealth,buyWeapon,goTown],
  text:"you have entered the Store"
},{
  name:"cave",
  "button text":["Fight slime","Fight fanged beast","Go to town square"],
  "button functions":[fightSlime,fightBeast,goTown],
  text:"You have entered the cave.You see some monsters."
},{
  name:"fighting",
  "button text":["attack","dodge","run"],
  "button functions":[attack,dodge,goTown],
  text:"you are fighting a monster" 
},{
  name:"kill monster",
  "button text":["go to town square","go to town square","go to town square"],
  "button functions":[goTown,goTown,easterEgg],
  text:"The monster screams \"Arg!\" as it dies.You gain experience points and find gold."
},{
  name:"lose",
  "button text":["replay?","replay?","replay?"],
  "button functions":[restart,restart,restart],
  text:"you die"
},{
  name:"win",
  "button text":["replay?","replay?","replay?"],
  "button functions":[restart,restart,restart],
  text:"you defeated the dragon! YOU WIN THE GAME!!! "
},{
  name:"easter egg",
  "button text":["2","8","go to town square"],
  "button functions":[pickTwo,pickEight,goTown],
  text:"you find a secret game.Pick a number above.Ten numbers will be randomly choosen between 0 and 10.If the number you choose matches one of the random numbers,you win!!"
}
  

               ];


//initialise button

button1.onclick=goStore;
button2.onclick=goCave;
button3.onclick=fightDragon;

//functions used

function update(location){
  monsterStats.style.display="none";
  button1.innerText=location["button text"][0];
  button2.innerText=location["button text"][1];
  button3.innerText=location["button text"][2];
  text.innerText=location["text"];
  button1.onclick=location["button functions"][0];
  button2.onclick=location["button functions"][1];
  button3.onclick=location["button functions"][2];
  
}

function goTown(){
  update(locations[0]);
}

function goStore(){
  update(locations[1]);
}

function goCave(){
  update(locations[2]); 
}




function buyHealth(){
  if (gold>=10){
    gold-=10;
    health+=10;
    goldText.innerText=gold;
    healthText.innerText=health;
  }
  else{
    text.innerText="you do not have enough gold to buy health";
  }
  
  
}

function buyWeapon(){
    if(currentWeapon<weapons.length-1){
      if (gold>=30){
        gold-=30;
        goldText.innerText=gold;
        currentWeapon++;
        let newWeapon =weapons[currentWeapon].name;
        text.innerText="you now have a "+ newWeapon +".";
        inventory.push(newWeapon);
        text.innerText+=" in your inventory you have "+ inventory;

      }else{
        text.innerText="you do not have enough gold to buy a weapon.";
      }
    }else{
      text.innerText="you already have the most powerfull weapon.";
      button2.innerText="sell weapon for 15 gold";
      button2.onclick=sellWeapon;
    }
  
   
}

function sellWeapon(){
  if(inventory.length>1){
    gold+=15;
    goldText.innerText=gold;
    let currentWeapon=inventory.shift();
    text.innerText="you sold a "+currentWeapon;
    text.innerText+=" in your inventory you have "+ inventory;
  }else{
    text.innerText="don't sell your only weapon";
  }
}
//fight functions

function fightDragon(){
  fighting=2;
  goFight();
}
function fightSlime(){
  fighting=0;
  goFight();
}

function fightBeast(){
  fighting=1;
  goFight();
}

  
function goFight(){
  update(locations[3]);
  monsterHealth=monsters[fighting].health;
  monsterStats.style.display="block";
  monsterNameText.innerText=monsters[fighting].name;
  monsterHealthText.innerText=monsterHealth;
  
}

function dodge(){
  text.innerText="you dodge the attack from the "+ monsters[fighting].name+" .";
  
}


function attack(){
  text.innerText="the " + monsters[fighting].name +" attacks,";
  if (isMonsterHit()){
    text.innerText+=" you attack it with your "+weapons[currentWeapon].name+".";
    monsterHealth-=weapons[currentWeapon].power+Math.floor(Math.random()*xp)+1;

  }else{
    text.innerText+="you missed, Ouch!!"
  }
  health-=getMonsterAttackValue(monsters[fighting].level);
  healthText.innerText=health;
  monsterHealthText.innerText=monsterHealth;
  if(health<=0){
    lose();
  }else if(monsterHealth<=0){
    fighting===2?winGame():defeatedMonster();
  }if (Math.random()<=.3 && inventory.length!==1){
    text.innerText+=" your "+inventory.pop()+" breaks";
    currentWeapon--;
  }
}

function lose(){
  update(locations[5]);
  
}

function winGame(){
  update(locations[6]);
}

function defeatedMonster(){
  gold+=Math.floor(monsters[fighting].level*6.7);
  xp+=monsters[fighting].level;
  xpText.innerText=xp;
  goldText.innerText=gold;
  update(locations[4]);
}

function restart(){
   xp=0;
   health=100;
   gold=50;
   currentWeapon=0;
   inventory=["stick"];
   goldText.innerText=gold;
   xpText.innerText=xp;
   healthText.innerText=health;
   goTown();
  
}

function getMonsterAttackValue(level){
  let hit=(level*3)-(Math.floor(Math.random()*xp));
  console.log(hit);
  return hit;
}

function isMonsterHit(){
  return Math.random()>.2 || health<20;
}

function easterEgg(){
  update(locations[7]);
}

function pickTwo(){
  pick(2);
}
function pickEight(){
  pick(8);
}

function pick(guess){
  let numbers=[];
  while(numbers.length<10){
    numbers.push(Math.floor(Math.random()*11));
  }
  text.innerText="you picked "+guess+" .Here are the random numbers:\n";

  for(let i=0;i<10;i++){
    text.innerText+=numbers[i]+ "\n";
  }
  if(numbers.indexOf(guess)!==-1){
    text.innerText+="Right guess!!,YOU WIN 20 GOLD!!";
    gold+=20;
    goldText.innerText=gold;
  }else{
    text.innerText+="Wrong you guessed ,you loose 10 health!!";
    health-=10;
    healthText.innerText=health;
    if(health<=0){
      lose();
    }
  }
    
}