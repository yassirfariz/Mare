var canvas = document.getElementById("canvas")
var [ctx,unit,centerX,centerY,t] = initialize(canvas,1.45)
var txt = new Text_("f(x) = 5/(1+exp(-x))-5/2",[-5.5,3],"CONSOLAS",26)
controls()
function animate(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var f = new Func((x)=>{return 5/(1+Math.exp(-x))-2.5},false,[-8,8],1,"rgba(250,100,125)")
    var p = f.getslopevec(t)
    var slp = new Text_(`dérivés : ${p.y/p.x}`,[-5.5,2.5],"comic sans",21)
    f.draw(ctx,unit,centerX,centerY)
    p.draw(ctx,unit,centerX,centerY,"rgba(255,255,255)")
    t+=0.01
    txt.draw(ctx,unit,centerX,centerY,"rgba(0,210,135,1)")
    slp.draw(ctx,unit,centerX,centerY,"rgba(255,210,135,1)")
    requestAnimationFrame(animate);  
}
animate()
