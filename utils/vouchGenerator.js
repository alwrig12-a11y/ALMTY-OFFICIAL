const crypto = require('crypto');
const User = require('../models/User');

/**
 * Generates a unique, non-colliding Node Signature for a patron.
 * Format: NODE_502_[USERNAME]_[HASH4]
 */
async function generateUniqueVouchCode(username) {
  const cleanHandle = username.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 10);
  let isUnique = false;
  let finalCode = '';

  while (!isUnique) {
    // Generate a 4-character random hex string
    const randomHash = crypto.randomBytes(2).toString('hex').toUpperCase();
    finalCode = `NODE_502_${cleanHandle}_${randomHash}`;

    // Ensure it doesn't exist in MongoDB
    const existing = await User.findOne({ vouchCode: finalCode });
    if (!existing) {
      isUnique = true;
    }
  }

  return finalCode;
}

module.exports = { generateUniqueVouchCode };