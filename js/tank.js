var Tank = function(x, y) {
	this.x = x;
	this.prevx = x;
	this.y = y;
	this.prevy = y;
	this.sprite = new Image();
	this.sprite.src = "img/tank1/NES_Battle_Citty_P1T1_Ua.gif";
	this.isA = true;
	this.direction = "up";
	this.isDestroyed = false;
}

Tank.prototype.setSprite = function() {
	switch (this.direction) {
		case 'up':
			if (this.isA) {
				this.sprite.src = "img/tank1/NES_Battle_Citty_P1T1_Ub.gif";}
			else if (!this.isA) {
			this.sprite.src = "img/tank1/NES_Battle_Citty_P1T1_Ua.gif";}
			break;
		case 'down':
			if (this.isA) {
				this.sprite.src = "img/tank1/NES_Battle_Citty_P1T1_Db.gif";
			}
			else if (!this.isA) {
			this.sprite.src = "img/tank1/NES_Battle_Citty_P1T1_Da.gif";}
			break;
		case 'left':
			if (this.isA) {
				this.sprite.src = "img/tank1/NES_Battle_Citty_P1T1_Lb.gif";}
				else if (!this.isA) {
			this.sprite.src = "img/tank1/NES_Battle_Citty_P1T1_La.gif";}
			break;
		case 'right':
			if (this.isA) {
				this.sprite.src = "img/tank1/NES_Battle_Citty_P1T1_Rb.gif";}
				else if (!this.isA) {
			this.sprite.src = "img/tank1/NES_Battle_Citty_P1T1_Ra.gif";}
			break;
		default:
			this.sprite.src = null;

	}
}

Tank.prototype.move = function() {
	switch (this.direction) {
		case 'up':
		if (this.y > 0) {this.y--;}
		this.isA = !this.isA;
		break;
		case 'down':
		if (this.y < GEObj.surfaceHeight) {this.y++;}
		this.isA = !this.isA;
		break;
		case 'left':
		if (this.x > 0) {this.x--;}
		this.isA = !this.isA;
		break;
		case 'right':
		if (this.x < GEObj.surfaceWidth) {this.x++;}
		this.isA = !this.isA;
		break;
		
	}
}
