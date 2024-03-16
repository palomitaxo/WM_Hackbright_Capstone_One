function handleSubmit(evt) {
    evt.preventDefault();

    var name = document.getElementById('name').value;
    var message = document.getElementById('message').value;
    var heardHowElements = document.getElementsByName('heardHow');
    var heardHow = [];
    
    for (var i = 0; i < heardHowElements.length; i++) {
        if (heardHowElements[i].checked) {
            heardHow.push(heardHowElements[i].value);
        }
    }

    var formData = {
        name: name,
        message: message,
        heardHow: heardHow
    };

    axios.get('http://localhost:3000/api/saveFormData', formData)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.error(error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    let form = document.querySelector('#contact');
    form.addEventListener('submit', handleSubmit);
});

function checkPasswordStrength(password) {
    var minLength = 8;
    var hasUpperCase = /[A-Z]/.test(password);
    var hasLowerCase = /[a-z]/.test(password);
    var hasSymbol = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]/.test(password);
	
    return (password.length >= minLength && hasUpperCase && hasLowerCase && hasSymbol);
}

function addPasswordToList() {
    var websiteInput = document.getElementById('websiteInput');
    var passwordInput = document.getElementById('passwordInput');
    var passwordList = document.getElementById('passwordList');

    var website = websiteInput.value;
    var password = passwordInput.value;

    var isStrong = checkPasswordStrength(password);

    var passwordData = {
        website: website,
        password: password,
        isStrong: isStrong
    };

    axios.post('http://localhost:3000/api/savePassword', passwordData)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });

    var tableRow = document.createElement('tr');

    var websiteCell = document.createElement('td');
    var passwordCell = document.createElement('td');
    var strengthCell = document.createElement('td');
	var deleteCell = document.createElement('td');

    websiteCell.textContent = website;
    passwordCell.textContent = password;

    strengthCell.textContent = isStrong ? "Strong Password" : "Weak Password";

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
	deleteButton.className = 'deleteButton';
    deleteButton.addEventListener('click', function () {
        deletePassword(tableRow);
    });

    tableRow.appendChild(websiteCell);
    tableRow.appendChild(passwordCell);
    tableRow.appendChild(strengthCell);
    deleteCell.appendChild(deleteButton);
    tableRow.appendChild(deleteCell);

    passwordList.appendChild(tableRow);

    websiteInput.value = '';
    passwordInput.value = '';
}
	function deletePassword(row) {
   		 row.remove();
	}

function checkPasswordStrengthOnly(password) {
var password = document.getElementById('password').value;

var minLength = 8; 
var hasUpperCase = /[A-Z]/.test(password);
var hasLowerCase = /[a-z]/.test(password);
var hasSymbol = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]/.test(password);

if (password.length >= minLength && hasUpperCase && hasLowerCase && hasSymbol) { 
	document.getElementById('passwordStrength').innerText = "You're safe, you've got a good password!";
} else {
	document.getElementById('passwordStrength').innerText = "You better change your password, you might be vulnerable!";
}
}