var timer;
var speed = 10;
var key = '';
var lifetime = 3;
var snake = [];
var foodX = 0;
var foodY = 0;
var currentX=27;
var currentY=27;
var isPlaying = false;
var gameOver = false;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";
draw(27,27); //Starting rectangle
updateFood();
class segment {
	constructor(x,y) {
		this.x = x;
		this.y = y;
		this.age=0;
	}
}
window.onkeydown = function (e) {
	var code = e.keyCode ? e.keyCode : e.which;
	switch(code) {
		case 87:
			if(key != 'down') {
				key = 'up';
				if(!isPlaying && !gameOver) {
					erase(27,27);
					isPlaying = true;
				}
				loop();
			}
			break;
		case 83:
			if(key != 'up') {
				key = 'down';
				if(!isPlaying && !gameOver) {
					erase(27,27);
					isPlaying = true;
				}
				loop();
			}
			break;
		case 65:
			if(key != 'right'){
				key = 'left';
				if(!isPlaying && !gameOver) {
					erase(27,27);
					isPlaying = true;
				}
				loop();
			}
			break;
		case 68:
			if(key!='left') {
				key = 'right';
				if(!isPlaying && !gameOver) {
					erase(27,27);
					isPlaying = true;
				}
				loop();
			}
			break;
		default:
			break;
	}
};
function draw(x, y) {
	ctx.fillStyle = "#000000";
	x=10*x+x;
	y=10*y+y;
	ctx.fillRect(x,y,10,10);
}
function updateFood() {
	ctx.fillStyle = "#ff0000";
	var collision = false;
	do {
		collision = false;
		foodX=rand(0,54);
		foodY=rand(0,54);
		for(i=0;i<snake.length;i++) {
			if(foodX==snake[i].x && foodY==snake[i].y) {
				collision = true;
			}
		}
	} while(collision || (!isPlaying && foodX==27&&foodY==27));

	ctx.fillRect(10*foodX+foodX,10*foodY+foodY,10,10);
}
function erase(x, y) {
	x=10*x+x;
	y=10*y+y;
	ctx.clearRect(x,y,10,10);
}
function loop() {
	switch(key) {
		case 'up':
			currentY--;
			break;
		case 'down':
			currentY++;
			break;
		case 'left':
			currentX--;
			break;
		case 'right':
			currentX++;
			break;
		default:
			break;
	}
	var newSegment = new segment(currentX,currentY);
	advance(newSegment);
	if(newSegment.x==foodX && newSegment.y==foodY) {
		updateFood();
		updateScore();
		lifetime++;
		speed+=1;

	}
	if(timer) {
		clearTimeout(timer);
	}
	timer = setTimeout(loop, 1000 / speed);
}
function advance(newSegment) {
	if(!gameOver) {
		snake.push(newSegment);
		draw(newSegment.x,newSegment.y);
		if(newSegment.x>=55 || newSegment.x<0 || newSegment.y>=55 || newSegment.y<0)
		{
			kill(snake);
		}
		for(var i = 0;i<snake.length-1;i++) {
			if(snake[i].x == newSegment.x && snake[i].y == newSegment.y)
			{
				kill(snake);
			}
			snake[i].age++;
		}
		if(snake[0].age>=lifetime) {
			var oldSegment = snake.shift();
			erase(oldSegment.x,oldSegment.y);
		}
	}
}
function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
function updateScore() {
	document.getElementById("score").innerHTML = parseInt(document.getElementById("score").innerHTML)+10;
	document.getElementById("hiddenscore").value = parseInt(document.getElementById("hiddenscore").value)+10;
}
function kill(snake) {
	gameOver = true;
	for(i=0;i<snake.length;i++) {
		erase(snake[i].x,snake[i].y);
	}
	erase(foodX,foodY);
	snake = [];
	ctx.font = "35px Orbitron";
	ctx.textAlign = 'center';
	ctx.fillText("Game Over",canvas.clientWidth/2,canvas.clientHeight/2-100);
	document.getElementById("reset").style.display = 'flex';
	//document.getElementById("name").style.display = 'block';
}
function passScore(){
		//document.getElementById("scoreform").submit();
		window.location.reload();
}
