const db = require('../models')
const seed = require('./index')

async function seedCategories() {
  await handleSeed(seed.getBaseCategory, db.Category)
}

const handleSeed = async (getBase, Model) => {
  const seeder = await getBase();
  await Model.deleteMany({});
  await Model.create([...seeder]);
}

module.exports = {
  seedCategories
}