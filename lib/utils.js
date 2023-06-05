function initialize(canvas){
    var ctx = canvas.getContext('2d');
    canvas.height = innerHeight*1.35;
    canvas.width = innerWidth*1.35;
    canvas.style = "width:100%;height:100%;"
    var centerX = canvas.width/2;
    var centerY = canvas.height/2;
    var unit = 105;
    var t = -4;
    return [ctx,unit,centerX,centerY,t]
}
function controls(){
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
}