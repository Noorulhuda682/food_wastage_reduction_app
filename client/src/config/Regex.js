const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w\w+)+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const nameRegex = /^[a-zA-Z_ \-]{8,}$/;
const TextRegex = /^[a-zA-Z0-9_ \-]{2,}$/;
const NumberRegex = /^[0-9 \-]{1,}$/;
const codeRegex = /^[0-9 \-]{6,6}$/;

export {
    emailRegex,
    passwordRegex,
    nameRegex,
    TextRegex,
    NumberRegex,
    codeRegex
}