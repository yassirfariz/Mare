var canvas = document.getElementById("canvas")
var [ctx,unit,centerX,centerY,t] = initialize(canvas,1.25)
t=0
unit = 135
controls()
function animate(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var p = new Plan([-3,3]);
    var c = new trigCercle(new Point(0,0),2);
    p.draw(ctx,unit,centerX,centerY,"rgba(255,255,255)")
    c.draw(ctx,unit,centerX,centerY,"rgba(125,144,255)")
    var s = new Func(x=>Math.tan(t)*x+2*Math.sin(t),true,[-2.5,2.5])
    var zc = new Func(x=>Math.tan(t-Math.PI/2)*(x-2*Math.cos(t)),true,[-2.5,2.5])
    var tc = new Func(x=>Math.tan(t)*(x-Math.cos(t))+Math.sin(t),true,[0,Math.cos(t)])
    var c2 = new trigCercle(new Point(Math.cos(t),Math.sin(t)),1)
    var o = s.intersection(zc)
    var c3 = new trigCercle(o,1)
    s.draw(ctx,unit,centerX,centerY,"rgb(123,11,125)")
    o.draw(ctx,unit,centerX,centerY)
    c.draw(ctx,unit,centerX,centerY,"rgb(15,133,180)")
    c2.draw(ctx,unit,centerX,centerY,"rgb(155,121,190)")
    c3.draw(ctx,unit,centerX,centerY,"rgb(155,221,190)")
    zc.draw(ctx,unit,centerX,centerY,"rgb(11,111,125)")
    tc.draw(ctx,unit,centerX,centerY,"rgb(0,220,255)")
    t+=0.01;
    requestAnimationFrame(animate);  
}
animate()
