'use strict';

var chai = require('chai');
var api = require('../index.js');

require('dotenv').load();
chai.should();

describe('Unsplash API public endpoints', function() {
  api.init(process.env.CLIENT_ID);

  describe('User', function() {
    describe('getUserPhotos', function() {
      it('should return without err and with an empty array', function(done) {
        api.getUserPhotos('fletcher_hills', function(err, photos) {
          if (err) return done(err);

          photos.should.be.instanceOf(Array);

          done();
        });
      });
    });
  });
});