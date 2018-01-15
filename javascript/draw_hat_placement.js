document.getElementById('camera').style.display = "none";
function tryHat() {
    var hatItemDiv = document.createElement('div');
    hatItemDiv.className = "hat-item-active";
    var hatImage = document.createElement("img");
    hatImage.className = "hat-image";

    var canvasInput = document.getElementById('overlay');
    var dataURI = canvasInput.toDataURL('image/jpeg');
    hatImage.setAttribute('src', dataURI, );

    hatItemDiv.appendChild(hatImage);
    document.getElementById('sketch').style.display = "none";
    document.getElementById('control-buttons').style.margin = "245px"
    document.getElementById('camera').style.display = "block";
    openCamera(true);
    placeHat(true);
}

var errorCallback = function(e) {
    console.log('Reeeejected!', e);
};

// Not showing vendor prefixes.
function openCamera(isCameraOpened){
    if(isCameraOpened)
    {
        navigator.getUserMedia({video: true}, function(localMediaStream) {
    var video = document.querySelector('video');
    video.src = window.URL.createObjectURL(localMediaStream);

    // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
    // See crbug.com/110938.
    video.onloadedmetadata = function(e) {
      // Ready to go. Do some stuff.
    };
}, errorCallback);
    }
}

function placeHat(isHatDrawed) {
var videoInput = document.getElementById('inputVideo');

var ctracker = new clm.tracker();
ctracker.init();
ctracker.start(videoInput);

var canvasInput = document.getElementById('overlay');
var cc = canvasInput.getContext('2d');
function drawLoop() {
    var currentHatImg = document.getElementById('paint');
    requestAnimFrame(drawLoop);
    cc.clearRect(0, 0, 320, 240);
    if (ctracker.getCurrentPosition()) {
        var positions = ctracker.getCurrentPosition();
        cc.drawImage(videoInput, 0, 0, 320, 240);
        ctracker.draw(overlay);
        cc.drawImage(currentHatImg, positions[14][0] - (positions[0][0] - positions[14][0])*0.3, positions[0][1], (positions[0][0] - positions[14][0]) * 1.4, (positions[0][1] - positions[7][1]) * 1.3);
    }
}
drawLoop();
positionLoop();
}

function positionLoop() {
    requestAnimationFrame(positionLoop);

}