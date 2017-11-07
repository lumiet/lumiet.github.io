function togglepopup(elementname){
if(document.getElementById(elementname).style.display != "none") {
document.getElementById(elementname).style.display = "none";
}
else {
document.getElementById(elementname).style.display = "inline";
}
}
function getRndInteger(min, max) {
	//This JavaScript function always returns a random number between min (included) and max (excluded)
    return Math.floor(Math.random() * (max - min) ) + min;
}
function getRnd(min, max) {
	//This JavaScript function always returns a random number between min (included) and max (excluded)
    return (Math.random() * (max - min) ) + min;
}

function displayTime() {
	return Date("T12:00Z");
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//constants
{
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var enemy;
  var bg;
  var movetime=0;
  var direction = false;
  var lastclickx = 0;
  var lastclicky = 0;
  var enemyatkx = 0;
  var playeratkdrawinterval = 0;
  var enemyatkdrawinterval = 0;
}
  
  /*
  ctx.beginPath();
  ctx.arc(375,40,35,.5*Math.PI+i,.5*Math.PI-i);
  where when i = math.pi, the circle is full and therefore ready to attack; time to fill circle dependent on interval of move, since 20 ms per frame (5fps) and interval is in seconds, i must increment by Math.PI/(interval*5)
  'i' value should be included probably in the attack object itself; note that upon attacking (regardless of hit or miss) i must be reset to 0
  not sure what maximum # of moves will be, but im going to set it up for >=3 per player/enemy; ill just loop it through to draw each of them i suppose, but ill probably need to make a database to load move data from for efficiency
  ctx.fill();
  */
 
  
function clearGame(_ctx) {
	_ctx.clearRect(0,0,canvas.width,canvas.height);
 	return _ctx;
}

function attack(name, interval, pwr, radius, src, x, y) {
	this.name = name;
	this.img = new Image();
	this.img.src = src;
	this.interval = interval;
	this.time = this.interval;
	this.pwr = pwr;
	this.radius = radius;
	this.ready = true;
	this.visual = new component(100,100,"#212121",300,300);
	this.checkready = function() {
		if(this.interval <= (this.time/2*10)) this.ready = true;		
		else this.ready = false;
	}
}

function character(species,speed,hp,alignment/*true if player, false if enemy*/) {
this.img = new Image();
if(species==0){
	this.img.src="wupperbehind.png";
}
else {
	this.img.src = "nymphous.png";
}
  this.atk = [{this : new attack("Bite", 1, 2, 25, "biteatk.png", 100,100)},{this : new attack("Bite", 1, 2, 15, "biteatk.png", 200,100)},{this : new attack("Bite", 1, 2, 15, "biteatk.png", 200,100)}];
  this.currentatk= 0;
  this.basespeed = speed; 
  this.currentspeed= speed;
  this.acc= .05;
  this.hp = hp;
  this.basehp= hp;
  this.headingleft = false;
  this.headingright = false; 
if(alignment==true){
	 this.y= canvas.height-259;	  
     this.hpbar = new component(20, 100, "#23fc6f", 330,canvas.height-100);
  this.basehpbar = new component(20,300,"#212121",330,canvas.height-100);
}  
else {
	this.y= 210;	  
     this.hpbar = new component(20, 100, "#ff2323",10,10);
  this.basehpbar = new component(20,300,"#212121",10,10);
}
  this.x= (canvas.width/2);

  this.update = function(posneg) {	  
		if(posneg>0&&this.movingright==true){	
		  this.currentspeed += (this.currentspeed * this.acc);	
		  if(this.currentspeed > (this.basespeed*2)) {
		  this.currentspeed = this.basespeed*2;
		  }
			if(((this.x +this.currentspeed*posneg)>0)&&((this.x + (this.img.width/2)+this.currentspeed*posneg)<canvas.width)){		  
	  this.x += (this.currentspeed*posneg);}
		  }
		  
		  else if(posneg<0&&this.movingleft==true) {			  
		  this.currentspeed += (this.currentspeed * this.acc);	
		  if(this.currentspeed > (this.basespeed*2)) {
		  this.currentspeed = this.basespeed*2;
		  }
				if(((this.x -(this.img.width/4)+this.currentspeed*posneg)>0)&&((this.x +this.currentspeed*posneg)<canvas.width)){		  
					this.x += (this.currentspeed*posneg);
				}
		  }
	else {
		this.currentspeed = this.basespeed;
		if(((this.x +this.currentspeed*posneg)>0)&&((this.x +this.currentspeed*posneg)<canvas.width)){
			this.x += (this.currentspeed*posneg);
		}
	}
	  if(posneg>0) {
		this.movingleft=false;
	  this.movingright=true;
	  }
	  else {
	this.movingright=false;
	  this.movingleft=true;
	  }
	 
  }
}

function component(height, width, color, x, y) {
	this.gamearea = canvas;
	this.width = width;
	this.x = x;
	this.y = y;
	this.color = color;
	
	this.update = function(x, y) {
	this.x = x;
	this.y = y;
	}
	this.modify = function(width, height, color) {
	this.width = width;
	this.height = height;	
	var context = canvas.getContext("2d");
	context.fillStyle = color;
	ctx.fillRect(x,y,width,height);
	}	
	
	
}

function ai(){	
	if(movetime<=0){
	movetime = getRndInteger(50,canvas.width);
	if(direction == false) direction = true;
	else if(direction == true) direction = false;
	}
	
	if(direction == true){
	enemy.update(1);
	}
	
	else {
	enemy.update(-1);
	}
	
    movetime-=enemy.currentspeed;
}

function aiatk() {
if(enemy.atk[currentatk].this.ready == true) enemyatkx = getRndInteger(1,canvas.width);
}

function animate() {
  ctx = clearGame(ctx);
  if(lastclickx>= enemy.x-player.atk[player.currentatk].this.radius && lastclickx <= enemy.x+player.atk[player.currentatk].this.radius && lastclickx > 0) {
	  lastclickx=0;
	  if(player.hp>0) enemy.hp-= player.atk[player.currentatk].this.pwr;
	  if(enemy.hp<0) enemy.hp=0;
  }
  
  if(enemyatkx>= player.x-enemy.atk[enemy.currentatk].this.radius && enemyatkx <= player.x+enemy.atk[enemy.currentatk].this.radius && enemyatkx > 0) {
	  enemyatkx=0;
	  if(enemy.hp>0) player.hp-= enemy.atk[enemy.currentatk].this.pwr;
	  if(player.hp<0) player.hp=0;
  }
  if (canvas.key && canvas.key == 37) {player.update(-1);}
  if (canvas.key && canvas.key == 39) {player.update(1);}
  ctx.drawImage(bg.img, bg.x,bg.y);
if(enemy.hp>0){
  ctx.drawImage(enemy.img, enemy.x-(enemy.img.width/4), enemy.y, enemy.img.width*.6,enemy.img.height*.6);
}
if(player.hp>0){
  ctx.drawImage(player.img, player.x-(player.img.width/4), player.y);
  }
  enemy.basehpbar.modify(300,20,"#212121");
  player.basehpbar.modify(300,20,"#212121");
  enemy.hpbar.modify(300*(enemy.hp/enemy.basehp),20,"#ff2323");
  player.hpbar.modify(300*(player.hp/player.basehp),20,"#23fc6f");
  ctx.fillRect(enemy.x-25, 200, 50,10);
  ctx.fillStyle = "white";
  ctx.fillText(enemy.hp + "/" + enemy.basehp,15,24);
  ctx.fillText(player.hp + "/" + player.basehp,335,canvas.height-85);
	
}

function draw() {	
	ctx.font = "12px Arial";
   window.addEventListener('keydown', function (e) {
            canvas.key = e.keyCode;
        });
        window.addEventListener('keyup', function (e) {
            canvas.key = false;
  });
canvas.addEventListener('mousedown', function(e) {
    var rect = canvas.getBoundingClientRect();
	lastclickx = e.clientX - rect.left;
	lastclicky = Math.ceil(e.clientY - rect.top);
}, false);
canvas.addEventListener('mouseup', function(e) {
	lastclickx = 0;
	lastclicky = 0;
}, false);

player = new character(0,7,50,1);
enemy = new character(1,5,50,0);

  setInterval(animate, 20);
  setInterval(ai, 20);
  setInterval(aiatk, 20);
for(int i=0;i<3;i++) {
	setInterval(enemy.atk[i].checkready(),20);	
	setInterval(player.atk[i].checkready(),20);
}
  
  bg= {img : new Image(), x:0, y:(canvas.width/2)-209};
  bg.img.src = "bg.png";
 
}
/*
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
*/
