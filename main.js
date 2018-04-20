//constants
{
    var atkanitime = 0;
    var click = false;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var enemy;
    var bg;
    var movetime = 0;
    var direction = false;
    var lastclickx = 0;
    var lastclicky = 0;
    var enemyatkx = 0;
    var playeratkdrawinterval = 0;
    var enemyatkdrawinterval = 0;
}

function clearGame(_ctx) {
    _ctx.clearRect(0, 0, canvas.width, canvas.height);
    return _ctx;
}

function attack(name, interval, pwr, radius, src, effectsrc, x, y) {
    this.name = name;
    this.imgeffect = new Image();
    this.imgeffect.src = effectsrc;
    this.img = new Image();
    this.img.src = src;
    //note: interval incremented by one every frame draw
    this.interval = interval;
    this.time = this.interval;
    this.pwr = pwr;
    this.radius = radius;
    this.ready = true;
    this.x = x;
    this.y = y;
    this.buttnborder = new circle(x,y,37,"#ff3838");
    this.buttnbase = new circle(x,y,35,"#212121");
    this.buttn = new circle(x,y,35,"#616161");
    this.checkready = function() {
        if (this.time >= this.interval) {
            this.ready = true;
            this.time = this.interval;
        } else
            this.ready = false;
        var inc = (this.time / this.interval) * Math.PI;
        this.buttnbase.draw(0, 2 * Math.PI);
        this.buttn.draw(.5 * Math.PI - inc, .5 * Math.PI + inc);
        ctx.drawImage(this.img, this.x - (.5 * this.img.width), this.y - (.5 * this.img.height));
    }
}

function circle(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.draw = function(arc1, arc2) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.r, arc1, arc2);
        ctx.fill();
    }
}

function character(species, speed, hp, alignment /*true if player, false if enemy*/
) {
    this.img = new Image();
    if (species == 0) {
        this.img.src = "wupperbehind.png";
    } else {
        this.img.src = "nymphous.png";
    }
    this.currentatk = 0;
    this.basespeed = speed;
    this.currentspeed = speed;
    this.acc = .05;
    this.hp = hp;
    this.basehp = hp;
    this.headingleft = false;
    this.headingright = false;
    if (alignment == true) {
        this.atk = [new attack("Bite",250,2,50,"bite.png","hit.png",canvas.width - 280,canvas.height - 75), new attack("Wave",600,15,50,"wave.png","waveeffect.png",canvas.width - 200,canvas.height - 75), new attack("Splash",150,2,50,"splash.png","waveeffect.png",canvas.width - 120,canvas.height - 75)];
        this.y = canvas.height - 150;
        this.hpbar = new component(20,100,"#23fc6f",canvas.width - 310,canvas.height - 30);
        this.basehpbar = new component(20,300,"#212121",canvas.width - 310,canvas.height - 30);
    } else {
        this.atk = [new attack("Bite",400,2,25,"bite.png","bite.png",45,70), new attack("Bite",20,2,15,"bite.png","bite.png",125,70), new attack("Bite",20,2,15,"bite.png","bite.png",205,70)];
        this.y = canvas.height * .4;
        this.hpbar = new component(20,100,"#ff2323",10,10);
        this.basehpbar = new component(20,300,"#212121",10,10);
    }
    this.x = (canvas.width / 2);

    this.update = function(posneg) {
        if (posneg > 0 && this.movingright == true) {
            this.currentspeed += (this.currentspeed * this.acc);
            if (this.currentspeed > (this.basespeed * 2)) {
                this.currentspeed = this.basespeed * 2;
            }
            if (((this.x + this.currentspeed * posneg) > 0) && ((this.x + (this.img.width / 2) + this.currentspeed * posneg) < canvas.width)) {
                this.x += (this.currentspeed * posneg);
            }
        }
        else if (posneg < 0 && this.movingleft == true) {
            this.currentspeed += (this.currentspeed * this.acc);
            if (this.currentspeed > (this.basespeed * 2)) {
                this.currentspeed = this.basespeed * 2;
            }
            if (((this.x - (this.img.width / 4) + this.currentspeed * posneg) > 0) && ((this.x + this.currentspeed * posneg) < canvas.width)) {
                this.x += (this.currentspeed * posneg);
            }
        } else {
            this.currentspeed = this.basespeed;
            if (((this.x + this.currentspeed * posneg) > 0) && ((this.x + this.currentspeed * posneg) < canvas.width)) {
                this.x += (this.currentspeed * posneg);
            }
        }
        if (posneg > 0) {
            this.movingleft = false;
            this.movingright = true;
        } else {
            this.movingright = false;
            this.movingleft = true;
        }

    }
}

function component(height, width, color, x, y) {
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
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }

}

function ai() {
    if (movetime <= 0) {
        movetime = getRndInteger(50, canvas.width);
        if (direction == false)
            direction = true;
        else if (direction == true)
            direction = false;
    }

    if (direction == true) {
        enemy.update(1);
    }
    else {
        enemy.update(-1);
    }

    movetime -= enemy.currentspeed;
}

function aiatk() {
    if (enemy.atk[enemy.currentatk].ready) {
        enemyatkx = player.x + getRndInteger(enemy.atk[enemy.currentatk].radius * -2, enemy.atk[enemy.currentatk].radius * 2);
        enemy.atk[enemy.currentatk].time = 0;
    } 
	else {
		enemy.currentatk++;
		if (enemy.currentatk < 2) {
           		enemy.currentatk=0;
		}
        	
    }
}

function checkhit(x, target, user) {
    return ((x >= (target.x - user.atk[user.currentatk].radius)) && (x <= (target.x + user.atk[user.currentatk].radius)) && (x > 0));
}

