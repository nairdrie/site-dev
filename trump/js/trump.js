var width = 123;
var height = 123;
var wallW = 100;
var wallH = 583;
var backdropW = 1669;
var backdropH = 600;
var timer;
var fps = 30;
var g = 1500; //1m = 100px
var isPlaying = false;
var gameOver = false;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";
ctx.font = "bold 45px Orbitron";
ctx.textAlign = 'center';
var sprite = new Image();
sprite.src = "trump/png/sprites.png";
var wallsprite = new Image();
wallsprite.src = "trump/png/walls.png";
var backsprite = new Image();
backsprite.src = "trump/png/backdrop.png";
var death1 = new Audio('trump/mp3/quote1.mp3');
var death2 = new Audio('trump/mp3/quote2.mp3');
var death3 = new Audio('trump/mp3/quote3.mp3');
var death4 = new Audio('trump/mp3/quote4.mp3');
var death5 = new Audio('trump/mp3/quote5.mp3');
var woosh = new Audio('trump/mp3/woosh.mp3');
var frameCount = 0;
var tapVel = -450;
var walls = [];
var backs = [];
var spacing = 220;
var loaded = false;
var size;
var score = 0;


class Player {
	constructor() {
		this.x = 200;
		this.y = canvas.height/2-(height/2);
		this.vy = tapVel;
		this.sprite = 1;
		this.spriteFrame=0;
		draw(this);
	}
	tap(customvy) {
		clear(); //temp, handle this with backdrop
		if(frameCount < 10) {
			tapVel-=100;
		}
		else {
			tapVel = -450;
		}
		if(customvy) {
			this.vy = customvy;
			this.sprite = 2;
		}
		else {
			this.vy = tapVel;
			this.sprite = rand(0,5);
			woosh.play();
		}
		this.spriteFrame=0;
		frameCount = 0;
		draw(this);
	}
	update() {
		this.y+=this.vy/fps;
		this.vy += g/fps;
		if(!gameOver && this.spriteFrame<17 && frameCount % 2 == 0) {
			this.spriteFrame++;
		}
		draw(this);
	}
}
class Wall {
	constructor() {
		this.x = canvas.width;
		this.y = rand(10-wallH, canvas.height-10-spacing-wallH); //200 spacing
		this.vx = -200;
		this.cashed = false;
		drawWall(this);
	}
	update(dont_move) {
		if(!dont_move) {
			this.x+=this.vx/fps;
		}
		if(this.x<200 && this.cashed == false) {
			this.cashed = true;
			updateScore();
			//play sound
		}
		if(this.x > -wallW) {
			drawWall(this);
		}
	}
}
class Backdrop {
	constructor(leftBack) {
		if(!leftBack) {
			this.x = 0;
		}
		else {
			this.x = leftBack.x+backdropW;
		}
		this.y = 0;
		this.vx = -50;
		drawBackdrop(this);
	}
	update(dont_move) {
		if(!dont_move) {
			this.x+=this.vx/fps;
		}
		if(this.x>-backdropW) {
			drawBackdrop(this);
		}
	}
}
var donald = new Player();

document.addEventListener("DOMContentLoaded", function(event) {
	ctx.drawImage(backsprite, 0, 0, backdropW, backdropH, 0, 0, backdropW, backdropH);
 	ctx.drawImage(sprite,(donald.sprite*123), (donald.spriteFrame*123), 123, 123,donald.x,donald.y, 123, 123);
 	loop();
});

window.onkeydown = function (e) {
	var code = e.keyCode ? e.keyCode : e.which;
	if(code == 32) {
		if(!isPlaying) {
			isPlaying = true;
		}
		if(!gameOver) {
			donald.tap();
			loop(donald);
		}
		if(gameOver) {
			if(frameCount > 20) {
				reinit();
			}
		}
	}
};

