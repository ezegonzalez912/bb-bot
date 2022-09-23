const getMessages = require('./getMessage');
const shows = require('./shows');
var cron = require('node-cron');
require('dotenv').config()

const accountSID = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = require('twilio')(accountSID, authToken);

const sendMessage = async (show) => {

   const message = await getMessages(show);
   
   client.messages.create({
      to: process.env.MY_PHONE_NUMBER,
      from: '+18323466998',
      body: message
   })

}

console.log("Comenzo el bot");

cron.schedule('*/60 * * * *', () => {
   
   const now = new Date();
   const hour = now.getHours()

   console.log("Se ejecuto a las: ", hour);

   if(hour < 00 && hour > 12) {
      shows.forEach(show => {
         sendMessage(show);
      });
   }
});