var Tank = function(x, y, player) {
	this.x = x;
	this.prevx = x;
	this.y = y;
	this.prevy = y;
	this.vel = .5;
	this.sprite = new Image();
	this.sprite.src = "img/tank1/NES_Battle_Citty_P1T1_Ua.gif";
	this.isA = true;
	this.direction = "up";
	this.isDestroyed = false;
	this.player = player;
	this.tanktype = 1;
}

Tank.prototype.setSprite = function() {
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

Tank.prototype.move = function() {
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
}
