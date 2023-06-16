var canvas = document.getElementById("canvas")
var [ctx,unit,centerX,centerY,t] = initialize(canvas,1.3)
controls()
centerX +=450
unit-=20
var s = new Point(-2,1)
var z = new Point(-1,-4)
t = 0
var p1 = []
var p2 = []
var txt = new Text_("fx(x,y) = -ycos x",[-10,3],"Consolas",36)
var txt2 = new Text_("fy(x,y) = x+sin y",[-10,1],"Consolas",36)
function animate(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var f = new VectorField([-4,4],[-3,3],(x,y)=>{return -y+Math.cos(x)},(x,y)=>{return x-Math.sin(y)},1.5)
    var g1 = f.dv(s)
    var g2 = f.dv(z)
    var crd = new Text_(`S(${Math.round(s.x*10000)/10000},${Math.round(s.y*1000)/1000})`,[s.x-0.25,s.y+0.25],"Consolas",16)
    f.Cfollowpoint(s,0.7)
    f.Cfollowpoint(z,0.7)
    f.dp(ctx,s.x,s.y,p1,1,"rgb(25,180,145)")
    f.dp(ctx,z.x,z.y,p2,1,"rgb(125,180,245)")
    crd.draw(ctx,unit,centerX,centerY,"rgba(25,255,120,1)")
    g1.draw(ctx,unit,centerX,centerY,"rgba(0,100,185,1)")
    g2.draw(ctx,unit,centerX,centerY,"rgba(0,100,185,1)")
    z.draw(ctx,unit,centerX,centerY,"rgba(255,100,185,1)")
    s.draw(ctx,unit,centerX,centerY,"rgba(255,255,0)")
    f.draw(ctx,unit,centerX,centerY)
    txt.draw(ctx,unit,centerX,centerY,"rgba(255,0,255,1)")
    txt2.draw(ctx,unit,centerX,centerY,"rgba(0,255,255,1)")
    requestAnimationFrame(animate);  
}
animate()
