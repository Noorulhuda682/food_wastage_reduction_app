const fetch = require("node-fetch");

const sendEmail = async ({template_id,name,email}) => {

  console.log("sendEmail===",template_id,name,email);
  
  var verificationCode = Math.floor(100000 + Math.random() * 900000);
  await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization:
        "Bearer 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",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: {
        email: "noorulhuda682@gmail.com",
      },
      personalizations: [
        {
          to: [
            {
              email,
            },
          ],
          dynamic_template_data: {
            name,
            verificationCode,
          },
        },
      ],
      template_id,
    }),
  })
    .then((data) => {
      console.log("Success! : ", data);
    })
    .catch((err) => {
      console.log("Error! : ", err);
      throw new Error("Error! : ",err)
    });

    return verificationCode;
};

module.exports = {
    sendEmail 
} 

