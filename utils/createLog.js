const fs = require("fs");
const path = require("path");

async function createLog(uid, method, route, info, description) {
  const logData = {
    timestamp: new Date(),
    user: uid || null,
    method,
    route,
    data: null,
    description: description || null,
  };
  console.log(logData);

  const filePath = path.join(__dirname, "logs.txt"); // [1] define la ruta y el nombre del archivo
  const logText = JSON.stringify(logData); // [2] convierte el objeto en texto
  fs.writeFileSync(filePath, `${logText}\n`, { flag: "a" }); // [3] escribe el registro de actividad en el archivo

  console.log("log created");
}

module.exports = {
  createLog,
};