function checkatk() {
    if (checkhit(lastclickx, enemy, player) && player.atk[player.currentatk].ready && click) {
        player.atk[player.currentatk].time = 0;
        if (player.hp > 0)
            enemy.hp -= player.atk[player.currentatk].pwr;
        if (enemy.hp < 0)
            enemy.hp = 0;
    } 
else if (!checkhit(lastclickx, enemy, player) && player.atk[player.currentatk].ready && click) {
        player.atk[player.currentatk].time = 0;
    }

    if (checkhit(enemyatkx, player, enemy) && enemy.atk[enemy.currentatk].ready) {
        if (enemy.hp > 0)
            player.hp -= enemy.atk[enemy.currentatk].pwr;
        if (player.hp < 0)
            player.hp = 0;
    }
}

function updateatk() {
    if (atkanitime > 0) {
        atkanitime -= .25;
    }
    for (var i = 0; i < player.atk.length; i++) {
        player.atk[i].time++;
        if (i == player.currentatk) {
            player.atk[i].buttnborder.color = "red";
	}
        else {
            player.atk[i].buttnborder.color = "#000";
	}
        player.atk[i].buttnborder.draw(0, 2 * Math.PI);
        player.atk[i].checkready();
	
    }

    for (var i = 0; i < enemy.atk.length; i++) {
        enemy.atk[i].time++;
        if (i == enemy.currentatk) {
            enemy.atk[i].buttnborder.color = "red";
	}
        else {
            enemy.atk[i].buttnborder.color = "#000"; 
	}
        enemy.atk[i].buttnborder.draw(0, 2 * Math.PI);
        enemy.atk[i].checkready();
	
    }
}
function checkinput() {
    if (canvas.key && canvas.key == 37) {
        player.update(-1);
    }
    if (canvas.key && canvas.key == 39) {
        player.update(1);
    }
    if (canvas.key && canvas.key == 38 && player.currentatk > 0) {
        player.currentatk--;
        canvas.key = false;
    }
    if (canvas.key && canvas.key == 40 && player.currentatk < player.atk.length - 1) {
        player.currentatk++;
        canvas.key = false;
    }
}
function setcurratkcolor() {
    for (var i = 0; i < player.atk.length; i++) {
        if (player.atk[i].ready)
            player.atk[i].buttn.color = "#edd976";
        else
            player.atk[i].buttn.color = "#414141";
    }
    for (var i = 0; i < enemy.atk.length; i++) {
        if (enemy.atk[i].ready)
            enemy.atk[i].buttn.color = "#edd976";
        else
            enemy.atk[i].buttn.color = "#414141";
    }
}
/////////////////////////////////////////////
function animate() {
    ctx.globalAlpha = 1;
    ctx = clearGame(ctx);
    ctx.drawImage(bg.img, bg.x, bg.y);
    checkinput();
    setcurratkcolor();
    if (enemy.hp > 0)
        ctx.drawImage(enemy.img, enemy.x - (enemy.img.width / 4), enemy.y, enemy.img.width * .6, enemy.img.height * .6);
    if (player.hp > 0)
        ctx.drawImage(player.img, player.x - (player.img.width / 4), player.y);

    enemy.basehpbar.modify(300, 20, "#212121");
    player.basehpbar.modify(300, 20, "#212121");
    enemy.hpbar.modify(300 * (enemy.hp / enemy.basehp), 20, "#ff2323");
    player.hpbar.modify(300 * (player.hp / player.basehp), 20, "#23fc6f");
    ctx.fillStyle = "white";
    ctx.fillText(enemy.hp + "/" + enemy.basehp, 15, 24);
    ctx.fillText(player.hp + "/" + player.basehp, canvas.width - 305, canvas.height - 15);
    updateatk();
    checkatk();
    ctx.globalAlpha = (atkanitime / 10);
    ctx.drawImage(player.atk[player.currentatk].imgeffect, lastclickx - player.atk[player.currentatk].imgeffect.width / 2, enemy.y + 20);
}

function draw() {

    ctx.font = "12px Arial";
    window.addEventListener('keydown', function(e) {
        canvas.key = e.keyCode;
    });
    window.addEventListener('keyup', function(e) {
        canvas.key = false;
    });
    canvas.addEventListener('mousedown', function(e) {
        if (player.atk[player.currentatk].ready) {
            atkanitime = 10;
            var rect = canvas.getBoundingClientRect();
            lastclickx = e.clientX - rect.left;
            lastclicky = Math.ceil(e.clientY - rect.top);
        }
        click = true;
    }, false);
    canvas.addEventListener('mouseup', function(e) {
        // lastclickx = 0;
        // lastclicky = 0;
        click = false;
    }, false);

    player = new character(0,7,50,1);
    enemy = new character(1,5,50,0);

    setInterval(animate, 20);
    setInterval(ai, 20);
    setInterval(aiatk, 20);

    bg = {
        img: new Image(),
        x: 0,
        y: 0
    };
    bg.img.src = "bg.png";

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*function togglepopup(elementname){
if(document.getElementById(elementname).style.display != "none") {
document.getElementById(elementname).style.display = "none";
}
else {
document.getElementById(elementname).style.display = "inline";
}
}*/
function getRndInteger(min, max) {
    //This JavaScript function always returns a random number between min (included) and max (excluded)
    return Math.floor(Math.random() * (max - min)) + min;
}
function getRnd(min, max) {
    //This JavaScript function always returns a random number between min (included) and max (excluded)
    return (Math.random() * (max - min)) + min;
}

function displayTime() {
    return Date("T12:00Z");
}
