var canvas = document.getElementById("canvas")
var [ctx,unit,centerX,centerY,t] = initialize(canvas)
controls()
function animate(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var f = new Func((x)=>{return Math.sin(x)*Math.cos(x)},false,[-4,4],1,"rgba(250,100,125)")
    var p = f.getslopevec(t)
    f.draw(ctx,unit,centerX,centerY)
    p.draw(ctx,unit,centerX,centerY,"rgba(255,255,255)")
    t+=0.01
    requestAnimationFrame(animate);  
}
animate()

    
