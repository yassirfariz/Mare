var canvas = document.getElementById("canvas")
var [ctx,unit,centerX,centerY,t] = initialize(canvas,1.45)
var txt = new Text_("5*exp(-1/2*x²)/sqrt(2*π)",[-5.5,3],"CONSOLAS",26)
controls()
function animate(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var f = new Func(x=>5*Math.exp(-1/2*(x)**2)/Math.sqrt(2*Math.PI),false,[-8,8],1)
    var p = f.getslopevec(t)
    var slp = new Text_(`dy(x)/dx  : ${p.y/p.x}`,[-5.5,2.5],"comic sans",21)
    f.draw(ctx,unit,centerX,centerY,"rgba(120,255,255)")
    p.draw(ctx,unit,centerX,centerY,"rgba(255,255,255)")
    t+=0.01
    var s = p.origin
    s.draw(ctx,unit,centerX,centerY,"rgb(210,150,10)")
    txt.draw(ctx,unit,centerX,centerY,"rgba(0,210,135,1)")
    slp.draw(ctx,unit,centerX,centerY,"rgba(255,210,135,1)")
    requestAnimationFrame(animate);  
}
animate()
