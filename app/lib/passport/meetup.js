'use strict';

var MeetupStrategy    = require('passport-meetup').Strategy,
    User              = require('../../models/user'),
    config            = require('../../../config'),
    meetup            = new MeetupStrategy(
                        {
                          consumerKey:     config.meetup.clientId,
                          consumerSecret: config.meetup.clientSecret,
                          callbackUrl:  config.meetup.callbackUrl
                        },
                        User.meetupAuthenticate);

module.exports = meetup;
