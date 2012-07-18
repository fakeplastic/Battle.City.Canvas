/* For loading images before they are needed. */

function AssetMan () {
	this.yay = 0;
	this.nay = 0;
	this.cache = {};
	this.dnQueue = [];

};

AssetMan.prototype.AddQueue = function(path) {
	this.dnQueue.push(path);
};

AssetMan.prototype.dnLoad = function(callback) {
	for (var i = 0; i < this.dnQueue.length; i++) {
		var path = this.dnQueue[i];
		var img = new Image();
		var ASM = this;
		img.addEventListener("load", function() {
			ASM.yay += 1;
			if(ASM.isDone()) {
				callback();

			}

		})
		img.addEventListener("error", function() {
			ASM.nay += 1;
			if(ASM.isDone()) {
				callback();
			}
		})
		img.src = path;
		this.cache[path] = img;
	};
};

AssetMan.prototype.getImg = function(path) {
	return this.cache[path];
};

AssetMan.prototype.isDone = function() {
	return (this.yay + this.nay === this.dnQueue.length);
}