$(document).ready(function () {
  const maxDistance = 200;

  let mob = new Mob(maxDistance);

  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  ctx.translate(canvas.width / 2, canvas.height / 2);

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderMaxDistance();
    renderMob();
  }

  function renderMob() {
    ctx.beginPath();
    ctx.arc(mob.xPos, mob.yPos, mob.radius, 0, Math.PI * 2);
    ctx.strokeStyle = "#ff1919";
    ctx.fillStyle = "#ff1919";
    ctx.fill();
    ctx.closePath();
  }

  function renderMaxDistance() {
    ctx.beginPath();
    ctx.arc(0, 0, maxDistance, 0, Math.PI * 2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#19ffff";
    ctx.stroke();
  }

  render();
});
