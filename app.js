const mongoose = require('mongoose');
const createError = require('http-errors')
require('dotenv').config();
const fs = require('node:fs').promises;

const express = require('express')
const logger = require('morgan')
const cors = require('cors')


const app = express()
const contactRoutes = require('./routes/api/contactsrouter')
const authRoutes = require('./routes/api/authroutes')
const uploadRoutes = require('./routes/api/uploadroutes')
const config = require('./config/config')

const PORT = process.env.PORT || 4100;

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'



const connection = mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
require('./config/passport')

app.use(contactRoutes, uploadRoutes);
app.use("/users", authRoutes);

const isAccessible = async path => {
  try {
    await fs
      .access(path);
    return true;
  } catch {
    return false;
  }
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder, {
      recursive: true
    });
  }
}

app.use((req, res, next) =>{
  next(createError(404));
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message:err.message,
    status: err.status
  })
})

connection.then(()=>{
  console.log("Database connection succesfull.")
  app.listen(PORT, async () => {
    createFolderIsNotExist(config.UPLOADS_PATH);
    createFolderIsNotExist(config.IMAGES_PATH);
    console.log(`Server running. Use our API on port: ${PORT}`)
  })

}).catch((err)=>{
console.log(`Error while estabsishing connections: [${err}]`)
process.exit(1)
});


app.get("")
app.use(logger(formatsLogger))
app.use(cors())
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
