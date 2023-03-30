const { Users } = require("../db_models");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const bets = await Users.find();
      res.send(bets);
    } catch (err) {
      next(err);
    }
  },
  findOneUser: async (req, res, next) => {
    try {
      const username = req.params.username;
      console.log(username);
      const user = await Users.findOne({ username });
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.send(user);
    } catch (err) {
      next(err);
    }
  },
  getAllUsersFromOneTournament: async (req, res, next) => {
    try {
      const tournamentId = req.params.id;
      const users = await Users.find({ tournaments: tournamentId });
      console.log("El user", users);
      if (!users) {
        return res.status(404).send("Users not found");
      }
      res.send(users);
    } catch (err) {
      next(err);
    }
  },
  createOneUser: async (req, res, next) => {
    try {
      const newUser = new Users(req.body);
      const savedUser = await newUser.save();
      res.send(savedUser);
    } catch (err) {
      next(err);
    }
  },

  // RUTAS DE PERMISO ESPECIAL!!
  // SOLO SUPERADMIN PUEDE BORRAR TODOS LOS USUARIOS

  createOneAdmin: async (req, res, next) => {
    console.log(req.body);
    const { uid, admin } = req.body;
    const user = await Users.findOne({ uid });
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.rol !== "superAdmin") {
      return res.status(403).send("You are not allowed to do this action");
    }
    try {
      const newAdmin = new Users(admin);
      const savedAdmin = await newAdmin.save();
      res.send(savedAdmin);
    } catch (err) {
      next(err);
    }
  },
  updateToAdmin: async (req, res, next) => {
    const { uid, newAdminUid } = req.body;
    const user = await Users.findOne({ uid });
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.rol !== "superAdmin") {
      return res.status(403).send("You are not allowed to do this action");
    }
    const userToUpdate = await Users.findOneAndUpdate(
      { uid: newAdminUid },
      { rol: "admin" },
      { new: true }
    );
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(userToUpdate);
  },

  deleteUsers: async (req, res, next) => {
    const { uid } = req.body;
    const user = await Users.findOne({ uid });
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.rol !== "superAdmin") {
      return res.status(403).send("You are not allowed to do this action");
    }
    try {
      await Users.deleteMany();
      res.send("All the users were deleted");
    } catch (err) {
      next(err);
    }
  },

  // SUPERADMIN Y ADMIN PUEDE BORRAR UN USUARIO
  deleteOneUser: async (req, res, next) => {
    const uidUserToDelete = req.params.uid;
    const { uid } = req.body;
    const user = await Users.findOne({ uid });
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.rol !== "superAdmin") {
      return res.status(403).send("You are not allowed to do this action");
    }
    try {
      const user = await Users.findOneAndDelete({ uid: uidUserToDelete });
      // Check if user exists
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.send("The user was deleted");
    } catch (err) {
      next(err);
    }
  },
};
