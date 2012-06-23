/**
 * @author choneyman
 */
var Building = function(x, y, type) {
	this.x = x;
	this.y = y;
	this.type = type;
	this.rubble = false;
	this.img = New Image();
	if (this.type == 1) {
		if (this.rubble) {
			this.img.src = "img/city/rubble1-sq80.png";
		} else {
			this.img.src = "img/city/building1-sq80.png";
		}
	} else if (this.type == 2) {
		if (this.rubble) {
			this.img.src = "img/city/rubble2-80x120.png";
		} else {
			this.img.src = "img/city/building2-80x120.png";
		}
	}
}
