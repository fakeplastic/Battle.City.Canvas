/**
 * @author choneyman
 */
var Building = function(x, y, type) {
	this.x = Math.floor(x / 40) * 40;
	this.y = Math.floor(y / 40) * 40;
	this.type = type;
	this.rubble = false;
	this.sprite = new Image();
	if (this.type == 1) {
		if (this.rubble) {
			this.sprite.src = "img/city/rubble1-sq80.png";
		} else {
			this.sprite.src = "img/city/building1-sq80.png";
		}
	} else if (this.type == 2) {
		if (this.rubble) {
			this.sprite.src = "img/city/rubble2-80x120.png";
		} else {
			this.sprite.src = "img/city/building2-80x120.png";
		}
	}
}
City = function() {
	this.cityEnt = [];
}

City.prototype.createLevel = function(level) {
	for (var i = 0; i < level.length; i++) {
		for (var j = 0; j < level[i].length; j++) {
			if (!level[i][j] == 0) {
				var bldg = new Building(i * 40, j * 40, level[i][j]);
				this.cityEnt.push(bldg);
			}
		}
	}
}

var level1 = [
[1,0,0,2,0,0,1,0],
[1,1,0,0,0,0,1,0],
[0,0,0,2,0,0,0,1],
[0,0,0,0,0,0,0,0],
[0,1,0,2,0,0,0,0],
[1,0,0,1,0,0,0,0]];

