const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const usersRouter = require('./routes/users')

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

//middlewares
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("home");
});
//*middleware para todas las rutas que vengan de este archivo. Acordémonos que podríamos tener varios!
app.use('/users', usersRouter)

//db
//*traigo la url por el env, y el segundo parámetro lo tengo en el connect mismo del cluster! sin esos parametros tira warning
mongoose.connect(
  process.env.MONGO_URI,
  { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
  },
  () => console.log("conectado a mongo Atlas")
);

//server
app.listen(PORT, () =>
  console.log(`Server running on http://www.localhost:${PORT}`)
);
