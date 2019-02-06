var flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;

var canvas;
var context;

//initialise le canvas
function initCanvas() {
    
    canvas = document.getElementById('sheet');
    //if (canvas.getContext('2d')) {
        context = canvas.getContext('2d');
        //getContext est un paramètre qui 
        //permet de spécifier le type rendu voulu, là c'est le 2D

        //context.clearrect(60, 60, 60, 60);


        canvas.addEventListener("mousemove", function (e) {
            findxy('move', e)
        }, false);
        canvas.addEventListener("mousedown", function (e) {
            findxy('down', e)
        }, false);
        canvas.addEventListener("mouseup", function (e) {
            findxy('up', e)
        }, false);


    //}
}

//cherche les coordonnées
function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            context.beginPath();
            context.fillRect(currX, currY, 2, 2);
            context.closePath();
            dot_flag = false;
        }
    } 
    if (res == 'up') {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}

// dessine dans le canvas
function draw() {
    canvas = document.getElementById('sheet');
    context = canvas.getContext('2d');
    context.beginPath();
    context.fillStyle = "#FF0000";
    context.moveTo(prevX, prevY);
    context.lineTo(currX, currY);
    context.stroke();
    context.closePath();
}
