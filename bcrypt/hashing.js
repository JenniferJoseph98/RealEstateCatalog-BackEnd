const bcrypt = require("bcryptjs");
const saltRounds = 10;
const hashGenerate = async (plainpassword) => {
  try {
 
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainpassword, salt);
    return hash;
  } catch (error) {
    return error;
  }
};
const hashValidator = async (plainpassword, hashedPassword) => {
  try {

    const result = await bcrypt.compare(plainpassword, hashedPassword);

    return result;
  } catch (error) {
    return false;
  }
};
module.exports.hashGenerate = hashGenerate;
module.exports.hashValidator = hashValidator;
