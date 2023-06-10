var canvas = document.getElementById("canvas")
var [ctx,unit,centerX,centerY,t] = initialize(canvas)
controls()
centerX +=450
unit-=20
var s = new Point(-1,1)
var z = new Point(2,0)
t = 0
var p1 = []
var p2 = []
function animate(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var f = new VectorField([-4,4],[-3,3],(x,y)=>{return -y+Math.cos(x)},(x,y)=>{return x+Math.sin(y)},1)
    var g1 = f.dv(s)
    var g2 = f.dv(z)
    f.Cfollowpoint(s,0.7)
    f.Cfollowpoint(z,0.7)
    f.dp(ctx,s.x,s.y,p1,1,"rgb(25,180,145)")
    f.dp(ctx,z.x,z.y,p2,1,"rgb(125,180,245)")
    g1.draw(ctx,unit,centerX,centerY,"rgba(0,100,185,1)")
    g2.draw(ctx,unit,centerX,centerY,"rgba(0,100,185,1)")
    z.draw(ctx,unit,centerX,centerY,"rgba(255,100,185,1)")
    s.draw(ctx,unit,centerX,centerY,"rgba(255,255,0)")
    f.draw(ctx,unit,centerX,centerY)
    requestAnimationFrame(animate);  
}
animate()
