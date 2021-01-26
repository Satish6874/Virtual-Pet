//Create variables here
var dog,happyDog,database,food,foodStock,dogImg;

function preload()
{
  //load images here
  happyDog = loadImage("happydog.png");
  dogImg = loadImage("dogImg.png");  
}

function setup() {

  database = firebase.database();

  createCanvas(500, 500);
  dog = createSprite(250,250,100,100);
  dog.addImage(dogImg);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() { 
  background(46,139,87);
  
  if (keyWentDown(UP_ARROW)){
    writeStocks(food);
    dog.addImage(happyDog);
  }

  drawSprites();
  //add styles here
  fill(255);
  textSize(25);
  text("Food remaing: "+food,150,150);
  

}

function readStock(data){
  food = data.val();
}

function writeStocks(x){

  if (x<=0){
    x = 0;
  }else{
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })
}



