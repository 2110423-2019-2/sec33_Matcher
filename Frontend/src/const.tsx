export const PHOTO_CATEGORIES = [
  "graduation",
  "wedding",
  "event",
  "product",
  "place",
  "café & restaurant"
];
export const dummyTasks = [
  {
    username: "Poom",
    location: "Siam Paragon",
    price: 20,
    img: "https://picsum.photos/200/300",
    photoStyle: 'wedding'
  },
  {
    username: "Poom",
    location: "Siam Paragon",
    price: 20,
    img: "https://picsum.photos/200/300",
    photoStyle: 'wedding'
  },
  {
    username: "Poom",
    location: "Siam Paragon",
    price: 20,
    img: "https://picsum.photos/200/300",
    photoStyle: 'wedding'
  },
  {
    username: "Poom",
    location: "Siam Paragon",
    price: 20,
    img: "https://picsum.photos/200/300",
    photoStyle: 'wedding'
  },
  {
    username: "Poom",
    location: "Siam Paragon",
    price: 20,
    img: "https://picsum.photos/200/300",
    photoStyle: 'Weddin'
  }
];

export const apiEndpoint = 'https://localhost:8080';
export const apiEndpointOf = (path: string) => `${apiEndpoint}${path}`;
export const CONSOLE_CHOICES = ["Edit profile", "Your tasks", "Delete Account", "Sign out"];