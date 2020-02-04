const bcrypt = require('bcryptjs');

const saltRounds = 10;

const generateHash = async (password) => {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('hash = ',hash);
    return hash;
};

export {generateHash}