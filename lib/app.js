var ctx = canvas.getContext('2d')
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

function animate(){
    ctx.fillStyle = "black";
    // code initalising objects
    let p = new Plan([-5,5],0)
    let z = new Func((x)=>{return Math.cos(x)},false,[-5,5],1,"rgba(233,55,223,1)")
    let x = new Func((x)=>{return Math.exp(x)},false,[-4,2],1,"rgba(255,2,128,1)")
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // drawing objects 
    let cs = z.getslopevec(t)
    cs.origin = new Point(t,z.f(t)); 
    p.draw(ctx,unit,centerX,centerY);
    x.draw(ctx,unit,centerX,centerY);
    z.draw(ctx,unit,centerX,centerY);
    let i = z.intersection(x)
    i.draw(ctx,unit,centerX,centerY)
    cs.draw(ctx,unit,centerX,centerY,"rgba(255,24,20,1)");
    ctx.closePath()
    ctx.beginPath()
    ctx.ellipse(centerX+t*unit,centerY-z.f(t)*unit,unit,unit,0,0,2*Math.PI,false)
    ctx.stroke()
    t+=0.01;
    requestAnimationFrame(animate);  
}
animate()

    
