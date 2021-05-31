const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w\w+)+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const nameRegex = /^[a-zA-Z_ \-]{8,}$/;

export {
    emailRegex,
    passwordRegex,
    nameRegex
}