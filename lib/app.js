const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
canvas.height = innerHeight*1.5;
canvas.width = innerWidth*1.5;
canvas.style = "width:100%;height:100%;"
var centerX = canvas.width/2
var centerY = canvas.height/2
var unit = 250;
var t = 0;
window.addEventListener("keydown",(e)=>{
    console.log(e.key)
    if (e.key == "x"){unit+=5}
    if (e.key == "w"){unit+=-5}
    if (e.key == "d"){centerX-=25}
    if (e.key == "q"){centerX+=25}
    if (e.key == "z"){centerY+=25}
    if (e.key == "s"){centerY-=25}
    if (e.key == "Shift"){centerX = canvas.width/2;centerY = canvas.height/2}
    if (e.key == "Control"){unit = 250}
})
var p = new Point(-4,-2)
function animate(){
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var VF = new VectorField([-4,4],[-2,2],(x,y)=>{return 1},(x,y)=>{return y*(y-1)},0.25)
    VF.draw(ctx,unit,centerX,centerY)
    p.draw(ctx,unit,centerX,centerY,"rgba(255,55,255,1)")   
    p.x+=VF.f1(p.x,p.y)/unit
    requestAnimationFrame(animate);  
}
animate()
