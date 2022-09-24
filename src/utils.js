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

   return `${text}+**$${firstMsg}**+++**$${secondMsg}**`;
};

module.exports = { formatMessage };
