## Local Development

Run `yarn` from root.

Run the following commands from different terminal tabs.

### Start Redis

Pre-req: install redis on your computer

```
cd packages/backend
yarn start:redis
```

### Start back end server

```
cd packages/backend
yarn start:dev
```

### Start front end app

```
cd packages/frontend
yarn start
```

## Production Deployment

### Front end

Push to frontend-prod will automatically kick off netlify build

### Back end

Manually deploy master branch from Heroku
