import bcrypt from 'bcryptjs';

const saltRounds = 10;

const generateHash = async (password: string): Promise<string> => {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
};

export { generateHash };
