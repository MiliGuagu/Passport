const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on localhost:${port}/`));

// npm install passport passport-google-oauth20 dotenv cookie-session --save