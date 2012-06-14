function Timer () {
	this.gameTime = 0;
	this.lastTime = 0;
	this.maxTime = 0.05;
}

Timer.prototype.tick = function() {
	var timeCurrent = Date.now();
	var timeDelta = (timeCurrent - this.lastTime) / 1000;
	this.lastTime = timeCurrent;
	var gameDelta = Math.min(timeDelta, this.maxTime);
	this.gameTime +=  gameDelta;
	return gameDelta;
}