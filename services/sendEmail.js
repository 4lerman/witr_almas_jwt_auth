const nodemailer = require("nodemailer");

module.exports = {
	sendEmail: async ({ to, subject, text }) => {
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: Number(process.env.EMAIL_PORT),
			auth: {
				user: process.env.EMAIL_ADDRESS,
				pass: process.env.EMAIL_PASSWORD,
			},
		});
		let info = await transporter.sendMail({
			from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_ADDRESS}>`,
			to,
			subject,
			text,
		});
		console.log(`Message preview URL: ${nodemailer.getTestMessageUrl(info)}`);
	},
};
