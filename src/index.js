const getMessages = require('./getMessage');
const shows = require('./shows');
var cron = require('node-cron');
const fetch = require('cross-fetch');

const MY_HPONE = "+5491130962241";
const API_KEY = "560947";

const sendMessage = async (show) => {

   try {
      const message = await getMessages(show);
      console.log(message);
      if(message) {
         const send = await fetch(`https://api.callmebot.com/whatsapp.php?phone=${MY_HPONE}&text=${message}&apikey=${API_KEY}`)
         const send2 = await fetch(`https://api.callmebot.com/whatsapp.php?phone=+5491169180549&text=${message}&apikey=536584`)
         console.log(send, send2);
      }
   } catch (e) {
      console.log(e);
   }
   
}

console.log("Comienza el servicio!");

cron.schedule('*/10 * * * *', () => {
   shows.forEach(show => {
      sendMessage(show);
   });
});

