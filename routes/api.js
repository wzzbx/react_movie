const express = require('express');
const Movie = require('../models/movie');
const User = require('../models/user');
const _ = require('lodash');


const router = new express.Router();

// GET USERS
router.get('/users', (req, res) => {
	User
		.find({})
		.exec(function (err, users) {
			if (err)
				res.status(200).json({
					mesage: "Error retrieving users from database!"
				});
			
			res.json(users);
		});
});
// GET USER MOVIES
router.get('/user/:email/movies', (req, res) => {
	User
		.findOne({
			email: req.params.email 
		})
		.exec(function (err, user) {
			if (err)
				res.status(200).json({
					mesage: "Error retrieving user from database!"
				});

			let moviesIds = _.map(user.movies, function (id) {
				
				return id.movieId;
			});
			
			Movie.find({
				_id: {
					$in: moviesIds
				}
			}, function (err, movies) {
				if (err)
					res.status(200).json({
						mesage: "Error retrieving user movies from database!"
					});
				res.json(movies).end();

			})

		});
});
// CREATE MOVIE FOR USER
router.post('/user/:email/createmovie', (req, res) => {

	let movie = new Movie();
	
	movie.title = req.body.title;
	movie.released = req.body.released;
	
	
		movie.url = req.body.url;

	movie.save((err)=>{
		if (err) throw err;
	})

	
	User.update({
			email: req.params.email
		}, {
			$addToSet: {
				movies: {
					"movieId": movie._id
				}
			}
		}).exec(function (err) {
			if (err) throw err;
		});
	});


// UPDATE USER MOVIE
router.post('/user/updatemovie/:id', (req, res) => {

	console.log("UPDATE MOVIE",req.params.id);
	console.log(req.body);
	Movie.update({
		_id: req.params.id
	}, {
		$set: {
			title: req.body.title,
			released : req.body.released,
			url: req.body.url
		}
	}).exec(function (err) {
		if (err) throw err;
	});
 
	

});

// DELETE USER MOVIE
router.get('/user/:email/deletemovie/:id', (req, res) => {

	console.log(req.params.id);console.log(req.params.email);
	User.update({
		email: req.params.email
	}, {
		$pull: {
			movies: {
				"movieId": req.params.id
			}
		}
	}).exec(function (err) {
		if (err) throw err;
	});
	
	Movie.findByIdAndRemove({
		_id: req.params.id
	}).exec(function (err) {
		if (err) throw err;
	});
	res.sendStatus(200);
});

router.get('/movie/:id', function (req, res) {
	Movie
		.findOne({ _id: req.params.id })
		.exec(function (err, data) {
			
			res.json(data);
		})
})

module.exports = router;