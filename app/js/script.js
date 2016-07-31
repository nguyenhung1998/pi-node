$(function () {
  var socket = io.connect(),
    ui = {
      up: $('.btn-up'),
      left: $('.btn-left'),
      down: $('.btn-down'),
      right: $('.btn-right'),
      all: $('.btn')
    },
    activeClass = 'is-active',
    isPressed = false;

	
  document.getElementById('forward').addEventListener("onmousedown", socket.emit('start'));
  document.getElementById('right').addEventListener("onmousedown", socket.emit('right'));
  document.getElementById('left').addEventListener("onmousedown", socket.emit('left'));
  document.getElementById('reverse').addEventListener("onmousedown", socket.emit('reverse'));
  document.getElementById()
  //listen for key presses
  $(document).keydown(function(e){
    //don't do anything if there's already a key pressed
    if(isPressed) return;

    isPressed = true;
    switch(e.which){
      case 87:
        socket.emit('start');
        ui.up.addClass(activeClass);
        break;
      case 65:
        socket.emit('left');
        ui.left.addClass(activeClass);
        break;
      case 83:
        socket.emit('reverse');
        ui.down.addClass(activeClass);
        break;
      case 68:
        socket.emit('right');
        ui.right.addClass(activeClass);
        break;
    }
  });
  
  //stop all motors when any key is released
  $(document).keyup(function(e){
    ui.all.removeClass(activeClass);
    socket.emit('stop');
    isPressed = false;
  });
});
