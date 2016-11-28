let canvas = () => document.getElementById('icanvas')
let canvasContext = (canvas) => canvas.getContext('2d')
let image = () => new Image();
let fileReader = () => new FileReader()

let handleFileSelect = (evt) => renderImage(evt.target.files[0], fileReader(), image(), canvasContext(canvas()), canvas())

document.getElementById('ifoto').addEventListener('change', handleFileSelect, false);

let renderImage = (file, fileReader, image, context, canvas) => {
    fileReader.onload = function(event) {
        image.src = event.target.result;
        image.onload = function() {
            context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height); 
        }
    }
    // when the file is read it triggers the onload event above.
    fileReader.readAsDataURL(file);
}

let clearCanvas = (canvas) => {
    canvasContext(canvas).save();

    // Use the identity matrix while clearing the canvas
    canvasContext(canvas).setTransform(1, 0, 0, 1, 0, 0);
    canvasContext(canvas).clearRect(0, 0, canvas.width, canvas.height);

    // Restore the transform
    canvasContext(canvas).restore();
}