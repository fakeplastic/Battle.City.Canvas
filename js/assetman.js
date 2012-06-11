/**
 * @author choneyman
 */

/* Asset manager to download all images first
 * 
 */

function AssetMan () {
	this.done = 0;
	this.errors = 0;
	this.cache = {};
	this.dnQueue = [];
}

/*function to add item to the queue*/
AssetMan.prototype.createQueue = function(path) {
	this.dnQueue.push(path);
}

/*function to check if its done*/
AssetMan.prototype.isDone = function(){
	return(this.dnQueue.length == this.done + this.errors);
}

/*function to download all images and cache them*/
AssetMan.prototype.dnAll = function (callback) {
	for (var i = 0; i < this.dnQueue.length; i++){
		var path = this.dnQueue[1];
		var img = new Image();
		var that = this;
		img.addEventListener("load", function() {
			that.done += 1;
			if (that.isDone()) { callback(); }
			});
		img.addEventListener("error", function() {
			that.errors += 1;
         	if (that.isDone()) { callback(); }
         	});
         	img.src = path;
         	this.cache[path] = image
          
	}
}

AssetMan.prototype.getAsset = Function() {
	return this.cache[path];
}