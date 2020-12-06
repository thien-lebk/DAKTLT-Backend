const mongoose = require("mongoose");
// console.log(process.env.MONGODB_URL);
//
mongoose.connect('mongodb+srv://cnpmnc:cnpmnc@vincent.nbybn.mongodb.net/daktlt?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
console.log("success");