// this is global now
// console.log(window.EventEmitter);

// console.log(window.EventEmitter.emit);

// console.log(window.EventEmitter.on);

// class whiteboard extends EventEmitter {
//     constructor () {
//         super();
//     }
// }

const whiteboard = new EventEmitter;

(function () {

    // Ultimately, the color of our stroke;
    let color;

    // The color selection elements on the DOM.
    let colorElements = [].slice.call(document.querySelectorAll('.marker'));

    colorElements.forEach( (el) => {

        // Set the background color of this element
        // to its id (purple, red, blue, etc).
        el.style.backgroundColor = el.id;

        // Attach a click handler that will set our color variable to
        // the elements id, remove the selected class from all colors,
        // and then add the selected class to the clicked color.
        el.addEventListener('click', function () {
            color = this.id;
            document.querySelector('.selected').classList.remove('selected');
            this.classList.add('selected');
        });

    });

    const canvas = document.querySelector('#paint');
    const sketch = document.querySelector('#sketch');
    const sketchStyle = getComputedStyle(sketch);

    canvas.width = parseInt(sketchStyle.getPropertyValue('width'));
    canvas.height = parseInt(sketchStyle.getPropertyValue('height'));

    const ctx = canvas.getContext('2d');

    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    let currentMousePosition = {
        x: 0,
        y: 0
    };

    let lastMousePosition = {
        x: 0,
        y: 0
    };

    let drawing = false;

    canvas.addEventListener('mousedown', function (e) {
        drawing = true;
        currentMousePosition.x = e.pageX - this.offsetLeft;
        currentMousePosition.y = e.pageY - this.offsetTop;
    });

    canvas.addEventListener('mouseup',  () => {
        drawing = false;
    });

    canvas.addEventListener('mousemove', function (e) {

        if (!drawing) return;

        lastMousePosition.x = currentMousePosition.x;
        lastMousePosition.y = currentMousePosition.y;

        currentMousePosition.x = e.pageX - this.offsetLeft;
        currentMousePosition.y = e.pageY - this.offsetTop;

        whiteboard.draw(lastMousePosition, currentMousePosition, color, true);

    });

    whiteboard.draw = (start, end, strokeColor, shouldBroadcast)  => {

        // Draw the line between the start and end positions
        // that is colored with the given color.
        ctx.beginPath();
        ctx.strokeStyle = strokeColor || 'black';
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.closePath();
        ctx.stroke();

        // If shouldBroadcast is truthy, we will emit a draw event to listeners
        // with the start, end and color data.
        if (shouldBroadcast) {
            // this event we emit is caught by the whiteboard object in app.js
            whiteboard.emit('draw', start, end, strokeColor);
        }

    };

})();
