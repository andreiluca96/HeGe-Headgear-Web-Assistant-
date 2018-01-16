saveUserData = function() {
    username = document.getElementById('username').value;
    category = document.getElementById('category').value;

    if (username == undefined || category == undefined) {
        return;
    }

    data = {
        'username': username,
        'category': category,
    };

    localStorage.saveData = JSON.stringify(data);
};

function deleteUserData() {
    localStorage.clear();
}