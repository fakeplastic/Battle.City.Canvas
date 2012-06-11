/**
 * @author Cory
 */
window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
})();

function Timer () {
	this.gameTime = 0;
	this.lastTime = 0;
	this.maxTime = 0.05;
}

Timer.prototype.tick = function() {
	var timeCurrent = Date.now();
	var timeDelta = (timeCurrent - this.lastTime) / 1000;
	this.lastTime = timeCurrent;
	var gameTime +=  
}

function GameEngine () {
	this.entities = [];
	this.ctx = null;
	this.timer = new Timer();
	

	
}
