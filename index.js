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
  getUserByName: getUserByName,
  getPhotos: getPhotos,
  getAllCategories: getAllCategories,
  getCategory: getCategory
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

    if (res.statusCode !== 200) return callback(new Error(body), null);

    return callback(null, JSON.parse(body));
  });
}

/**
 * gets the public info of the specified user
 * @param  {string}   userName username of target user
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

    if (res.statusCode !== 200) return callback(new Error(body), null);

    return callback(null, JSON.parse(body));
  });
}

/**
 * gets all of the available photo categories
 * @param  {Function} callback called upon completion of API call
 * @return {array}            set of photo categories
 */
function getAllCategories(callback) {
  request({
    url: (HOST + 'categories'),
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Client-ID ' + this.client_id
    }
  },
  function(err, res, body) {
    if (err) return callback(err);

    if (res.statusCode !== 200) return callback(new Error(body), null);

    return callback(null, JSON.parse(body));
  });
}

/**
<<<<<<< HEAD
 * gets a single page of photos from the list of all photos
 * @param  {int}      page     target page number
 * @param  {int}      perPage  number of photos returned per page
 * @param  {Function} callback callback called upon completion of API call
 * @return {object}            array of perPage amount of photos, and a
 *                             string of links for prev/next
 */
function getPhotos(page, perPage, callback) {
   var params = {};

   if (page != null)
      params.page = page;

   if (perPage != null)
      params.per_page = perPage;

   request({
      url: (HOST + path.join('photos')),
      method: 'GET',
      qs: params,
      headers: {
         'Content-type': 'application/json',
         'Authorization': 'Client-ID ' + this.client_id
      }
   },
   function(err, res, body){
      if (err) return callback(err);

      if (res.statusCode !== 200) return callback(JSON.parse(body), null);

      return callback(null, JSON.parse(body), res.headers.link);
   });
=======
 * get category information by ID
 * @param  {string}   categoryId ID of target category
 * @param  {Function} callback   called upon completion of API call
 * @return {object}              target category information
 */
function getCategory(categoryId, callback) {
  request({
    url: (HOST + path.join('categories', categoryId)),
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Client-ID ' + this.client_id
    }
  },
  function(err, res, body) {
    if (err) return callback(err);

    if (res.statusCode !== 200) return callback(new Error(body), null);

    return callback(null, JSON.parse(body));
  });
>>>>>>> add getCategory function
}
