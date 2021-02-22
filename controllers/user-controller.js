var User = require('../models/users');
var passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");
const e = require('express');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.newUserPage = function (req, res) {
    res.render("register", {
        data: undefined
    });
};

exports.createNewUser = function (req, res) {
    var username = req.body.username
    var password = req.body.password
    User.register(new User({ username: username }),
        password, function (err, user) {
            if (err) {
                return res.render("register", {
                    data: "It was not possible to create new admin!"
                });
            } else {
                return res.render("register", {
                    data: "The new admin " + username + " was created!"
                });
            }
        });
};

exports.userLoginPage = function (req, res) {
    res.render("login", {
        data: undefined
    });
};

exports.userLoginAuth = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            return res.render("login", {
                data: "User or password is not correct!"
            });
        }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return res.redirect('/');
        });
    })(req, res, next);
}

exports.userLogout = function (req, res) {
    req.logout();
    res.redirect("/");
}