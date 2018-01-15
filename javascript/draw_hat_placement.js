document.getElementById('camera').style.display = "none";
document.getElementById('takePhoto').style.display="none";
var canvasInput = document.getElementById('overlay');

function prepareToTryHat() {
    document.getElementById('sketch').style.display = "none";
    document.getElementById('control-buttons').style.margin = "245px"
    document.getElementById('camera').style.display = "block";
    document.getElementById('tryHat').style.display="none";
    document.getElementById('takePhoto').style.display="block";
    openCamera(true);
}

function tryHat() {
    var hatItemDiv = document.createElement('div');
    hatItemDiv.className = "hat-item-active";
    var hatImage = document.createElement("img");
    hatImage.className = "hat-image";

    var dataURI = canvasInput.toDataURL('image/jpeg');
    hatImage.setAttribute('src', dataURI, );
    hatItemDiv.appendChild(hatImage);
    prepareToTryHat();
    placeDrawHat();
}

function takePhoto() {
    var dataURI = canvasInput.toDataURL('image/jpeg');
    var w=window.open('about:blank','image from canvas');
    w.document.write("<img src='"+dataURI+"' alt='from canvas'/>");
    window.open(c.toDataURL('image/png'));
}

var errorCallback = function(e) {
    console.log('Reeeejected!', e);
};

function openCamera(isCameraOpened){
    if(isCameraOpened)
    {
        navigator.getUserMedia({video: true}, function(localMediaStream) {
    var video = document.querySelector('video');
    video.src = window.URL.createObjectURL(localMediaStream);

    video.onloadedmetadata = function(e) {
    };
}, errorCallback);
    }
}

function placeDrawHat(isHatDrawe, elementId) {
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

function placeImgHat(isHatDrawe, elementId) {
var videoInput = document.getElementById('inputVideo');

var ctracker = new clm.tracker();
ctracker.init();
ctracker.start(videoInput);

var canvasInput = document.getElementById('overlay');
var cc = canvasInput.getContext('2d');
function drawLoop() {
    var currentHatImg = document.getElementById('loadedImg');
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

document.getElementById('files').addEventListener('change', handleFileSelect, false);

function handleFileSelect(evt) {
        var files = evt.target.files;
        var f = files[0];
        var reader = new FileReader();
         
          reader.onload = (function(theFile) {
                return function(e) {
                        var hatItemDiv = document.createElement('div');
                        hatItemDiv.className = "hat-item-active";
                        var hatImage = document.createElement("img");
                        hatImage.className = "hat-image";

                        var dataURI = canvasInput.toDataURL('image/jpeg');
                        hatImage.setAttribute('src', dataURI, );
                        hatItemDiv.appendChild(hatImage);

                        document.getElementById('list').innerHTML = ['<img id="loadedImg" src="', e.target.result,'" title="', theFile.name, 'width="320" height="240" />'].join('');
                    };
          })(f);
           
          reader.readAsDataURL(f);
          prepareToTryHat();
          placeImgHat();
}
