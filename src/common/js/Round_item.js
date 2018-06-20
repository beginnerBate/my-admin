var WIDTH =  document.body.clientWidth
var HEIGHT =  document.body.clientHeight
function Round_item(index, x, y,content) {
  this.content = content
  this.index = index;
  this.x = x;
  this.y = y;
  this.r = Math.random() * 12 + 1;
  var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
  this.color = "rgba(255,255,255," + alpha + ")";
}

Round_item.prototype.draw = function () {
  this.content.fillStyle = this.color;
  this.content.shadowBlur = this.r * 2;
  this.content.beginPath();
  this.content.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
  this.content.closePath();
  this.content.fill();
};



Round_item.prototype.move = function () {
  this.y -= 0.15;
  if (this.y <= -10) {
      this.y = 900 + 10;
  }
  this.draw();
};

export default Round_item