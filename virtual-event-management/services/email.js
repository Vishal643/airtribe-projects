// const nodemailer = require('nodemailer');

// async function sendEmail({ to, subject, text, html }) {
// 	// Create a transporter
// 	console.log('to', to, 'subject', subject, 'text', text, 'html', html);
// 	let transporter = nodemailer.createTransport({
// 		host: 'smtp.elasticemail.com',
// 		port: 2525,
// 		secure: true,
// 		service: 'gmail',
// 		auth: {
// 			user: 'vishal@masaischool.com', // Your Gmail address
// 			pass: '0A3C248984CD6FC0014957459AC0EAC47303', // Your Gmail App Password
// 		},
// 	});
// 	console.log('transporter', transporter);
// 	// Setup email data
// 	let mailOptions = {
// 		from: '"Your Name" Vishal Kumar', // sender address
// 		to: to, // list of receivers
// 		subject: subject, // Subject line
// 		text: text, // plain text body
// 		html: html, // html body
// 	};
// 	console.log('mailOptions', mailOptions);
// 	// Send email with defined transport object
// 	let info = await transporter.sendMail(mailOptions);
// 	console.log('info', info);
// 	console.log('Message sent: %s', info.messageId);
// }

// module.exports = { sendEmail };
