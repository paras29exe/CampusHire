export function generatePassword(length = 8) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const allChars = lowercase + uppercase + digits;

    if (length < 3) throw new Error('Password length must be at least 3');

    const getRandom = (chars) => chars[Math.floor(Math.random() * chars.length)];
    
    // Ensure at least one from each category
    let password = [
        getRandom(lowercase),
        getRandom(uppercase),
        getRandom(digits)
    ];

    // Fill the rest with random characters
    for (let i = 3; i < length; i++) {
        password.push(getRandom(allChars));
    }

    // Shuffle the result to mix guaranteed characters
    for (let i = password.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [password[i], password[j]] = [password[j], password[i]];
    }

    return password.join('');
}
