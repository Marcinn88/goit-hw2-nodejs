const mongoose = require('mongoose');
require('dotenv').config();

const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contactsrouter')
const app = express()
const contactRoutes = require('./routes/api/contactsrouter')

const PORT = process.env.PORT || 4000;

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'



const connection = mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(contactRoutes);

connection.then(()=>{
  console.log("Database connection succesfull.")
  app.listen(PORT, () => {
      console.log(`App listen on port ${PORT}`)
  });
}).catch((err)=>{
console.log(`Error while estabsishing connections: [${err}]`)
process.exit(1)
});


app.get("")
app.use(logger(formatsLogger))
app.use(cors())
// app.use(express.json())

// app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
