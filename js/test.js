var canvas = document.getElementById("gamecanvas");
var ctx = canvas.getContext("2d");
var img = new Image();
img.onload = function () {
	ctx.drawImage(img,300,300);
}
img.src = "img/NES_Battle_Citty_Eagle.gif";

