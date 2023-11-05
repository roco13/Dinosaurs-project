//global variables
let dinos=[];
let thisHuman;
const formContainer = document.querySelector('.form-container')
const btn = document.getElementById('btn')
const resetBtn = document.querySelector('input[type=reset]')

//Create Animal Constructor with a factory function 
let Animal = function(name,weight,height,diet){
    return {
        name: name,
        weight: weight,
        height: height,
        diet: diet
    }
}
//Create Dino Constructor  with a factory function. Dino will inherit properties from Animal
function Dino(name, weight, height, diet,where, when, fact) {
    Animal.call(this, name,weight,height,diet);
    return {
        name: name,
        weight: weight,
        height: height,
        diet: diet,
        where: where,
        when: when,
        fact: fact
    };
}
    
// Create Dino Objects

(function createDinoObjects() {
    let requestURL = 'dino.json';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();        
    request.onload = function() {
        const dinosaurs = request.response;
        dinosaurs['Dinos'].map(function(dino){
            dinos.push(Dino(dino.species,dino.weight,dino.height,dino.diet,dino.where,dino.when,dino.fact))
            return dinos;   
        });
    };
})()
    
const  humanInfo =function(){
    let name = document.getElementById('name').value;
    let feet = document.getElementById('feet').value;
    let inches = document.getElementById('inches').value;
    let weight = document.getElementById('weight').value;
    let diet = document.getElementById('diet').value;
    //convert feet to inches
    let height = (feet*12) + inches;
    humanObject = Animal(name, weight, height,diet);      

    return humanObject;
    
}

//compare weight
function compareWeight(dinoW){
    if(dinoW > thisHuman.weight){
        return 'This dinosaur weight is bigger than human weight';
    } else if(dinoW < thisHuman.weight){
        return 'This dinosaur weight is smaller than human weight'
    } else {
        return 'This dinosaur and human have the same weight'
    }
}
    
    
//compare height
function compareHeight(dinoH){      
    if(dinoH > thisHuman.height){
        return 'This dinosaur is taller than human';
    } else if(dinoH < thisHuman.height){
        return 'This dinosaur is shorter than human';
    } else {
        return 'This dinosaur and human  have the same height';
    }
}
    
//compare diet
function compareDiet(dinoD){
    if(dinoD === thisHuman.diet){
        return 'This dinosaur and human have the same diet';
    } else {
        return 'This dinosaur and human have different diet';
    }
}

//Generate tiles and populate them with data
function generateTiles(){
    const grid = document.getElementById('grid');
    thisHuman = humanInfo()
    //modify dinos array by inserting Human object in index=4 
 
    dinos.splice(4, 0, thisHuman);

    dinos.map(function(object, index){

        const array = ['weight', 'height', 'diet', 'where', 'when', 'fact'];
        
        let thisFact = array[Math.floor(Math.random() * Math.floor(6))];
        if(thisFact === 'weight'){
            choosenFact =  compareWeight(object.weight);
        } else if (thisFact === 'height'){
            choosenFact = compareHeight(object.height);
        } else if (thisFact === 'diet'){
            choosenFact = compareDiet(object.diet);
        } else if (thisFact === 'where'){
            choosenFact =  `${object.name} lived in: ${object.where}`;
        } else if (thisFact === 'when'){
            choosenFact = `${object.name} lived during ${object.when}`;
        } else {
            choosenFact = ` ${object.fact}`;
        }

        //reset facts for human and pigeon
        if(index === 4){
            object.name = thisHuman.name;
            choosenFact = '';
        } else {
            if(object.name === 'Pigeon'){
                //reset fact
                choosenFact = object.fact
            }
        }
        let thisHTML = setGridHTML(object.name, choosenFact, index);
        grid.innerHTML += thisHTML;
    })
    
}
  
//Gereate DOM elements
function setGridHTML(name, fact, index) {
    let image;
    if(index===4) {
        image = 'human'
    } else {
        image = name;
    }
    return `<div class="grid-item"> <h3>${name}</h3> <img src="./images/${image}.png" alt="dino image"> <p>${fact}</p> </div>`;
}


// On button click, prepare and display infographic
btn.addEventListener('click',function(){

    
    generateTiles();
    formContainer.style.display = 'none';
    resetBtn.style.display = 'block';

});
// On button click hide reset button and reload the page
resetBtn.addEventListener('click', function(){
    this.style.display = 'none';
    formContainer.style.display = 'block';
    location.reload();
});
