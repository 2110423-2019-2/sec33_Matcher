# fastphoto Backend

## Getting Started

### TL;DR
Firstly, create `.env` file in `src` directory with the content below. 
```
PORT=8080
DB_HOST=db
DB_NAME=fastphoto
SESSION_SECRET=keyboardcat
```

You may add one more line if you use URI to connect a database:
```
DB_CONNECTION_URI=mongodb+srv://<username>:<password>@matcher-cluster-grj4g.mongodb.net/test?retryWrites=true&w=majority
```

You can also disable cors by putting `DISABLE_CORS=1`.

Then run following command.
```
cd Backend
npm install
docker-compose up 
# or "npm run dev" if you use cloud db.
```

The server is running on port 8080.

### Prerequisites
- Node.js

## Testing
We use Mocha for testing. All test files are in `src/__tests__`.
```
npm test
```

## Formatting Code
Please prettify your code before commit changes.
```
npm run format
```

## API Documentation
Goto `/api-docs` to see and try our APIs.