/**
 * @author choneyman
 */
var Building = function(x, y, type) {
	this.x = Math.floor(x / 40) * 40;
	this.y = Math.floor(y / 40) * 40;
	this.type = type;
	this.damage = 0;
	this.sprite = new Image();
	this.sprite.src = "img/city/building" + this.type + "_" + this.damage + ".gif";
	switch(this.type) {
		case 1:
		this.bbox = [this.x,this.x+40,this.y,this.y+40];
		break;
		case 2:
		this.bbox = [this.x,this.x+60,this.y,this.y+40];
		break;
	};
	this.cx = this.x + this.sprite.width;
	this.cy = this.y + this.sprite.height;
}
City = function() {
	this.cityEnt = [];
	this.BG = null;
}

City.prototype.createLevel = function(level) {
	
	this.BG = new Image();
	this.BG.src = level1.imgsrc;
	for (var i = 0; i < level.layout.length; i++) {
		for (var j = 0; j < level.layout[i].length; j++) {
			if (!level.layout[i][j] == 0) {
				var bldg = new Building(j * 40, i * 40, level.layout[i][j]);
				this.cityEnt.push(bldg);
			}
		}
	}
}

City.prototype.update = function() {
	for(var i = 0; i < this.cityEnt.length; i++) {
		this.cityEnt[i].sprite.src = "img/city/building" + this.cityEnt[i].type + "_" + this.cityEnt[i].damage + ".gif";
		if(this.cityEnt[i].damage === 3) {
			this.cityEnt[i].bbox = [0,0,0,0];
		}
	}
	
}

var level1 = {
	layout: [
[1,0,0,2,0,0,1,0],
[1,1,0,0,0,0,1,0],
[0,0,0,2,0,2,0,1],
[0,0,0,0,0,0,0,0],
[0,1,0,2,0,2,0,0],
[1,0,0,1,0,0,0,0]],
start1x: 80,
start1y: 10,
start2x: 280,
start2y: 230,
goal1x: 160,
goal1y: 210,
goal2x: 40,
goal2y: 20,
imgsrc: "img/Asphalt_texture.JPG",
}

