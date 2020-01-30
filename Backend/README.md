# fastphoto Backend

## Getting Started

### TL;DR
Firstly, create `.env` file in `src` directory with the content below. 
```
PORT=8080
DB_HOST=db
DB_NAME=fastphoto
DB_CONNECTION_URI=mongodb+srv://<username>:<password>@matcher-cluster-grj4g.mongodb.net/test?retryWrites=true&w=majority
```

Then run following command.
```
cd Backend
npm install
docker-compose up 
# or "npm run dev" if you don't want to use own db
```

The server is running on port 8080.

### Prerequisites
- Node.js

## Testing
We use Jest for testing. All test files are in `src/__tests__`.
```
npm test
```

## Formatting Code
Please prettify your code before commit changes.
```
npm run format
```
