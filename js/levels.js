/**
 * @author choneyman
 */
var Building = function(x, y, type) {
	this.x = Math.floor(x / 40) * 40;
	this.y = Math.floor(y / 40) * 40;
	this.type = type;
	this.rubble = false;
	this.sprite = new Image();
	switch(this.type) {
		case 1:
		this.altsrc = "img/city/rubble1-sq80.gif";
		this.mainsrc = "img/city/building1-sq80.gif";
			this.bbox = [this.x,this.x+40,this.y,this.y+40];
		break;
		case 2:
		this.altsrc = "img/city/rubble2-80x120.gif";
		this.mainsrc = "img/city/building2-80x120.gif";
		this.bbox = [this.x,this.x+60,this.y,this.y+40];
		break;
	};
	this.sprite.src = this.mainsrc;
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
		if(this.cityEnt[i].isRubble) {
			this.cityEnt[i].sprite.src = this.cityEnt[i].altsrc;
			this.cityEnt[i].bbox = [0,0,0,0];
		}
	}
	
}

var level0 = {
	layout: [
[0,0,0,0,0,0,0,0],
[0,1,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0]],
start1x: 60,
start1y: 20,
start2x: 310,
start2y: 230,
goal1x: 210,
goal1y: 130,
goal2x: 20,
goal2y: 50,

imgsrc: "img/Asphalt_texture.JPG",
}

var level1 = {
	layout: [
[1,0,0,2,0,0,1,0],
[1,1,0,0,0,0,1,0],
[0,0,0,2,0,2,0,1],
[0,0,0,0,0,0,0,0],
[0,1,0,2,0,2,0,0],
[1,0,0,1,0,0,0,0]],
start1x: 60,
start1y: 20,
start2x: 310,
start2y: 230,
goal1x: 210,
goal1y: 130,
goal2x: 20,
goal2y: 50,
imgsrc: "img/Asphalt_texture.JPG",
}

