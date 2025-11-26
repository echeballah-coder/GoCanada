/**
 * @file middlewares/index.js
 * @description Index centralisé de tous les middlewares.
 */

module.exports = {
  ...require('./security.js'),
};
