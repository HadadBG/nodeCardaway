require('dotenv').config()
const app = require('./server');

// Server is listening
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
