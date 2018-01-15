var videoInput = document.getElementById('inputVideo');

var ctracker = new clm.tracker();
ctracker.init();
ctracker.start(videoInput);

var canvasInput = document.getElementById('overlay');
var cc = canvasInput.getContext('2d');
function drawLoop() {
    var currentHatDiv = document.getElementsByClassName('hat-item-active')[0];
    var currentHatImg = currentHatDiv.childNodes[0];
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

function positionLoop() {
    requestAnimationFrame(positionLoop);

}
positionLoop();

function takePhoto() {
    var dataURI = canvasInput.toDataURL('image/jpeg');
    var w=window.open('about:blank','image from canvas');
    w.document.write("<img src='"+dataURI+"' alt='from canvas'/>");
    window.open(c.toDataURL('image/png'));
}