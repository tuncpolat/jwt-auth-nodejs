export default function makeSendEmailVerification({ nodemailer, jwt }) {
    return async function sendEmailVerification({ email }) {
        try {
            const emailToken = jwt.sign({ email }, process.env.EMAIL_TOKEN, { expiresIn: '1d' })
            const url = `http://localhost:3000/confirmation/${emailToken}`;

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "wendell.hirthe@ethereal.email", // generated ethereal user
                    pass: "9DMZ3HCRnYZN5GjrdM", // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Your Company" <noreply@yourcompany.com>', // sender address
                to: email, // list of receivers
                subject: "Email Verification", // Subject line
                html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`, // html body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        } catch (e) {
            console.log(e);
        }
    }
} 