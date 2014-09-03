'use strict';

var config = {};

config.twitter = {
  apiKey     : 'e8wGxQHF3HdmXSMMEwKlNslCZ',
  apiSecret  : process.env.TWITTER_SECRET,
  callbackUrl: 'http://adam-vm.com:3000/auth/twitter/callback'
};

config.github = {
  clientId: 'ae11c1e831b7d4f98f2a',
  clientSecret: process.env.GITHUB_SECRET,
  callbackUrl: 'http://adam-vm.com:3000/auth/github/callback'
};

config.google = {
  clientId: '684183651325-426l3alq34vu3j58k5qmmvehpkk8o8ho.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_SECRET,
  callbackUrl: 'http://adam-vm.com:3000/auth/google/callback'
};

config.facebook = {
  clientId: '1454021928220214',
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackUrl: 'http://adam-vm.com:3000/auth/facebook/callback'
};

config.meetup = {
  clientId: 'o4496o30qpr097pufo21mq8tga',
  clientSecret: process.env.MEETUP_SECRET,
  callbackUrl: 'http://adam-vm.com:3000/auth/meetup/callback'
};

module.exports = config;
