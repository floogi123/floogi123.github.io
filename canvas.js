var canvas = document.getElementById('layer1');
var canvas2 = document.getElementById('layer2');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


canvas2.width = canvas.width;
canvas2.height = canvas.height;

var ctx = canvas2.getContext('2d');


var c = canvas.getContext('2d');



/*
c.fillStyle = 'rgba(200, 3, 45, 1)';
c.fillRect(100, 100, 75, 110)

//line

c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.strokeStyle = 'rgba(100, 200, 45, 0.5)';
c.stroke();

//arc



for (var i = 0; i < 300; i++) {
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false);
    c.strokeStyle = `rgba(100, ${y}, ${x}, 0.8)`;
    c.stroke();

}
*/
let dist = 50;
var mouse = {

    x: undefined,
    y: undefined

}

//events
window.addEventListener('mousemove', 
    function(event){
        mouse.x = event.x
        mouse.y = event.y
    }
)
window.addEventListener('resize', 
    function(event){
        canvas.width = window.innerWidth-6;
        canvas.height = window.innerHeight-6;

        init();
    }
)
window.addEventListener('click',
    function(event){
        
        var dx = (Math.random() * 7 - 3.5);
            var dy = (Math.random() * 7 - 3.5);
            var radius = Math.random() * 9 + 3;
            x = Math.random() * (window.innerWidth - radius*2) + radius;
            y = Math.random() * (window.innerHeight - radius*2) + radius;
        
        
            circleArray.push(new Circle(x, y, dx, dy, radius));
        
        
        

    }

)
window.addEventListener('keyup', event => {
    if (event.code === 'Space') {
      console.log('Space pressed')
      init();
    }
  })
window.addEventListener('keyup', event => {
    if (event.code === 'ShiftLeft') {
      console.log('Shift pressed')
      clear = true;
      c.clearRect(0,0, innerWidth, innerHeight);
      circleArray = [];
      
    }
  })
  

let gravity = false;
let time = true;

//inisialization
circleArray = [];
particleArray = [];
function init(){
    circleArray = [];
    particleArray = [];
    pallate = pallates[Math.floor(Math.random() * pallates.length)];


        for (var i=0; i < numOfCircles; i++){
            var dx = (Math.random() * 7 - 3.5);
            var dy = (Math.random() * 7 - 3.5);
            var radius = Math.random() * 9 + 3;
            x = Math.random() * (window.innerWidth - radius*2) + radius;
            y = Math.random() * (window.innerHeight - radius*2) + radius;
        
        
            circleArray.push(new Circle(x, y, dx, dy, radius));
        }
/*
        for (var i=0; i < numOfParticles; i++){
            var dx = (Math.random() * 2 - 1);
            var dy = (Math.random() * 2 - 1);
            var radius = Math.random() * 3 + 3;
            x = Math.random() * (mouse.x - radius*2) + radius;
            //window.innerWidth - mouse.x + dist
            //mouse.y + dist
            y = Math.random() * (100 - radius*2) + radius;
            
            
            particleArray.push(new Particle(x, y, dx, dy, radius));
        
        
        }
*/
}

var numOfCircles = 100;
var numOfParticles = 50;

//pallates

let colourArray1 = [
    '#B4D4EE',
    '#81717A',
    '#9D8CA1',
    '#9993B2',
    '#A7ABDD'
];

var colourArray2 = [
    '#23C9FF',
    '#7CC6FE',
    '#CCD5FF',
    '#E7BBE3',
    '#C884A6'

];

var colourArray3 = [
    '#DE6B48',
    '#E5B181',
    '#F4B9B2',
    '#DAEDBD',
    '#7DBBC3'

];

var colourArray4 = [
    '#FF9FB2',
    '#FBDCE2',
    '#0ACDFF',
    '#60AB9A',
    '#DEDEE0'
];

var colourArray5 = [
    '#AD343E',
    '#474747',
    '#F2AF29',
    '#000000',
    '#E0E0CE'
];

var colourArray6 = [
    '#BCD8C1',
    '#D6DBB2',
    '#E3D985',
    '#E57A44',
    '#422040'
];

var colourArray7 = [
    '#995D81',
    '#EB8258',
    '#F6F740',
    '#D8DC6A',
    '#6689A1'
];

let pallates = [
    colourArray1,
    colourArray2,
    colourArray3,
    colourArray4,
    colourArray5,
    colourArray6,
    colourArray7
];

let timeStop = false;
let tempdx;
let tempdy;

function Circle (x, y, dx, dy, radius) {
    //variables of circles
    this.x = x;
    this.y = y;
    this.dx = dx + 1;
    this.dy = dy + 1;
    this.tempdx = dx;
    this.tempdy = dy;
    this.radius = radius;

    this.draw = true;

    background();
    
    this.colour = pallate[Math.floor(Math.random() * pallate.length)];


    this.draw = function(){
        //drawing the circles
        //if (this.draw == true){ 
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.strokeStyle = 'rgba(0,0,0,1)';
            //c.stroke();
            c.fillStyle = this.colour;
            c.fill();
        //}

    }
    this.update = function(){
        //direction calcs
    
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
      
        //growing circles

        if ((mouse.x - this.x) < 50 && (mouse.x - this.x) > -50 
        && (mouse.y - this.y) < 50 && (mouse.y - this.y) > -50
        && this.radius < 50){

            this.radius += 1

        }
        else if (this.radius > radius){
            this.radius -= 1;
        }


        this.y += this.dy;
        this.x += this.dx;
        //if (this.draw == true){ 
        this.draw();
        //}

        //collision
        if (mouse.x == this.x && mouse.y == this.y){
            this.draw == false;
            console.log("boom");

        }
    }
 
        
        

}



function Particle (x, y, dx, dy, radius) {
    //variables of circles
    this.x = x;
    this.y = y;
    this.dx = dx + 1;
    this.dy = dy + 1;
    this.tempdx = dx;
    this.tempdy = dy;
    this.radius = radius;

    this.dist = dist;
    this.colour = pallate[Math.floor(Math.random() * pallate.length)];


    this.draw = function(){
        //drawing the circles
        //if (this.draw == true){ 
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.strokeStyle = 'rgba(0,0,0,1)';
            //c.stroke();
            c.fillStyle = this.colour;
            c.fill();
        //}

    }
    this.update = function(){

        if (this.x + this.radius > mouse.x + this.dist || this.x - this.radius < mouse.x-this.dist) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > mouse.y + this.dist || this.y - this.radius < mouse.y - this.dist) {
            this.dy = -this.dy;
        }

        if ((mouse.x - this.x) < 50 && (mouse.x - this.x) > -50 
        && (mouse.y - this.y) < 50 && (mouse.y - this.y) > -50
        && this.radius < 50){

            this.radius += 1

        }
        else if (this.radius > radius){
            this.radius -= 1;
        }


        this.y += this.dy;
        this.x += this.dx;

        this.draw();

    }
}


function background(){

    
ctx.beginPath();
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "#DBDBDB";
ctx.fill();


}




function animate() {

    requestAnimationFrame(animate);

    c.clearRect(0,0, innerWidth, innerHeight);

    for (var i=0; i < circleArray.length; i++){
        circleArray[i].update();
    }
    for (var i=0; i < particleArray.length; i++){
        particleArray[i].update();
    }
    
}
init();
//var circle = new Circle(200, 200, 3, 3, 30);
//var particle = new Particle(200, 200, 3, 3, 30);

animate();
