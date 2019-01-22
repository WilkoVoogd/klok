var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;// * 0.84;
canvas.width = canvas.height;
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.95
setInterval(drawClock, 1000);

function drawClock() {
	//drawSize();
    drawFace(ctx, radius);
	drawNumbers(ctx, radius);
	drawTime(ctx, radius);
}

/*function drawSize(canvas) {
	canvas.height = window.innerHeight;
	canvas.width = canvas.height;
}*/

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  var now = new Date();
  var hour = now.getHours();
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  if(hour < 13){
	  for(num = 1; num < 13; num++){
		  ang = num * Math.PI / 6;
		  ctx.rotate(ang);
		  ctx.translate(0, -radius*0.85);
		  ctx.rotate(-ang);
		  ctx.fillText(num.toString(), 0, 0);
		  ctx.rotate(ang);
		  ctx.translate(0, radius*0.85);
		  ctx.rotate(-ang);
	  }
  }
  else if(hour > 12){
	  for(num = 13; num < 25; num++){
		  ang = num * Math.PI / 6;
		  ctx.rotate(ang);
		  ctx.translate(0, -radius*0.85);
		  ctx.rotate(-ang);
		  ctx.fillText(num.toString(), 0, 0);
		  ctx.rotate(ang);
		  ctx.translate(0, radius*0.85);
		  ctx.rotate(-ang);
	  }
  }
  else
	  document.write("failure")
}

function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}
