// SELEÇÃO DE ELEMENTOS
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");
const generatedPasswordText = document.querySelector("#generated-password-text");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirmpassword");
const submitButton = document.querySelector("#submit-button");
const passwordStrengthIndicator = document.querySelector("#password-strength-indicator");
const passwordStrengthText = document.querySelector("#password-strength-text");

// FUNÇÕES
const getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
    return Math.floor(Math.random() * 10).toString();
};

const getSymbol = () => {
    const symbols = "(){}[]=,.<>/!@#$%*";
    return symbols[Math.floor(Math.random() * symbols.length)];
};

const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
};


const updateStrengthIndicator = (indicator, text, strength) => {
    const levels = ['', 'Muito Fraca', 'Fraca', 'Média', 'Forte', 'Muito Forte'];
    
    indicator.className = `strength-indicator strength-${strength}`;
    text.textContent = levels[strength];
};


const validatePasswords = () => {
    if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordInput.setCustomValidity("As senhas não coincidem");
    } else {
        confirmPasswordInput.setCustomValidity("");
    }
};




const generatePassword = () => {
    const passwordLength = 10;
    const generators = [
        getLetterLowerCase,
        getLetterUpperCase,
        getNumber,
        getSymbol
    ];

    let password = '';

    
    password += getLetterLowerCase();
    password += getLetterUpperCase();
    password += getNumber();
    password += getSymbol();

    
    while (password.length < passwordLength) {
        const randomGenerator = generators[Math.floor(Math.random() * generators.length)];
        password += randomGenerator();
    }

    
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    
    password = password.slice(0, passwordLength);

    
    generatedPasswordElement.style.display = "block";
    generatedPasswordElement.querySelector("h4").innerText = password;
};

// EVENTOS
generatePasswordButton.addEventListener("click", generatePassword);
passwordInput.addEventListener("input", function () {
    const password = this.value;
    const strength = calculatePasswordStrength(password);
    updateStrengthIndicator(passwordStrengthIndicator, passwordStrengthText, strength);
});

confirmPasswordInput.addEventListener("input", validatePasswords);
passwordInput.addEventListener("input", validatePasswords);