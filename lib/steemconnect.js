'use strict';

var fetch = require('isomorphic-fetch');
var qs = require('querystring');
var debug = require('debug')('steemconnect');

var steemconnect = {
  path: 'https://steemconnect.com/api',
  app: ''
};

exports = module.exports = steemconnect;

steemconnect.setPath = function setPath(path) {
  this.path = path;
  if (this.app.length) {
    this.path += '/' + this.app;
  }
};

steemconnect.setApp = function setApp(app) {
  this.app = app;
  steemconnect.setPath(this.path);
};

steemconnect.send = function sendsend(url, params, cb) {
  var retP = fetch(url + '?' + qs.stringify(params), {
    credentials: 'include'
  }).then(function (res) {
    debug('GET ' + res.status + ' ' + url);
    if (res.status >= 400) {
      var err = new Error('Steem Connect API call failed with ' + res.status);
      err.res = res;
      throw err;
    }
    return res.json();
  });

  if (!cb) return retP;

  return retP.then(function (ret) {
    cb(null, ret);
  }, function (err) {
    cb(err);
  });
};

steemconnect.isAuthenticated = function isAuthenticated(cb) {
  return steemconnect.send(this.path + '/verify', {}, cb);
};

steemconnect.vote = function vote(voter, author, permlink, weight, cb) {
  var params = {
    voter: voter,
    author: author,
    permlink: permlink,
    weight: weight
  };
  return steemconnect.send(this.path + '/vote', params, cb);
};

steemconnect.upvote = function upvote(voter, author, permlink, weight, cb) {
  var params = {
    voter: voter,
    author: author,
    permlink: permlink,
    weight: weight
  };
  return steemconnect.send(this.path + '/upvote', params, cb);
};

steemconnect.downvote = function downvote(voter, author, permlink, weight, cb) {
  var params = {
    voter: voter,
    author: author,
    permlink: permlink,
    weight: weight
  };
  return steemconnect.send(this.path + '/downvote', params, cb);
};

steemconnect.follow = function follow(follower, following, cb) {
  var params = {
    follower: follower,
    following: following
  };
  return steemconnect.send(this.path + '/follow', params, cb);
};

steemconnect.unfollow = function unfollow(follower, following, cb) {
  var params = {
    follower: follower,
    following: following
  };
  return steemconnect.send(this.path + '/unfollow', params, cb);
};

steemconnect.ignore = function ignore(follower, following, cb) {
  var params = {
    follower: follower,
    following: following
  };
  return steemconnect.send(this.path + '/ignore', params, cb);
};

steemconnect.reblog = function reblog(account, author, permlink, cb) {
  var params = {
    account: account,
    author: author,
    permlink: permlink
  };
  return steemconnect.send(this.path + '/reblog', params, cb);
};

steemconnect.comment = function comment(parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, cb) {
  var params = {
    parentAuthor: parentAuthor,
    parentPermlink: parentPermlink,
    author: author,
    permlink: permlink,
    title: title,
    body: body,
    jsonMetadata: jsonMetadata
  };
  return steemconnect.send(this.path + '/comment', params, cb);
};

steemconnect.deleteComment = function deleteComment(author, permlink, cb) {
  var params = {
    author: author,
    permlink: permlink
  };
  return steemconnect.send(this.path + '/deleteComment', params, cb);
};

steemconnect.post = function post(author, permlink, title, body, jsonMetadata, cb) {
  var params = {
    author: author,
    permlink: permlink,
    title: title,
    body: body,
    jsonMetadata: jsonMetadata
  };
  return steemconnect.send(this.path + '/post', params, cb);
};

steemconnect.escrowTransfer = function escrowTransfer(from, to, amount, memo, escrowId, agent, fee, jsonMeta, expiration, cb) {
  var params = {
    from: from,
    to: to,
    amount: amount,
    memo: memo,
    escrow_id: escrowId,
    agent: agent,
    fee: fee,
    json_meta: jsonMeta,
    expiration: expiration
  };
  return steemconnect.send(this.path + '/escrowTransfer', params, cb);
};

steemconnect.escrowDispute = function escrowDispute(from, to, escrowId, who, cb) {
  var params = {
    from: from,
    to: to,
    escrow_id: escrowId,
    who: who
  };
  return steemconnect.send(this.path + '/escrowDispute', params, cb);
};

steemconnect.escrowRelease = function escrowRelease(from, to, escrowId, who, amount, cb) {
  var params = {
    from: from,
    to: to,
    escrow_id: escrowId,
    who: who,
    amount: amount
  };
  return steemconnect.send(this.path + '/escrowRelease', params, cb);
};