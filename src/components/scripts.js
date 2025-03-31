// document.addEventListener("DOMContentLoaded", function () {
//     // Get elements from Registration Page
//     const firstName = document.querySelector("input[name='firstname']");
//     const lastName = document.querySelector("input[name='lastname']");
//     const password = document.querySelector("input[name='password']");
//     const confirmPassword = document.querySelector("input[name='confirmpassword']");
//     const registerForm = document.querySelector("form");

//     // Event 1: First & Last Name Validation (First letter uppercase, no special chars)
//     function validateName(input) {
//         const nameRegex = /^[A-Z][a-z]*$/;
//         if (!nameRegex.test(input.value)) {
//             input.style.border = "2px solid red";
//         } else {
//             input.style.border = "2px solid green";
//         }
//     }

//     firstName.addEventListener("input", function () {
//         validateName(firstName);
//     });

//     lastName.addEventListener("input", function () {
//         validateName(lastName);
//     });

//     // Event 2: Password Validation (Strength + Match Check)
//     function validatePassword() {
//         const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        
//         if (!strongPassword.test(password.value)) {
//             password.style.border = "2px solid red";
//         } else {
//             password.style.border = "2px solid green";
//         }

//         if (confirmPassword.value !== "" && confirmPassword.value !== password.value) {
//             confirmPassword.style.border = "2px solid red";
//         } else {
//             confirmPassword.style.border = "2px solid green";
//         }
//     }

//     password.addEventListener("input", validatePassword);
//     confirmPassword.addEventListener("input", validatePassword);

//     // Event 3: Homepage "Download Now" Button Click
//     document.addEventListener("DOMContentLoaded", function () {
//         const downloadButton = document.querySelector(".downloadbutton");
    
//         if (downloadButton) {
//             downloadButton.addEventListener("click", function (event) {
//                 alert("Download started!");
//             });
//         }
//     });
    

//     // Event 3: Navbar Hover Effect
//     const navLinks = document.querySelectorAll(".topnav a");
//     navLinks.forEach(link => {
//         link.addEventListener("mouseenter", function () {
//             this.style.color = "#ff5733"; // Change to any highlight color
//         });
//         link.addEventListener("mouseleave", function () {
//             this.style.color = ""; // Reset color
//         });
//     });

//     // Event 4: Enter Key Submission
//     const emailField = document.querySelector("input[name='email']");
//     const passwordField = document.querySelector("input[name='password']");
//     const loginForm = document.querySelector(".logincontainer form");

   

//     if (passwordField && loginForm) {
//         passwordField.addEventListener("keypress", function (event) {
//             if (event.key === "Enter") {
//                 event.preventDefault();
//                 loginForm.submit();
//             }
//         });
//     }
// });

// Validate name (First letter uppercase, no special chars)
export const validateName = name => /^[A-Z][a-z]*$/.test(name);

export const validatePassword = password =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

export const doPasswordsMatch = (password, confirmPassword) => password === confirmPassword;

export const handleNameChange = (event, setFormData, setErrors) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({
        ...prev,
        [name]: validateName(value) ? "" : "First letter must be uppercase, no special characters allowed."
    }));
};

export const handlePasswordChange = (event, setFormData, setErrors) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    setErrors(prev => ({
        ...prev,
        password: name === "password" && !validatePassword(value)
            ? "Password must be 8+ chars, include a number, uppercase, and special character."
            : "",
        confirmpassword: name === "confirmpassword" && !doPasswordsMatch(prev.password, value)
            ? "Passwords do not match."
            : prev.confirmpassword
    }));
};

export const handleNavHover = (event, color) => event.target.style.color = color;

export const handleDownloadClick = () => alert("Download started!");

export const handleKeyPress = (event, loginFunction) => {
    if (event.key === "Enter") {
        event.preventDefault();
        loginFunction();
    }
};
