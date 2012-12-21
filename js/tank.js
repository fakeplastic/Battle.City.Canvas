var Tank = function(x, y, player) {
	this.x = x;
	this.y = y;
	this.vel = 0.5;
	this.sprite = new Image();
	this.sprite.src = "img/tank1/NES_Battle_Citty_P1T1_Ua.gif";
	this.isA = true;
	this.direction = "up";
	this.moving = false;
	this.isDestroyed = false;
	this.life = 100;
	this.player = player;
	this.tanktype = 1;
	this.bulletdam = 12.5;
	this.bulletsize = 1.5;
	this.bulletvel = 1.5;
	this.defense = 1.0;
	this.bbox = [];
	this.lastFired = 0;
	this.lifebox = [];
}

Tank.prototype.setSprite = function() {
	if (this.isDestroyed) {
		this.sprite.src = "img/tank1/NES_Battle_Citty_" + this.player + "T1_Destroyed.gif";
		return;
	}
	switch (this.direction) {
		case 'up':
			if (this.isA) {
				this.sprite.src = "img/tank1/NES_Battle_Citty_" + this.player + "T" + this.tanktype + "_Ub.gif";}
			else if (!this.isA) {
			this.sprite.src = "img/tank1/NES_Battle_Citty_" + this.player + "T" + this.tanktype + "_Ua.gif";}
			break;
		case 'down':
			if (this.isA) {
				this.sprite.src = "img/tank1/NES_Battle_Citty_" + this.player + "T" + this.tanktype + "_Db.gif";
			}
			else if (!this.isA) {
			this.sprite.src = "img/tank1/NES_Battle_Citty_" + this.player + "T" + this.tanktype + "_Da.gif";}
			break;
		case 'left':
			if (this.isA) {
				this.sprite.src = "img/tank1/NES_Battle_Citty_" + this.player + "T" + this.tanktype + "_Lb.gif";}
				else if (!this.isA) {
			this.sprite.src = "img/tank1/NES_Battle_Citty_" + this.player + "T" + this.tanktype + "_La.gif";}
			break;
		case 'right':
			if (this.isA) {
				this.sprite.src = "img/tank1/NES_Battle_Citty_" + this.player + "T" + this.tanktype + "_Rb.gif";}
				else if (!this.isA) {
			this.sprite.src = "img/tank1/NES_Battle_Citty_" + this.player + "T" + this.tanktype + "_Ra.gif";}
			break;
		default:
			this.sprite.src = null;

	}
}


Tank.prototype.update = function() {
	var px = this.x;
	var py = this.y;
	if (this.life <= 0) {
		this.isDestroyed = true;
		this.moving = false;
		};

	if (this.moving && (!this.isDestroyed)) {
		switch (this.direction) {
			case 'up':
			if (this.y > 0) {this.y -= this.vel;}
			this.isA = !this.isA;
			break;
			case 'down':
			if (this.y < GEObj.surfaceHeight) {this.y += this.vel;}
			this.isA = !this.isA;
			break;
			case 'left':
			if (this.x > 0) {this.x -= this.vel;}
			this.isA = !this.isA;
			break;
			case 'right':
			if (this.x < GEObj.surfaceWidth) {this.x += this.vel;}
			this.isA = !this.isA;
			break;
			}
		};
	this.bbox = [this.x-this.sprite.width/2,this.x+this.sprite.width/2,this.y-this.sprite.height/2,this.y+this.sprite.height/2];
	for(var i = 0; i < city.cityEnt.length; i++) {
		if(rectCollision(this,city.cityEnt[i])) {
			this.x = px;
			this.y = py;
			}
		};
	this.setSprite();




	

}

