import twilio from "twilio";

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

export default client;
