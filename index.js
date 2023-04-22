const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.json([
    {
      "id": "1",
      "title": "This is my First Blog Title"
    },
    {
      "id": "2",
      "title": "This is my Second Blog Title"
    },
    {
      "id": "3",
      "title": "This is my Third Blog Title"
    },
    {
      "id": "4",
      "title": "This is my Fourth Blog Title"
    },
    {
      "id": "5",
      "title": "This is my Fifth Blog Title"
    },
    {
      "envName": process.env.ENV_NAME
    },
    {
      "envName": process.env.env_name
    }
  ])
})

app.listen(3000, () => {
  console.log("env-name: "+process.env.env_name);
  console.log('Server running on port 3000')
})