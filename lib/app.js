const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;
const unit = 150;
var alpha = 0;
function animate(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var x = new Vector(Math.cos(2*alpha),Math.sin(2*alpha));
    var c = new Vector(2*Math.cos(alpha),2*Math.sin(alpha));
    var s = c.sub(x)
    var p = new Point(0,0)
    x.draw(ctx,unit,canvas.width/2,canvas.height/2);
    c.draw(ctx,unit,canvas.width/2,canvas.height/2);
    s.draw(ctx,unit,canvas.width/2,canvas.height/2);
    p.draw(ctx,unit,canvas.width/2,canvas.height/2);
    alpha+=Math.PI/180;
    requestAnimationFrame(animate);
    
}
animate()
