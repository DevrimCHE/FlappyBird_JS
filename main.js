var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var scoreBoard = document.getElementById("scoreBoard");

var boxSpace = canvas.width/3;
var boxSpeed = 1;
var boxColor = "#B2FF59";
var animationCounter = 0;
var animation = false;
var gravity = 2;
var score = 0;

var bird = {x: canvas.width/2, y: canvas.height/2, r:15, color:"#FFEB3B", speed:3, animationTime:35};
var Box1 = {x: canvas.width,y: 0, width: 30, spaceY:canvas.height*0.3333, spaceHeight: bird.r * 9};
var Box2 = {x: Box1.x + boxSpace,y: 0, width: 30, spaceY:canvas.height*0.6666, spaceHeight: bird.r * 9};
var Box3 = {x: Box2.x + boxSpace,y: 0, width: 30, spaceY:canvas.height*0.4835, spaceHeight: bird.r * 9};

document.onkeydown = checkKey;
setInterval(update, 10);
setInterval(flyAnimation, 1);

function update() 
{
    drawCanvas();
    bird.y += gravity;
    Box1.x -= boxSpeed;
    Box2.x -= boxSpeed;
    Box3.x -= boxSpeed;

    restartControls(Box1);
    restartControls(Box2);
    restartControls(Box3);
    
    if(bird.y > canvas.height)//kuş aşşağı düşünce
    {
        restart();
    }
    //kutuların sona gelmesi
    if(Box1.x < -Box1.width)
    {
        Box1.x = canvas.width;
        Box1.spaceY = getRandomInt(80, canvas.height - Box1.spaceHeight - 20);
    }
    if(Box2.x < -Box2.width)
    {
        Box2.x = canvas.width;
        Box2.spaceY = getRandomInt(30, canvas.height - Box1.spaceHeight - 20);
    }
    if(Box3.x < -Box3.width)
    {
        Box3.x = canvas.width;
        Box3.spaceY = getRandomInt(80, canvas.height - Box3.spaceHeight - 20);
    }
}

function restartControls(box)
{
    if(bird.x + bird.r > box.x && bird.x + bird.r - bird.r < box.x + box.width)
    {
        if(bird.x == box.x)
        {
            score++;
            scoreBoard.innerHTML = score;
        
        }
        if(bird.y - bird.r > box.spaceY && bird.y + bird.r < box.spaceY + box.spaceHeight)
        {
        }
        else
        {
            restart();
        }
    }
}

function drawCanvas()
{
    ctx.beginPath();//Kutuları çiz
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.rect(Box1.x, Box1.y, Box1.width, canvas.height);
    ctx.rect(Box2.x, Box2.y, Box2.width, canvas.height);
    ctx.rect(Box3.x, Box3.y, Box3.width, canvas.height);
    ctx.fillStyle = boxColor;
    ctx.fill();    
    ctx.beginPath();//Kuşu çiz
    ctx.clearRect(Box1.x, Box1.spaceY,Box1.width, Box1.spaceHeight);//1.Boşluk yarat
    ctx.clearRect(Box2.x, Box2.spaceY,Box2.width, Box2.spaceHeight);//2.Boşluk yarat
    ctx.clearRect(Box3.x, Box3.spaceY,Box3.width, Box3.spaceHeight);//3.Boşluk yarat
    ctx.arc(bird.x,bird.y,bird.r,0,Math.PI*2);
    ctx.fillStyle = bird.color;
    ctx.fill();
    
    ctx.closePath();
}

function restart()
{
    alert("Yandın!");
    location.reload();
}

function flyAnimation()
{
    if(animation)
    {
        bird.y -= bird.speed;

        animationCounter++;
        if(animationCounter > bird.animationTime)
        {
            animation = false;
            animationCounter = 0;
        }
    }
}

function checkKey(e) 
{    
    e = e || window.event;

    if (e.keyCode == '27')
    {
        alert("Esc' ye Basınca Oyun Durmuyor Gerizekalı");
    }
    else if (e.keyCode == '32')
    {
        animation = true;        
    }
}

function getRandomInt(min, max) 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
