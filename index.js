const mongoose = require('mongoose');

mongoose
.connect("mongodb+srv://oyasumimizi:blackpink@cluster0.tazvv.mongodb.net/Cluster0?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('Connected to MongoDB...'))
 .catch((err) => console.log(`Could not connect to MongoDB. ERROR: ${err}`));