function draw(donald) {
	ctx.drawImage(sprite,(donald.sprite*123), (donald.spriteFrame*123), 123, 123,donald.x,donald.y, 123, 123);
}
function drawWall(somewall) {
	ctx.drawImage(wallsprite, 0, 0, wallW, wallH, somewall.x, somewall.y, wallW, wallH);
	ctx.drawImage(wallsprite, 0, 0, wallW, wallH, somewall.x, somewall.y+wallH+spacing, wallW, wallH);
}
function drawBackdrop(somebackdrop) {
	ctx.drawImage(backsprite, 0, 0, backdropW, backdropH, somebackdrop.x, somebackdrop.y, backdropW, backdropH);
}
function clear() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
}
function loop() {
	ctx.textAlign = 'center';
	if(!gameOver && !isPlaying) {
		clear();
		ctx.drawImage(backsprite, 0, 0, backdropW, backdropH, 0, 0, backdropW, backdropH);
		ctx.drawImage(sprite,(donald.sprite*123), (donald.spriteFrame*123), 123, 123,donald.x,donald.y, 123, 123);
		ctx.font = "bold 60px Orbitron";
		ctx.fillStyle = '#3C3B6E';
		ctx.fillText("Jumpy",canvas.clientWidth/2-120,canvas.clientHeight/2-200);
		ctx.fillStyle = '#B22234';
		ctx.fillText("Trump",canvas.clientWidth/2+120,canvas.clientHeight/2-200);
		if(frameCount == 0) {
			size = 1;
		}
		if(frameCount == 15) {
			size = 0;
		}
		if(size == 0) {
			ctx.font = "bold 30px Orbitron";
		}
		else {
			ctx.font = "bold 35px Orbitron";
		}
		if(frameCount == 30) {
			frameCount = -1;
		}
		ctx.fillText("Press space",canvas.clientWidth/2,canvas.clientHeight/2-100);
		frameCount++;
	}
	else if(!gameOver && isPlaying) {
		if(backs.length == 0) {
			addBackdrop(new Backdrop());
		}
		if(backs[backs.length-1].x <= -backdropW+canvas.width) {
			addBackdrop(new Backdrop(backs[backs.length-1]));
		}
		if(walls.length == 0 || walls[walls.length-1].x < canvas.width/3) {
			addWall(new Wall());
		}
		frameCount++;
		clear();
		for(var i = 0; i < backs.length; i++) {
			backs[i].update();
		}
		if(backs[0].x < -backdropW) {
			deleteBackdrop();
		}
		donald.update();
		for(var i = 0; i < walls.length; i++) {
			walls[i].update();
			if(donald.y+height-10 > canvas.height || (donald.x+width-10 > walls[i].x && donald.x+10 < walls[i].x+wallW && ((donald.y+height-10 > walls[i].y && donald.y+10 < walls[i].y+wallH) || (donald.y+height-10 > walls[i].y+wallH+spacing && donald.y+10 < walls[i].y+wallH+spacing+wallH)))) {
				kill();
				break;
			}
		}
		if(walls[0].x < -wallW) {
			deleteWall();
		}
	}
	else { //game over
		clear();
		frameCount++;
		for(var i = 0; i < backs.length; i++) {
			backs[i].update(true);
		}
		if(backs[0].x < -backdropW) {
			deleteBackdrop();
		}
		donald.update();
		for(var i = 0; i < walls.length; i++) {
			walls[i].update(true);
		}
		if(walls[0].x < -wallW) {
			deleteWall();
		}
		ctx.font = "bold 40px Orbitron";
		ctx.fillStyle = '#3C3B6E';
		ctx.fillText("Game",canvas.clientWidth/2 - 65,canvas.clientHeight/2-110);
		ctx.fillStyle = '#B22234';
		ctx.fillText("Over",canvas.clientWidth/2 + 70,canvas.clientHeight/2-110);
		var scoretext = "Score: ";
		scoretext = scoretext.concat(score);
		ctx.font = "bold 18px Orbitron";
		ctx.fillText(scoretext,canvas.clientWidth/2,canvas.clientHeight/2-80);

	}
	ctx.font = "bold 18px Orbitron";
	ctx.textAlign = 'left';
	ctx.fillStyle = 'black';
	ctx.fillText(score,10,20);
	if(timer) {
		clearTimeout(timer);
	}
	timer = setTimeout(loop, 1000 / fps);
}
function addWall(thewall){
	walls.push(thewall);
}
function deleteWall(){
	walls.shift();
}
function addBackdrop(thebackdrop) {
	backs.push(thebackdrop);
}
function deleteBackdrop() {
	backs.shift();
}
function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
function updateScore() {
	score+=10;
}
function kill() {
	gameOver = true;
	donald.tap(-800);
	frameCount = 0;
	var sound = rand(0,5);
	switch(sound) {
		case 0:
			death1.play();
			break;
		case 1:
			death2.play();
			break;
		case 2:
			death3.play();
			break;
		case 3:
			death4.play();
			break;
		case 4:
			death5.play();
			break;
	}
	loop(donald);
	document.getElementById("reset").style.display = 'flex';
}
function passScore(){
		//document.getElementById("scoreform").submit();
		reinit();
}

function reinit() {
	death1.pause();
	death2.pause();
	death3.pause();
	death4.pause();
	death5.pause();
	death1.currentTime = 0;
	death2.currentTime = 0;
	death3.currentTime = 0;
	death4.currentTime = 0;
	death5.currentTime = 0;
	isPlaying = false;
	gameOver = false;
	ctx.font = "bold 45px Orbitron";
	ctx.textAlign = 'center';
	frameCount = 0;
	tapVel = -450;
	walls = [];
	backs = [];
	donald = new Player();
	score = 0;
	clear();
	ctx.drawImage(backsprite, 0, 0, backdropW, backdropH, 0, 0, backdropW, backdropH);
 	ctx.drawImage(sprite,(donald.sprite*123), (donald.spriteFrame*123), 123, 123,donald.x,donald.y, 123, 123);
	document.getElementById("reset").style.display = 'none';
	loop();
}
