const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const validate = require('./routes/validate');

mongoose
.connect("mongodb+srv://oyasumimizi:blackpink@cluster0.tazvv.mongodb.net/Cluster0?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('Connected to MongoDB...'))
 .catch((err) => console.log(`Could not connect to MongoDB. ERROR: ${err}`));

app.use(cors());
app.use(express.json());
app.use('/api/comments', validate);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
