var express = require('express');
var app = express();
var io = require('socket.io')(app.listen(3000));
var five = require('johnny-five');

//Setting the path to static assets
app.use(express.static(__dirname + '/app'));

//Serving the static HTML file
app.get('/', function (res) {
    res.sendFile('/index.html')
});

var board = new five.Board({
    repl: false
});

board.on('ready', function () {
    var speed, commands, motors;
    motors = {
        a: new five.Motor([6, 7]),
        b: new five.Motor([5, 4])
    };

    commands = null;
    speed = 255;

    io.on('connection', function (socket) {
        socket.on('stop', function () {
            motors.a.stop();
            motors.b.stop();
        });

        socket.on('start', function () {
            speed = 255;
            motors.a.rev(speed);
            motors.b.fwd(speed);
        });

        socket.on('reverse', function () {
            speed = 255;
            motors.a.fwd(speed);
            motors.b.rev(speed);
        });

        socket.on('left', function () {
            var aSpeed = 50;
            var bSpeed = 50;
            motors.a.rev(aSpeed);
            motors.b.rev(bSpeed);
        });

        socket.on('right', function () {
            var aSpeed = 50;
            var bSpeed = 50;
            motors.a.fwd(aSpeed);
            motors.b.fwd(bSpeed);
        });
    });
});
