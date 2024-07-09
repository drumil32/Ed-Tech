import { createTransport } from "nodemailer";


export const sendMailToSystem = async (subject: string, body: string) => {
    let from = `SprintUp System Mail ${process.env.SYSTEM_SENDER}`
    await sendMail(subject, body, process.env.SYSTEM_SENDER, process.env.SYSTEM_RECEIVER, process.env.SYSTEM_SENDER_PASSWORD, from);
}

export const sendMail = async (subject: string, body: string, senderEmail: string, to: string, password: string, from: string) => {

    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: senderEmail, // Use environment variables instead of hardcoding
            pass: password, // Use environment variables instead of hardcoding
        },
    });

    const mailOptions = {
        from,
        to,
        subject,
        html: body
    }

    await transporter.sendMail(mailOptions);

}