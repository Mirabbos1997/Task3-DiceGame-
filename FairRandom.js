const crypto = require("crypto");

module.exports = class FairRandom {
  // Generate HMAC with a random value
  static generateHMAC(randomValue) {
    const secretKey = crypto.randomBytes(32); // Generate a 256-bit random key
    const hmac = crypto.createHmac("sha256", secretKey).update(String(randomValue)).digest("hex");
    return { hmac, secretKey, randomValue };
  }

  // Verify the HMAC using the key and value
  static verifyHMAC(hmac, secretKey, randomValue) {
    const computedHMAC = crypto.createHmac("sha256", secretKey).update(String(randomValue)).digest("hex");
    return computedHMAC === hmac;
  }

  // Generate a cryptographically secure random value within a range
  static generateRandomValue(rangeMax) {
    return Math.floor(Math.random() * (rangeMax + 1));
  }
};
