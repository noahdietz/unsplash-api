/**
 * This file contains the main functionality for the unsplash-api module
 *
 * @author Noah Dietz
 */

'use strict';

var request = require('request');
var path = require('path');

var HOST = 'https://api.unsplash.com/'

module.exports = {
  getUserPhotos: getUserPhotos
};

function getUserPhotos(userName, callback) {
  request({
    url: (HOST + path.join('users', userName, 'photos')),
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Client-ID ' + CLIENT_ID
    }
  },
  function(err, res, body){
    if (err) { return callback(err); }

    return callback(null, body);
  });
}
