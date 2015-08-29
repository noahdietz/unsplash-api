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
  searchPhotos: searchPhotos,
  getPhoto: getPhoto,
  getAllCategories: getAllCategories,
  getCategory: getCategory,
  getCategoryPhotos: getCategoryPhotos,
  getCurrentUser: getCurrentUser,
  updateCurrentUser: updateCurrentUser
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

      if (res.statusCode !== 200) return callback(new Error(body), null);

      return callback(null, JSON.parse(body), res.headers.link);
   });
}

/**
 * gets a single page of photos by search query
 * @param  {string}   query      term to search by
 * @param  {Array}    categories ids of categories to filter by, as an array of ints
 * @param  {int}      page       target page number
 * @param  {int}      perPage    number of photos returned per page
 * @param  {Function} callback   callback called upon completion of API call
 * @return {object}              array of perPage amount of photos, and a
 *                               string of links for prev/next
 */
function searchPhotos(query, categories, page, perPage, callback) {
   var params = {};

   if (query != null)
      params.query = query;

   if (categories != null) {
      params.category = '';
      for (var index = 0; index < categories; index++) {
         params.category += categories[index];

         if (index != categories.length - 1)
            params.category += ',';
      }
   }


   if (page != null)
      params.page = page;

   if (perPage != null)
      params.per_page = perPage;

   request({
      url: (HOST + path.join('photos', 'search')),
      method: 'GET',
      qs: params,
      headers: {
         'Content-type': 'application/json',
         'Authorization': 'Client-ID ' + this.client_id
      }
   },
   function(err, res, body){
      if (err) return callback(err);

      if (res.statusCode !== 200) return callback(new Error(body), null);

      return callback(null, JSON.parse(body), res.headers.link);
   });
}

/**
 * gets a single photo by id
 * @param  {string}   id       id of photo to request
 * @param  {int}      width    custom width to apply
 * @param  {int}      height   custom height to apply
 * @param  {Array}    rect     custom rectangle to apply [x, y, width, height]
 * @param  {Function} callback callback called upon completion of API call
 * @return {object}            requested photo
 */
function getPhoto(id, width, height, rect, callback) {
   var params = {};

   if (width != null)
      params.w = width;

   if (height != null)
      params.h = height;

   if (rect != null)
      params.rect = rect[0] + ',' + rect[1] + ',' + rect[2] + ',' + rect[3];

   request({
      url: (HOST + path.join('photos', id)),
      method: 'GET',
      qs: params,
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
}

function getCategoryPhotos(categoryId, callback) {
  request({
    url: (HOST + path.join('categories', categoryId, 'photos')),
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Client-ID ' + this.client_id
    }
  },
  function(err, res, body) {
    if (err) return callback(err);

    if (res.statusCode !== 200) return callback(new Error(body), null);

    return callback(null, JSON.parse(body), res.headers.link);
  });
}

/**
 * retrieves personal information about the logged-in user
 * @param  {string}   token    OAuth token for target user
 * @param  {Function} callback called upon completion of API call
 * @return {object}            logged-in user information
 */
function getCurrentUser(token, callback) {
  request({
    url: (HOST + 'me'),
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  },
  function(err, res, body) {
    if (err) return callback(err);

    if (res.statusCode !== 200) return callback(new Error(body), null);

    return callback(null, JSON.parse(body));
  });
}

/**
 * update the current logged-in user's personal information
 * @param  {string}   token    OAuth token for target user
 * @param  {object}   changes  information to be changed in logged-in user
 * @param  {Function} callback called upon completion of API call
 * @return {object}            new information of logged-in user
 */
function updateCurrentUser(token, changes, callback) {
  request({
    url: (HOST + 'me'),
    method: 'PUT',
    qs: changes,
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  },
  function(err, res, body) {
    if (err) return callback(err);

    if (res.statusCode !== 200) return callback(new Error(body), null);

    return callback(null, JSON.parse(body));
  });
}
