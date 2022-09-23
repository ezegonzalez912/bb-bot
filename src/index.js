const getMessages = require('./getMessage');
const shows = require('./shows');
var cron = require('node-cron');
require('dotenv').config()

const accountSID = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = require('twilio')('AC482ddfc2b04c6bb58652c5d3632b79bf', '33a7e7f35cbb3918eb910f9fb0c9863e');

const sendMessage = async (show) => {

   const message = await getMessages(show);
   
   client.messages.create({
      to: '+541130962241',
      from: '+18323466998',
      body: message
   })

}

setTimeout(() => {
   client.messages.create({
      to: '+541130962241',
      from: '+18323466998',
      body: "Comenzo el bot"
   })
}, 120000)

cron.schedule('*/60 * * * *', () => {
   
   const now = new Date();
   const hour = now.getHours()

   console.log("Se ejecuto a las: ", hour);

   if(hour < 23 && hour > 12) {
      shows.forEach(show => {
         sendMessage(show);
      });
   }
});