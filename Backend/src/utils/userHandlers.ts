const bcrypt = require('bcrypt');

const saltRounds = 10;

const generateHash = (password) => {
    bcrypt.hash(password, saltRounds).then(function(hash) {
        console.log("hash: " + hash);
        return hash;
    });
};

export {generateHash}