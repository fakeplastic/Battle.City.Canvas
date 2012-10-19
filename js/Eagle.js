/**
 * @author Cory
 */
var Eagle = function(x,y,goalnum) {
  this.x = x;
  this.y = y;
  this.goal = goalnum;
  this.sprite = new Image();
  this.sprite.src = "img/NES_Battle_Citty_Eagle_" + this.goal + ".gif";
  this.isShow = true;
 }