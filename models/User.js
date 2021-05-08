const mongoose = require("mongoose")

//*por convención, los modelos empiezan su nombre con mayúscula
//*mongoose usa schemas, que son el modelo base de como se deberia ver un User, en este caso

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  category: Number,
  isActive: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', UserSchema)
