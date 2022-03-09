const {getJSON, saveJSON} = require('../utils/fileHelpers');

class User {
  constructor() {
    this.saveData = saveJSON;
    this.fetchData = getJSON;
  }

  async find(id) {
    return new Promise (function(resolve, reject){
      // fetch the users
      const data = getJSON();
      // found the users
      const user = data.find((resolve) => resolve.id === id);
      // if found return the user
      if (user) return resolve(user);
      // if not found return Promise.reject(new Error(`User with id ${id} not found`));
      else return reject(new Error(`User with id ${id} not found`));
    })
  }

  async create(user) {
    // fetch the users
    const data = getJSON();
    // append the user to all the users
    data.push(user);
    // save the users
    this.saveData(data);
    // return the saved user
    return user;
  }
};

module.exports = new User();