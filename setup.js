const { REST, Routes } = require("discord.js");
require('dotenv').config()
const setup = async () => {
  const commands = [
    {
      name: "ping",
      description: "Replies with Pong!",
    },
    {
      name: "price",
      description: "Obtener precio de las entradas de bad bunny",
    }
  ];

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  (async () => {
    try {
      console.log("Started refreshing application (/) commands.");

      await rest.put(Routes.applicationCommands("1022580021761671281"), {
        body: commands,
      });

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  })();
};

module.exports = setup;