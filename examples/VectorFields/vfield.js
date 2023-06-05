var canvas = document.getElementById("canvas")
var [ctx,unit,centerX,centerY,t] = initialize(canvas)
controls()
var s = new Point(1,0)
function animate(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var f = new VectorField([-4,4],[-3,3],(x,y)=>{return -y},(x,y)=>{return x},1)
    s.x += f.f1(s.x,s.y)/15
    s.y += f.f2(s.x,s.y)/15
    s.draw(ctx,unit,centerX,centerY,"rgba(255,255,0)")
    f.draw(ctx,unit,centerX,centerY)
    requestAnimationFrame(animate);  
}
animate()
