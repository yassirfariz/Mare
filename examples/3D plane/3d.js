var canvas = document.getElementById("canvas")
var [ctx,unit,centerX,centerY,t]=initialize(canvas)
controls()
function animate(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var p = new Plan3D([-3,3],t)
    var o = new Point3D(1,2,0,p)
    var v = new Vector3(1,1,1,o)
    var Vectors = o.pvectors()
    Vectors[0].draw(ctx,unit,centerX,centerY,"rgba(255,0,255)")
    Vectors[1].draw(ctx,unit,centerX,centerY,"rgba(0,0,255)")
    Vectors[2].draw(ctx,unit,centerX,centerY,"rgba(125,125,0)")
    v.draw(ctx,unit,centerX,centerY)
    p.draw(ctx,unit,centerX,centerY,"rgba(255,255,255)")
    o.draw(ctx,unit,centerX,centerY,"rgba(255,255,255)")
    t+=0.01
    requestAnimationFrame(animate);  
}
animate()