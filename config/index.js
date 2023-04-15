module.exports = {
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  corsOrigin: process.env.CORS_ORIGIN,
  gmailPassword: process.env.GMAIL_PASSWORD,
  pushNotificationsPrivateAPIKey: process.env.API_PRIVATEKEY_PUSH_NOTIFICATIONS,
  pushNotificationsPublicAuthKey: process.env.API_PUBLICKEY_PUSH_NOTIFICATIONS,
};