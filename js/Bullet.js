/**
 * @author Cory
 */
  var Bullet = function(x,y, direction) {
    this.x = x;
    this.y = y;
    this.vel = 2;
    this.direction = direction;
    this.isRemoved = false;
  }

  Bullet.prototype.move = function() {
    switch(this.direction) {
      case "up":
        this.y--;
        break;
      case "right":
        this.x++;
        break;
      case "down":
        this.y++;
        break;
      case "left":
        this.x--;
      default:
    }
  }
