const fs = require("fs");
const { shows } = require("./prices.json");

const formatMessage = (messages, text, id) => {
  const [firstMsg, secondMsg] = messages
    .map((price) => {
      const removeSalt = price
        .replace(/[\r\n]/gm, "")
        .replace(/'/g, " ")
        .replace(/ /g, "");
      const normalPrice = parseFloat(removeSalt.replace(/,/g, ".").slice(3));
      return normalPrice;
    })
    .sort();

  const show = shows.find((show) => show.id == id);
  const { firstPrice, secondPrice } = show;

  if (firstMsg > firstPrice || secondMsg > secondPrice) {
    return null;
  } else {
    const prices = {
      shows: [
        ...shows.filter((show) => show.id != id),
        { id, firstPrice: firstMsg, secondPrice: secondMsg },
      ],
    };
    let data = JSON.stringify(prices);
    console.log(data);
    fs.writeFileSync("./src/prices.json", data);
    return `${text}+**$${firstMsg}**+++**$${secondMsg}**`;
  }
};

module.exports = { formatMessage };
