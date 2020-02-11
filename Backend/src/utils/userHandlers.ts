import bcrypt from 'bcryptjs';
import { SALT_ROUNDS } from '../const';

const generateHash = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

export { generateHash };
