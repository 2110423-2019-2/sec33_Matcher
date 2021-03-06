export const PHOTO_CATEGORIES = ['GRADUATION', 'WEDDING', 'EVENT', 'PRODUCT', 'PLACE', 'RESTAURANT'];
export const dummyTasks = [
    {
        title: 'Poom',
        location: 'Siam Paragon',
        price: 20,
        image: 'https://picsum.photos/200/300',
        photoStyle: 'WEDDING',
    },
    {
        title: 'Poom',
        location: 'Siam Paragon',
        price: 20,
        image: 'https://picsum.photos/200/300',
        photoStyle: 'WEDDING',
    },
    {
        title: 'Poom',
        location: 'Siam Paragon',
        price: 20,
        image: 'https://picsum.photos/200/300',
        photoStyle: 'WEDDING',
    },
    {
        title: 'Poom',
        location: 'Siam Paragon',
        price: 20,
        image: 'https://picsum.photos/200/300',
        photoStyle: 'WEDDING',
    },
    {
        title: 'Poom',
        location: 'Siam Paragon',
        price: 20,
        image: 'https://picsum.photos/200/300',
        photoStyle: 'Weddin',
    },
];

export const apiEndpoint = process.env.NODE_ENV === 'production' ?
  "http://34.87.169.228/api" : // For production
  "http://localhost:8080" // For dev
export const apiEndpointOf = (path: string) => `${apiEndpoint}${path}`; 
