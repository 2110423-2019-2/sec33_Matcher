export const PHOTO_CATEGORIES = ['graduation', 'WEDDING', 'event', 'product', 'place', 'café & restaurant'];
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
  "https://fast-photo-api-oxq6326c3a-de.a.run.app" : // For production
  "http://localhost:8080" // For dev
export const apiEndpointOf = (path: string) => `${apiEndpoint}${path}`; 
