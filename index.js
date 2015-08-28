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

/**
 * initiation function required to handle application client_id
 * @param  {string} client_id application's client_id
 */
function apiInit(client_id){
  this.client_id = client_id;
}

/**
 * gets photos of specified user
 * @param  {string}   userName username of target user
 * @param  {Function} callback callback called upon completion of API call
 * @return {object}            array of photos from specified user
 */
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

    if (res.statusCode !== 200) return callback(JSON.parse(body), null);

    return callback(null, JSON.parse(body));
  });
}

/**
 * gets the public info of the specified user
 * @param  {strong}   userName username of target user
 * @param  {Function} callback callback called upon completion of API call
 * @return {object}            specified user object
 */
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

    if (res.statusCode !== 200) return callback(JSON.parse(body), null);

    return callback(null, JSON.parse(body));
  });
}
