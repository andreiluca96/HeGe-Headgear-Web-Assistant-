var lowerBound = 0;
var upperBound = 8;
var currentActiveHatIndex = -1;

function getUserData() {
    var localStorageData = localStorage.getItem('saveData');
    var jsonData = JSON.parse(localStorageData);
    return jsonData;
}

fetchHatsFunction = function(move) {
    var userData = getUserData();
    var photosPath = "../img/";
    if(userData!=null)
    {
        photosPath = photosPath.concat(userData.category).concat('/')

    }
    var width = window.innerWidth;
    var height = window.innerHeight;

    numberOfHatsToShow = Math.round((width - 100) / 150);

    if (numberOfHatsToShow % 2 == 0) {
        numberOfHatsToShow--;
    }

    if (currentActiveHatIndex == -1) {
        currentActiveHatIndex = Math.round(upperBound / 2) - 1;
    }

    hatItems = document.getElementsByClassName('hat-items')[0];

    hatItems.innerHTML = '';

    for (var i = 0; i < numberOfHatsToShow; i++) {
        var hatItemDiv = document.createElement('div');
        hatItemDiv.className = "hat-item";

        if (i == Math.round(numberOfHatsToShow / 2) - 1) {
            hatItemDiv.className += " hat-item-active";
        }

        if (move == -1) {
            hatItemDiv.className += " hat-item-left-animation";
        }
        if (move == 1) {
            hatItemDiv.className += " hat-item-right-animation";
        }

        var hatImage = document.createElement("img");
        hatImage.className = "hat-image";

        if (currentActiveHatIndex - Math.round(numberOfHatsToShow / 2) + i + 2 <= lowerBound) {
            hatItemDiv.className += " hat-item-hidden";
        } else {
            if (currentActiveHatIndex - Math.round(numberOfHatsToShow / 2) + i + 2 > upperBound) {
                hatItemDiv.className += " hat-item-hidden";
            } else {
                hatImage.setAttribute('src', photosPath.concat().concat(currentActiveHatIndex - Math.round(numberOfHatsToShow / 2) + i + 2).concat(".png"));
                hatItemDiv.setAttribute('onClick', 'changeCurrentHatItem(this)');
            }
        }

        hatItemDiv.appendChild(hatImage);

        hatItems.appendChild(hatItemDiv);
    }
};
moveLeft = function() {
    startArrow = document.getElementsByClassName('start-arrow')[0];
    startArrow.className = 'start-arrow';
    startArrow.className += ' start-arrow-active';

    if (currentActiveHatIndex - 1 >= lowerBound) {
        currentActiveHatIndex--;
        fetchHatsFunction(-1)
    }
};

moveRight = function() {
    endArrow = document.getElementsByClassName('end-arrow')[0];
    endArrow.className = 'end-arrow';
    endArrow.className += ' end-arrow-active';
    if (currentActiveHatIndex + 2 <= upperBound) {
        currentActiveHatIndex ++;
        fetchHatsFunction(1)
    }
};

changeCurrentHatItem = function(element) {
    imgElement = element.childNodes[0];
    startingFileNameIndex = imgElement.getAttribute('src').lastIndexOf('/');
    extensionFileNameIndex = imgElement.getAttribute('src').lastIndexOf('.');

    move = 0;

    if (currentActiveHatIndex <= imgElement.getAttribute('src').substr(startingFileNameIndex + 1, extensionFileNameIndex - 7)) {
        move = 1;
    }
    if (currentActiveHatIndex > imgElement.getAttribute('src').substr(startingFileNameIndex + 1, extensionFileNameIndex - 7)) {
        move = -1;
    }

    currentActiveHatIndex = imgElement.getAttribute('src').substr(startingFileNameIndex + 1, extensionFileNameIndex - 7);
    currentActiveHatIndex--;
    fetchHatsFunction(move);
};

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        moveLeft();
    }
    else if(event.keyCode == 39) {
        moveRight();
    }
});

fetchHatsFunction(0);


window.onresize = fetchHatsFunction;