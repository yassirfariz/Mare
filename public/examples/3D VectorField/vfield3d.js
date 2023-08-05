var canvas = document.getElementById("canvas")
var [ctx,unit,centerX,centerY,t] = initialize(canvas,1.11)
controls()
unit -= 25
t = 0
var pt = []
ct = t
/** 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Point3D} o 
 * @param {time} t 
 * @param {number[number[2]]} arr 
 * @param {Plan3D} space 
*/
function cs(ctx,o,t,z) {
    ctx.beginPath()
    if (o.xr<80 || o.yr<80)
        pt.push([o.xr,o.yr,o.x,o.y,o.z])
    ctx.strokeStyle = "blue"
        ctx.lineWidth = 4
        if (pt.length > 2) {
            for(let i=1;i<pt.length;i+=1){
                ctx.moveTo(centerX+pt[i-1][0]*unit,centerY-pt[i-1][1]*unit)
                ctx.lineTo(centerX+pt[i][0]*unit,centerY-pt[i][1]*unit)
            }
        }
        ctx.stroke()
    ctx.closePath()
    if(t!=ct){
        for(let i=0;i<pt.length;i+=1){
            var [x,y] = [pt[i][2],pt[i][3]]  
            pt[i][0] = z.xr(x,y);
            pt[i][1] = z.yr(x,y,pt[i][4]);
        }
        ct=t
    }
}
var p = new Plan3D([-3,3],t)
var point = new Point3D(7,2,3,p)
point.t = t
function animate(){
    p.a = t
    point.t = t
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var vf = new VectorField3D(
        [-3,3],[-3,3],[0,4],
        (x,y,z)=>-y,(x,y,z)=>x-y,(x,y,z)=>-x,
        p,1.3
    )  
    var dvec = new Vector3(vf.f1(point.x,point.y,point.z),vf.f2(point.x,point.y,point.z),vf.f3(point.x,point.y,point.z),point)
    point.x += vf.f1(point.x,point.y,point.z)/150
    point.y += vf.f2(point.x,point.y,point.z)/150
    point.z += vf.f3(point.x,point.y,point.z)/150
    dvec = dvec.scale(1/dvec.norm())
    cs(ctx,point,t,p)
    point.draw(ctx,unit,centerX,centerY,"rgb(255,120,155)")
    dvec.draw(ctx,unit,centerX,centerY,"rgb(75,255,120)")
    p.draw(ctx,unit,centerX,centerY,"rgb(25,145,100)")
    vf.draw(ctx,unit,centerX,centerY)
    requestAnimationFrame(animate);  
}
animate()
