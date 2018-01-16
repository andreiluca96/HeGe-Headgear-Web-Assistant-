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