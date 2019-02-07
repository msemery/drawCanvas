var canDraw = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_canDraw = false;
//variable de coordonnées qui démarrent à 0
//déclare les variables à l'extérieurs des fonctions car sinon null         
var canvas;
var context;

//initialise le canvas
function initCanvas() {
    //getContext est une fonction qui 
    //permet de spécifier le type rendu voulu, 2d = paramètre
    canvas = document.getElementById('sheet');
    context = canvas.getContext('2d');
    //initialise l'évennement pour récupérer les coordonnées quand
    //la souris bouge
    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    //initialise l'évennement pour récupérer les coordonnées quand
    //on clique sans lever le doigt de la souris
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    //initialise l'évennement pour récupérer les coordonnées quand
    //on lève le doigt de la souris
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false); 
}

//cherche les coordonnées
//on met deux papramètres à findxy res qui correspond à l'action réalisée
//et e qui correspond à l'évènnement 
//si res est down (c'est à dire que l'on clique sur la souris)
//les coordonnées démarrent à 0
//puis on déclare que currX = absisse de l'evennement (x) - le bord du 
//canvas gauche et currY = ordonné de l'evennement (y) - le haut du canvas
//dans res == move on applique la fonction draw() pour que quand on clique
//on puisse utiliser propriété de draw pour écrire
//si canDraw = true = on dessinne et false on ne dessine pas
//dor_candraw = point de départ
function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        canDraw = true;
        dot_canDraw = true;
        if (dot_canDraw) {
            context.beginPath();
            context.fillRect(currX, currY, 2, 2);
            context.closePath();
            dot_canDraw = false;
        }
    }
    if (res == 'up') {
        canDraw = false;
    }
    if (res == 'move') {
        if (canDraw) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}

// dessine dans le canvas
// on définit dans draw les propriété d'écriture du style
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

