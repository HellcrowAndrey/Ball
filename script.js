var canvas = document.getElementById('can');
var ctx = canvas.getContext('2d');
var balls = [];
setInterval("drawFrame()", 20);

function Ball(x, y)
{
    this.x = x;
    this.y = y;
    this.dx = Math.random() * (10) - 5;
    this.dy = Math.random() * (10) - 5;
    this.r = 30;
    var colors = ["green", "blue", "red", "yellow", "#756391", "orange", "brown", "#09a4d1", "pink"];
    var random = Math.floor(Math.random() * colors.length);
    this.fillColor = colors[random];
}

Ball.prototype.draw = function ()
{
    ctx.beginPath();
    ctx.fillStyle = this.fillColor;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
}

Ball.prototype.move = function ()
{
    if (this.x - this.r <= 0)
        this.dx = -this.dx;
    if (this.x + this.r >= canvas.width)
        this.dx = -this.dx;
    if (this.y - this.r <= 0)
        this.dy = -this.dy;
    if (this.y + this.r >= canvas.height)
        this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;
}

function mousePresed()
{
    canvas.onmousedown = function (e)
    {
        var b = new Ball(e.clientX, e.clientY);
        balls.push(b);
    }
}

mousePresed();

function drawFrame()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < balls.length; i++)
    {
        var ball = balls[i];
        var x = ball.x;
        var y = ball.y;
        var r = ball.r;
        ball.draw();
        ball.move();
		console.log(ball);
		
        for (var j = 0; j < balls.length; j++)
        {
            var ball1 = balls[j];
            var x1 = ball1.x;
            var y1 = ball1.y;
            var r1 = ball1.r;

            if (ball == ball1)
                continue;

            var d = Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));
            if (d <= r1 + r)
            {
                changeWay(x, y, x1, y1, ball, ball1);
            }
        }
    }
}

function changeWay(x, y, x1, y1, ball, ball1)
{
    if (x > x1)
    {
        var dx = (x - x1) / 2;
        ball.dx = -dx;
        ball1.dx = dx;
        ball.move();
        ball1.move();
    }
    else if (x < x1)
    {
        var dx = (x1 - x) / 2;
        ball.dx = dx;
        ball1.dx = -dx;
        ball.move();
        ball1.move();
    }
    if (y > y1)
    {
        var dy = (y - y1) / 2;
        ball.dy = -dy;
        ball1.dy = dy;
        ball.move();
        ball1.move();
    }
    else if (y < y1)
    {
        var dy = (y1 - y) / 2;
        ball.dy = dy;
        ball1.dy = -dy;
        ball.move();
        ball1.move();
    }
}

function ff()
{
	for(var i = 0; i < balls.length; i++)
	{
		var ss = balls[i];
		console.log(ss);
	}
}
ff();
