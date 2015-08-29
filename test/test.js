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

      it('should return with invalid username error', function(done) {
        api.getUserPhotos('01234', function(err, photos) {

          err.should.exist;
          chai.expect(photos).to.not.exist;

          done();
        });
      })
    });

    describe('getUserByName', function() {
      it('should return without err and with a user', function(done) {
        api.getUserByName('fletcher_hills', function(err, user) {
          if (err) return done(err);

          user.should.be.ok;

          done();
        });
      });

      it('should return with invalid username error', function(done) {
        api.getUserByName('01234', function(err, user) {

          err.should.exist;
          chai.expect(user).to.not.exist;

          done();
        });
      });
    });
  });

  describe('Photos', function() {
     describe('getPhotos', function() {
        it('should return without err and with the first 10 pictures', function(done) {
           api.getPhotos(null, null, function(err, photos, link) {
              if(err) return done(err);

              photos.should.be.instanceOf(Array);
              photos.should.have.length(10);

              done();
           });
        });

        it('should return without err and with the first 20 pictures', function(done) {
           api.getPhotos(null, 20, function(err, photos, link) {
               if(err) return done(err);

               photos.should.be.instanceOf(Array);
               photos.should.have.length(20);

               done();
           });
        });

        it('should return without err and with the second 10 pictures', function(done) {
           api.getPhotos(2, null, function(err, photos, link) {
               if(err) return done(err);

               photos.should.be.instanceOf(Array);
               photos.should.have.length(10);

               link.should.contain('<https://api.unsplash.com/photos?page=1>; rel="prev",');

               done();
           });
        });
     });
  });

  describe('Categories', function() {
    describe('getAllCategories', function() {
      it('should return without err and an array of categories', function(done) {
        api.getAllCategories(function(err, cats) {
          if (err) return done(err);

          cats.should.be.instanceOf(Array);

          done();
        });
      })
    });

    describe('getCategory', function() {
      it('should return without err and category #2 info', function(done) {
        api.getCategory('2', function(err, category) {
          if (err) return done(err);

          category.should.be.ok;
          category.id.should.equal(2);

          done();
        });
      });

      it('should return with invalid ID error', function(done) {
        api.getCategory('-1', function(err, category) {
          err.should.exist;
          chai.expect(category).to.not.exist;

          done();
        });
      });
    });

    describe('getCategoryPhotos', function() {
      it('should return without err and an array of photos', function(done) {
        api.getCategoryPhotos('2', function(err, photos, link) {
          if (err) return done(err);

          photos.should.be.instanceOf(Array);
          link.should.be.ok;

          done();
        });
      });

      it('should return with an invalid ID error', function(done) {
        api.getCategoryPhotos('-1', function(err, photos, link) {
          err.should.exist;

          chai.expect(photos).to.not.exist;
          chai.expect(link).to.not.exist;

          done();
        });
      });
    });
  });
});