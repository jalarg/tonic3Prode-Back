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
};
