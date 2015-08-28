/**
 * This file contains the main functionality for the unsplash-api module
 *
 * @author Noah Dietz
 */

'use strict';

var request = require('request');
var path = require('path');

var HOST = 'https://api.unsplash.com/'
var client_id;

module.exports = {
  init: apiInit,
  getUserPhotos: getUserPhotos,
  getUserByName: getUserByName
};

function apiInit(client_id){
  this.client_id = client_id;
}

function getUserPhotos(userName, callback) {
  request({
    url: (HOST + path.join('users', userName, 'photos')),
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Client-ID ' + this.client_id
    }
  },
  function(err, res, body){
    if (err) return callback(err);

    return callback(null, JSON.parse(body));
  });
}

function getUserByName(userName, callback) {
  request({
    url: (HOST + path.join('users', userName)),
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Client-ID ' + this.client_id
    }
  },
  function(err, res, body) {
    if (err) return callback(err);

    return callback(null, JSON.parse(body));
  });
}
