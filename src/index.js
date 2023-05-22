const mongoose = require('mongoose')
const server = require("./server");
const config = require('./config/config');
const seeder = require('./db_seeder/seeder');

try {
  mongoose.connect(config.db.MONGO_URL);
  server.listen(config.app.PORT, async () => {
    // await seeder.seedCategories()
    console.log(`Running on ${config.db.URL}...`);
  });
} catch (error) {
  throw new Error();
}