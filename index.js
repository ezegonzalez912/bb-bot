const puppeteer = require("puppeteer");
const { Client, GatewayIntentBits } = require("discord.js");
const setup = require("./setup");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
require('dotenv').config()

setup();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  const { channel } = interaction;
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }

  if (interaction.commandName === "price") {
    await interaction.reply("Estamos buscando las entradas...");
    setTimeout(async () => {
      await channel.send("Ya casi las tenemos...");
    }, 20000);
    setTimeout(async () => {
      await channel.send("Prepara la billetera...");
    }, 22000);
    const prices = await getImagePrices();
    await channel.send({ files: ["./example.png"] });
    await channel.send("Por si tenes miopia te dejo los dos precios mas bajos: ");
    await channel.send(`A la mierda ${prices[0]} AR$`);
    await channel.send(`A la mierda ${prices[1]} AR$`);
  }
});

client.login(process.env.TOKEN);

const getImagePrices = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://www.viagogo.com/ar/Entradas-Conciertos/Rap-Hip-Hop-Reggae/Bad-Bunny-Entradas/E-9664686"
  );

  await page.waitForTimeout(20000);

  const selectQuiantity = await page.$('span[class="js-select-display"]');
  await selectQuiantity.click();

  const selectTwoPass = await page.$('div[data-q-val="1"]');
  await selectTwoPass.click();

  const continueButton = await page.$(
    'button[data-trackingdatavaluename="TFQContinue"]'
  );
  await continueButton.click();

  await page.waitForTimeout(10000);

  await page.setViewport({
    width: 700,
    height: 2500,
  });

  const prices = await page.$$('span[class="t-b fs16"]');

  const priceOne = await (
    await prices[0].getProperty("textContent")
  ).jsonValue();
  const priceTwo = await (
    await prices[1].getProperty("textContent")
  ).jsonValue();
  const priceThree = await (
    await prices[2].getProperty("textContent")
  ).jsonValue();

  await page.screenshot({ path: "example.png" });

  await browser.close();

  const endPrices = [priceOne, priceTwo, priceThree]
    .map((price) => {
      const removeSalt = price
        .replace(/[\r\n]/gm, "")
        .replace(/'/g, " ")
        .replace(/ /g, "");
      const normalPrice = parseFloat(removeSalt.replace(/,/g, ".").slice(3));
      return normalPrice;
    })
    .sort();

    return endPrices.slice(0,2);
};
