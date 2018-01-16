saveUserData = function() {
    username = document.getElementById('username').value;
    age = document.getElementById('age').value;
    country = document.getElementById('country').value;
    male = document.getElementById('m-option').checked;
    female = document.getElementById('f-option').checked;


    if (male == true) {
        sex = 1;
    }

    if (female == true) {
        sex = 2;
    }

    if (username == undefined || age == undefined || country == undefined || sex == undefined) {
        return;
    }

    data = {
        'username': username,
        'age': age,
        'country': country,
        'sex': sex
    };

    localStorage.saveData = JSON.stringify(data);
}
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
        photosPath = photosPath.concat(userData.country).concat('/')

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