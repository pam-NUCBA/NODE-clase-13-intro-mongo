const express = require("express");
const router = express.Router();
const User = require("../models/User");

//*se acuerdan que usando el middleware no necesitábamos ponerle /users? ya desde app sabe dónde ir
//get all users
router.get("/", async (req, res) => {
  // res.send("users");

  //*una vez que con el post empezamos a agregar usuarios, podríamos usar esto para traer los user:
  try {
    //*find es un metodo de mongoose
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

//get one user
router.get("/:id", async (req, res) => {
  // console.log(req.params.id)
  try {
    const oneUser = await User.findById(req.params.id);
    res.json(oneUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//post a new user
router.post("/", async (req, res) => {
  //*como siempre, necesitamos traer los datos del body usando el req
  // console.log(req.body);
  //*podemos pasar por postman estos datos:
  // {
  //   "name": "Pam",
  //   "address": "somewhere",
  //   "category": 1
  // }

  //*usamos el modelo para hacer este new
  const user = new User({
    ...req.body,
  });

  try {
    const newUser = await user.save();
    res.json(newUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//update an user:
router.patch("/:id", async (req, res) => {
  try {
    //*remove va a remover usando el objeto _id que crea automáticamente mongo
    const updateUser = await User.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    res.json(updateUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete an user
router.delete("/:id", async (req, res) => {
  try {
    //*remove va a remover usando el objeto _id que crea automáticamente mongo
    const removeUser = await User.remove({ _id: req.params.id });
    res.json(removeUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
