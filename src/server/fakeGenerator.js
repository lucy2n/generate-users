const { fakerPL, fakerRU, fakerEN } = require('@faker-js/faker');

const regionFakers = {
    us: fakerEN,
    pl: fakerPL,
    uz: fakerRU, 
};
  
function generateFakeData(region, seed, errors, page = 0, limit = 20) {
    const fakerInstance = regionFakers[region];

    if (!fakerInstance) {
        throw new Error('Unknown region');
    }

    fakerInstance.seed(seed);

    const data = [];

    for (let i = 0; i < limit; i++) {
        const entry = {
            id: page * limit + i + 1,
            uuid: fakerInstance.string.uuid(),
            name: fakerInstance.person.fullName(),
            address: fakerInstance.location.streetAddress(),
            phone: fakerInstance.phone.number(),
        };

        if (errors > 0) {
            entry.name = applyErrors(entry.name, errors);
            entry.address = applyErrors(entry.address, errors);
            entry.phone = applyErrors(entry.phone, errors);
        }

        data.push(entry);
    }

    return data;
}

  function applyErrors(str, errors) {
    const errorCount = Math.floor(errors);
    const hasPartialError = errors % 1 > 0 && Math.random() < (errors % 1);
    let modifiedStr = str;
  
    for (let i = 0; i < errorCount; i++) {
      modifiedStr = introduceError(modifiedStr);
    }
  
    if (hasPartialError) {
      modifiedStr = introduceError(modifiedStr);
    }
  
    return modifiedStr;
  }
  
  function introduceError(str) {
    const errorType = Math.floor(Math.random() * 3);
  
    switch (errorType) {
      case 0: {
        const removePos = Math.floor(Math.random() * str.length);
        return str.slice(0, removePos) + str.slice(removePos + 1);
      }
      case 1: {
        const addPos = Math.floor(Math.random() * (str.length + 1));
        const randomChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        return str.slice(0, addPos) + randomChar + str.slice(addPos);
      }
      case 2: {
        if (str.length < 2) return str;
        const swapPos = Math.floor(Math.random() * (str.length - 1));
        return str.slice(0, swapPos) + str[swapPos + 1] + str[swapPos] + str.slice(swapPos + 2);
      }
      default:
        return str;
    }
  }
  
module.exports = { generateFakeData };