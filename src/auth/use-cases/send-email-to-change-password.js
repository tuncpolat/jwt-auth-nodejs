export default function makeSendEmailToChangePassword({ usersDb, nodemailer, jwt }) {
    return async function sendEmailToChangePassword({ email }) {
        try {
            // find email
            const user = await usersDb.findByEmail({ email })

            if (!user) { throw new Error("This Email is not in use.") }

            // send to link to change password
            const passwordToken = jwt.sign({ email }, process.env.PASSWORD_TOKEN, { expiresIn: '1d' })
            const url = `http://localhost:3000/change-password/${passwordToken}`;

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
                subject: "Change Password", // Subject line
                html: `You can change your password here: <a href="${url}">${url}</a>`, // html body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        } catch (e) {
            throw new Error(e.message)
        }
    }
} 