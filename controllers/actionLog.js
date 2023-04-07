const fs = require("fs");
const path = require("path");
const route = path.join(__dirname, "..", "utils", "logs.txt");

// CONTROLLERS DE LOG: EL LOG FUE IMPLEMENTADO EN UN ARCHIVO TXT EN EL SERVIDOR.
// ESTAS RUTAS SIRVEN PARA FACILITAR LA BUSQUEDA DE INFORMACON DETRO DEL LOG.

module.exports = {
  getLogs: async (req, res, next) => {
     try {
       fs.readFile(route, "utf8", (err, data) => {
         console.log(route);
         const logs = data
           .split("\n")
           .filter((log) => log !== "")
           .map((log) => JSON.parse(log));
         res.status(200).send(logs);
       });
     } catch (error) {
       next(error);
     }
  },
  getUserLog: async (req, res, next) => {
       try {
       fs.readFile(route, "utf8", (err, data) => {
         const uid = req.params.uid;
         const logs = data
           .split("\n")
           .filter((log) => log !== "")
           .map((log) => JSON.parse(log));
         const userLogs = logs.filter((log) => log.user === uid);
         res.status(200).send(userLogs);
       });
     } catch (error) {
       next(error);
     }
  },
  deleteLogs: async (req, res, next) => {
    try {
      fs.writeFileSync("logs.txt", "");
      res.status(200).send("All the logs were deleted");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting logs");
    }
  },
};




    // try {
    //   fs.readFile(route, "utf8", (err, data) => {
    //     if (err) throw err;
    //     const logs = data.split("\n").map((log) => JSON.parse(log));
    //     const filteredLogs = req.query.user
    //       ? logs.filter((log) => log.user === req.query.user)
    //       : logs;
    //     res.status(200).send(filteredLogs);
    //   });
    // } catch (err) {
    //   console.error(err);
    //   res.status(500).send("Error retrieving logs");
    // }