module.exports = {
  validateRequiredEnvs: (requiredEnvs) => {
    for (const requiredEnv of requiredEnvs) {
      if (!process.env[requiredEnv])
        throw new Error(`${requiredEnv} must be defined on the .env file`);
    }
  },
  date: (schema) => {
    schema
      .virtual("date")
      .set(function (property, date) {
        this[property] = new Date(date);
      })
      .get(function (property) {
        return this[property].toISOString().substring(0, 10);
      });
  },
  validationUser: (schema, uid, res) => {
    const user = schema.findOne({ uid });

    if (!user) return res.status(404).send("User not found");

    if (user.rol !== "superAdmin" && user.rol !== "admin") {
      return res.status(403).send("You are not allowed to do this action");
    }
  }
};
