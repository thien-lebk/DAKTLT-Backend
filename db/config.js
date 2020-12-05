const mongoose = require("mongoose");
// console.log(process.env.MONGODB_URL);
mongoose.connect('mongodb+srv://thienle:thienlebk@cluster0.y2b5c.mongodb.net/secman_test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
