var ctx = canvas.getContext('2d');
canvas.height = innerHeight*1.35;
canvas.width = innerWidth*1.35;
canvas.style = "width:100%;height:100%;"
var centerX = canvas.width/2;
var centerY = canvas.height/2;
var unit = 105;
var t = -4;
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
var x=1;
var d=0;
var r=0;
function animate(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    x=8;
    d=Math.PI/2;
    r=2.5;
    // drawing objects 
    for (let i=0;i<=x; i+=d){
        let point = new Point(r*Math.cos((t+i)/(x)),r*Math.sin((t+i)/(x)))
        let pointb = new Point(r*Math.cos((t+i+d)/(x)),r*Math.sin((t+i+d)/(x)))
        let vec = new Vector(pointb.x-point.x,pointb.y-point.y,point)
        point.draw(ctx,unit,centerX,centerY)
        pointb.draw(ctx,unit,centerX,centerY,"rgba(255,255,0,1)")
        vec.draw(ctx,unit,centerX,centerY)
    }
    console.log(`methode 1 : radius times angle: (${r*d})`)
    console.log(`methode 2 : sinus formula : (${r*Math.abs(x*Math.sin(d/x))})`)
    ctx.beginPath()
    ctx.ellipse(centerX,centerY,r*unit,r*unit,0,0,2*Math.PI,false)
    ctx.stroke()
    requestAnimationFrame(animate);  
}
animate()

    
