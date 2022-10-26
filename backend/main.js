"use strict";
const log = require("lambda-log");
log.options.dev = true;
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const verify = "https://www.google.com/recaptcha/api/siteverify";
const { GoogleSpreadsheet } = require("google-spreadsheet");
const doc = new GoogleSpreadsheet(
  "1dCVpwllQxQ5ynIiCoXWv08amnH1IulCWrJ1b4NAQzYo"
);
const creds = require("./pasley-hill-leads.json");
async function verifyCode({ response, remote_ip = null }) {
  const body = {
    secret: process.env.GOOGLE_RECAPTCHA_SECRET,
    response,
    remote_ip,
  };
  console.log(body);
  const verResponse = await fetch(verify, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${process.env.GOOGLE_RECAPTCHA_SECRET}&response=${response}&remoteip=${remote_ip}`,
  });
  return verResponse.json();
}
async function setUp() {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
}
async function addLead({
  first_name,
  last_name,
  company,
  phone_number,
  email,
  subject,
  message,
}) {
  await setUp();
  const sheet = doc.sheetsByTitle["Leads"];
  const now = new Date();
  const enString = "en-US";
  const timeZone = { timeZone: "America/New_York" };
  const dateTime =
    now.toLocaleDateString(enString, timeZone) +
    " " +
    now.toLocaleTimeString(enString, timeZone);
  return await sheet.addRow({
    Firstname: first_name.trim(),
    Lastname: last_name.trim(),
    Company: company.trim(),
    Email: email.trim(),
    Subject: subject.trim(),
    Message: message.trim(),
    Phonenumber: phone_number.trim(),
    Date: dateTime.trim(),
  });
}
module.exports.handler = async (event) => {
  try {
    log.info("Contact info request received", { event });
    const data = event?.body;
    const ip = event?.requestContext?.http?.sourceIp;
    const parsed = data ? JSON.parse(data) : null;
    parsed.remote_ip = ip;
    if (parsed === null) throw new Error("No data provided");
    const verification = await verifyCode(parsed, ip);
    if (verification?.score < 0.6) throw new Error("Bot detected");
    log.info("VER", { verification });
    await addLead(parsed);
    log.info("Contact info stored successfully", { stored: parsed });
    return JSON.stringify({
      statusCode: 200,
      message: "Contact info stored successfully",
    });
  } catch (error) {
    console.trace(error);
    log.error("An error occurred", { error });
    return {
      statusCode: 500,
      message: error?.message ?? "Unknown error",
      error,
    };
  }
};
