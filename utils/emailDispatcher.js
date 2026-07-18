const { Resend } = require('resend');

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const SENDER_EMAIL = 'protocol@almty.io'; // Outgoing verified address

/**
 * [MODULE C]: SEND_REQUISITION_RECEIPT
 * Dispatches an automated, terminal-branded receipt upon Stripe confirmation.
 */
async function sendRequisitionReceipt(toEmail, username, orderId, items, totalValue) {
  if (!resend) {
    console.warn('⚠️ [SYSTEM]: RESEND_API_KEY MISSING. DISPATCH HALTED.');
    return;
  }

  const itemsHtml = items.map(item => `
    <tr style="border-bottom: 1px solid #111111;">
      <td style="padding: 10px 0; color: #E0E0E0;">${item.name.toUpperCase()} (SIZE: ${item.size || 'OS'})</td>
      <td style="padding: 10px 0; text-align: right; color: #00FF00;">$${item.price.toFixed(2)}</td>
    </tr>
  `).join('');

  const emailHtml = `
    <div style="background-color: #050505; color: #E0E0E0; font-family: 'Courier New', Courier, monospace; padding: 30px; border: 1px solid #222222; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; border-bottom: 1px dashed #333333; padding-bottom: 20px; margin-bottom: 20px;">
        <h1 style="color: #00FF00; font-size: 20px; letter-spacing: 2px; margin: 0;">ALMTY // SOVEREIGN PROTOCOL</h1>
        <p style="font-size: 10px; color: #555555; margin: 5px 0 0 0;">OFFICIAL_REQUISITION_LEDGER // NODE_502</p>
      </div>
      
      <p style="font-size: 12px;"><b>PATRON_ID:</b> ${username.toUpperCase()}</p>
      <p style="font-size: 12px;"><b>TRANSACTION_ID:</b> ${orderId}</p>
      <p style="font-size: 12px;"><b>TIMESTAMP:</b> ${new Date().toISOString()}</p>
      
      <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 25px;">
        <thead>
          <tr style="border-bottom: 1px solid #333333; color: #FFD700;">
            <th style="text-align: left; padding-bottom: 8px;">PROVISIONED_ASSET</th>
            <th style="text-align: right; padding-bottom: 8px;">SETTLEMENT</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      
      <div style="text-align: right; margin-top: 25px; padding-top: 15px; border-top: 1px dashed #333333;">
        <span style="font-size: 14px; color: #FFD700; font-weight: bold;">TOTAL_SETTLED: $${totalValue.toFixed(2)}</span>
      </div>

      <div style="margin-top: 40px; font-size: 9px; color: #444444; border-top: 1px solid #111111; padding-top: 15px; text-align: center; line-height: 1.4;">
        NOTICE: ALL PROTOCOLS AND ASSETS ARE THE EXCLUSIVE INTELLECTUAL PROPERTY OF ALMTY LLC.<br>
        SECURE STREAM TRANSMISSION // SECTOR_LOU_KY
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: `ALMTY Protocol <${SENDER_EMAIL}>`,
      to: toEmail,
      subject: `[HANDSHAKE_CONFIRMED]: ${orderId}`,
      html: emailHtml,
    });
    console.log(`✉️ [DISPATCH]: REQUISITION_RECEIPT SENT TO ${toEmail}`);
  } catch (error) {
    console.error('❌ [EMAIL_ERROR]: FAILED TO SEND REQUISITION RECEIPT:', error);
  }
}

module.exports = { sendRequisitionReceipt };