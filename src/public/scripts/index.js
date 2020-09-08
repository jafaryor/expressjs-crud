/******************************************************************************
 *                          Fetch and display users
 ******************************************************************************/

displayUsers();


function displayUsers() {
    httpGet('/api/users/')
        .then(response => response.json())
        .then((response) => {
            var allUsers = response.users;
            // Empty the anchor
            var allUsersAnchor = document.getElementById('all-users-anchor');
            allUsersAnchor.innerHTML = '';
            // Append users to anchor
            allUsers.forEach((user) => {
                allUsersAnchor.innerHTML += getUserDisplayEle(user);
            });
        });
};


function getUserDisplayEle(user) {
    return `<div class="user-display-ele">
        <div class="normal-view">
            <div>Name: ${user.login}</div>
            <div>Password: ${user.password}</div>
            <div>Age: ${user.age}</div>
            <div>Deleted: ${user.isDeleted}</div>

            <button class="edit-user-btn" data-user-id="${user.id}">
                Edit
            </button>
            <button class="delete-user-btn" data-user-id="${user.id}">
                Delete
            </button>
        </div>
        
        <div class="edit-view">
            <div>
                Login: <input class="login-edit-input" value="${user.login}">
            </div>
            <div>
                Password: <input class="password-edit-input" value="${user.password}">
            </div>
            <div>
                Age: <input class="age-edit-input" type="number" value="${user.age}">
            </div>
            <div>
                <label for="${user.id}">Deleted: </label>
                <input id="${user.id}"
                       class="is-deleted-edit-input"
                       type="checkbox"
                       value="${user.isDeleted ? 'on' : 'off'}"
                       ${user.isDeleted ? 'checked' : ''}>
            </div>

            <button class="submit-edit-btn" data-user-id="${user.id}">
                Submit
            </button>
            <button class="cancel-edit-btn" data-user-id="${user.id}">
                Cancel
            </button>
        </div>
    </div>`;
}


/******************************************************************************
 *                        Add, Edit, and Delete Users
 ******************************************************************************/

document.addEventListener('click', function (event) {
    event.preventDefault();

    var ele = event.target;

    if (ele.matches('#add-user-btn')) {
        addUser();
    } else if (ele.matches('.edit-user-btn')) {
        showEditView(ele.parentNode.parentNode);
    } else if (ele.matches('.cancel-edit-btn')) {
        cancelEdit(ele.parentNode.parentNode);
    } else if (ele.matches('.submit-edit-btn')) {
        submitEdit(ele);
    } else if (ele.matches('.delete-user-btn')) {
        deleteUser(ele);
    } else if (ele.matches('.is-deleted-edit-input')) {
        updateCheckbox(ele);
    }
}, false);


function addUser() {
    var login = document.getElementById('login');
    var password = document.getElementById('password');
    var age = document.getElementById('age');
    var data = {
        user: {
            login: login.value,
            password: password.value,
            age: age.value,
            isDeleted: false
        },
    };

    httpPost('/api/users/', data)
        .then(() => {
            displayUsers();
        })
}


function showEditView(userEle) {
    var normalView = userEle.getElementsByClassName('normal-view')[0];
    var editView = userEle.getElementsByClassName('edit-view')[0];

    normalView.style.display = 'none';
    editView.style.display = 'block';
}


function cancelEdit(userEle) {
    var normalView = userEle.getElementsByClassName('normal-view')[0];
    var editView = userEle.getElementsByClassName('edit-view')[0];

    normalView.style.display = 'block';
    editView.style.display = 'none';
}


function submitEdit(ele) {
    var userEle = ele.parentNode.parentNode;
    var login = userEle.getElementsByClassName('login-edit-input')[0];
    var password = userEle.getElementsByClassName('password-edit-input')[0];
    var age = userEle.getElementsByClassName('age-edit-input')[0];
    var isDeleted = userEle.getElementsByClassName('is-deleted-edit-input')[0];
    var id = ele.getAttribute('data-user-id');
    var data = {
        user: {
            login: login.value,
            password: password.value,
            age: age.value,
            isDeleted: isDeleted.value === 'on',
            id: id
        }
    };

	httpPut('/api/users/', data)
        .then(() => {
            displayUsers();
        })
}


function updateCheckbox(ele) {
    var parent = ele.parentElement;

    parent.innerHTML = `
        <label for="${ele.id}">Deleted: </label>
        <input id="${ele.id}"
            class="is-deleted-edit-input"
            type="checkbox"
            value="${ele.checked ? 'on' : 'off'}"
            ${ele.checked ? 'checked' : ''}>
    `;
}


function deleteUser(ele) {
    var id = ele.getAttribute('data-user-id');

	httpDelete('/api/users/' + id)
        .then(() => {
            displayUsers();
        })
}


function httpGet(path) {
    return fetch(path, getOptions('GET'))
}


function httpPost(path, data) {
    return fetch(path, getOptions('POST', data));
}


function httpPut(path, data) {
    return fetch(path, getOptions('PUT', data));
}


function httpDelete(path) {
    return fetch(path, getOptions('DELETE'));
}


function getOptions(verb, data) {
    var options = {
        dataType: 'json',
        method: verb,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    return options;
}

