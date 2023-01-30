const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
canvas.height = innerHeight*1.45;
canvas.width = innerWidth*1.45;
canvas.style = "width:100%;height:100%;"
var centerX = canvas.width/2;
var centerY = canvas.height/2;
var unit = 75;
var t = 0;
window.addEventListener("keydown",(e)=>{
    console.log(e.key)
    if (e.key == "x"){unit+=5}
    if (e.key == "w"){unit+=-5}
    if (e.key == "d"){centerX-=25}
    if (e.key == "q"){centerX+=25}
    if (e.key == "z"){centerY+=25}
    if (e.key == "s"){centerY-=25}
    if (e.key == "a" ){t-=Math.PI/50}
    if (e.key == "e" ){t+=Math.PI/50}
    if (e.key == "r") {t = 0}
    if (e.key == "Shift"){centerX = canvas.width/2;centerY = canvas.height/2}
    if (e.key == "Control"){unit = 100}
})
function animate(){
    ctx.fillStyle = "black";
    // code initalising objects
    var space = new Plan3D([-4,4],t)
    var point = new Point3D(1,2,1,space)
    var vt = point.pvectors()
    var pv = point.posV()
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // drawing objects 
    space.draw(ctx,unit,centerX,centerY)
    point.draw(ctx,unit,centerX,centerY,"rgb(240,125,166)")
    vt[0].draw(ctx,unit,centerX,centerY)
    vt[1].draw(ctx,unit,centerX,centerY)
    vt[2].draw(ctx,unit,centerX,centerY)
    pv.draw(ctx,unit,centerX,centerY)
    ctx.closePath()
    requestAnimationFrame(animate);  
}
animate()

    