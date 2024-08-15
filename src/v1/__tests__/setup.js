const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const { PrismaClient } = require("@prisma/client");

let mongoServer;
let prisma;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  prisma = new PrismaClient();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  await prisma.$disconnect();
});

module.exports = prisma;
