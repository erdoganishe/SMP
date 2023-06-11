document.addEventListener('DOMContentLoaded', function () {
    // const emails = [
    //     'example1@gmail.com',
    //     'example2@gmail.com',
    //     'example3@gmail.com',
    //     'example4@gmail.com',
    //     'example5@gmail.com',
    //     'example6@gmail.com',
    //     'example7@gmail.com',
    //     'example8@gmail.com',
    //     'example9@gmail.com',
    //     'example10@gmail.com',
    //     'example11@gmail.com',
    //     'example12@gmail.com',
    //     'example13@gmail.com',
    //     'example14@gmail.com',
    //     'example15@gmail.com',
    //     'example16@gmail.com',
    //     'example17@gmail.com',
    //     'example18@gmail.com',
    //     'example19@gmail.com',
    //     'example20@gmail.com'
    // ];

    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.style.color = 'black';
        });
    });

    document.querySelector('#register-btn').addEventListener('click', () => {
        // const email = document.querySelector('#email').value;
        // const password = document.querySelector('#password').value;
        // const confirmPassword = document.querySelector('#confirm-password').value;
        // function isValidEmail(email) {
        //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        //     return emailRegex.test(email);
        // }
        // if (password === confirmPassword && !emails.includes(email) && isValidEmail(email)) {
        //     console.log(email, " ", password, " ", confirmPassword, " ", isVisible);
        // }
        // else {
        //     console.log("false");
        // }
    });

    // chack boxes
    const anyoneCheckbox = document.getElementById("check-writer");
    const nooneCheckbox = document.getElementById("check-reader");
    let isVisible = false;
    if (isVisible) {
        anyoneCheckbox.checked = true;
    } else {
        nooneCheckbox.checked = true;
    }
    anyoneCheckbox.addEventListener("change", () => {
        nooneCheckbox.checked = !anyoneCheckbox.checked;
        isVisible = anyoneCheckbox.checked;
        console.log(isVisible);
    });

    nooneCheckbox.addEventListener("change", () => {
        anyoneCheckbox.checked = !nooneCheckbox.checked;
        isVisible = !nooneCheckbox.checked;
        console.log(isVisible);
    });

    // register method
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordConInput = document.getElementById('password');
    const registrButton = document.getElementById('register-btn');

    registrButton.addEventListener('click', async () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        const passwordCon = passwordConInput.value;
        if(password != passwordCon) {
            console.log("Passwords are not matched!");
            alert("Passwords are not matched!");
        } else {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'user': email, 'pwd': password, 'roles': isVisible })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                //localStorage.setItem('accessToken', data.accessToken);
                window.location.href = '/regpage/login';
            } else {
                alert(data.message ?? "Error. Try again later");
            }
        }
    });
});