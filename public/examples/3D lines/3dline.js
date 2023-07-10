var canvas = document.getElementById("canvas")
var [ctx,unit,centerX,centerY,t] = initialize(canvas,1.45)
t=0
unit = 80
var _txt = new Text_("Parametric equation",[-6.5,4.5],"Consolas",36)
var _txt1 = new Text_("E: {x=2t+1;y=t+1;z=-1/2*t} t∈[-3;3]",[-6.5,4],"Consolas",25)
controls()
function animate(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var p = new Plan3D([-5,5],t)
    var f = new Func3D(x=>2*x+1,y=>y+1,z=>-1/2*z,[-3,3],true,p)
    p.draw(ctx,unit,centerX,centerY,"rgb(225,120,155)")
    f.draw(ctx,unit,centerX,centerY,"rgb(255,255,255)")
    f.VExt(ctx,unit,centerX,centerY,"rgb(100,135,120)","rgb(166,100,120)")
    _txt.draw(ctx,unit,centerX,centerY)
    _txt1.draw(ctx,unit,centerX,centerY,"rgb(155,55,225)")
    requestAnimationFrame(animate);  
}
animate()
