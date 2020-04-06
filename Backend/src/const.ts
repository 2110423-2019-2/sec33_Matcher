export const SALT_ROUNDS = 10;

export enum Role {
    CUSTOMER = 'customer',
    PHOTOGRAPHER = 'photographer',
    ADMIN = 'admin',
}

export enum PhotoStyles {
    PRODUCT = 'PRODUCT',
    GRADUATION = 'GRADUATION',
    PLACE = 'PLACE',
    WEDDING = 'WEDDING',
    RESTAURANT = 'RESTAURANT',
    EVENT = 'EVENT',
}

export const photoStyles: Array<string> = [
    PhotoStyles.GRADUATION,
    PhotoStyles.PRODUCT,
    PhotoStyles.PLACE,
    PhotoStyles.WEDDING,
    PhotoStyles.RESTAURANT,
    PhotoStyles.EVENT,
];

export enum TaskStatus {
    AVAILABLE = 'AVAILABLE',
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REQ_FIN = 'REQ_FIN',
    FINISHED = 'FINISHED',
}
