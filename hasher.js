const crypto = require('crypto');

function generateHash(url, timestamp, evidenceText) {
    const dataString = `${url}|${timestamp || ''}|${evidenceText}`;
    return crypto.createHash('sha256').update(dataString).digest('hex');
}

module.exports = { generateHash };
