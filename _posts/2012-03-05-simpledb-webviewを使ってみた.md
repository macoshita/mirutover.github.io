---
layout: post
title: simpledb-webviewを使ってみた
date: 2012-03-05 08:35:00 UTC
updated: 2012-03-05 08:41:08 UTC
comments: false
categories: blog
tags: 
---
{% include JB/setup %}

<a href="https://github.com/rjrodger/simpledb" target="_blank">https://github.com/rjrodger/simpledb</a><br /><br />ハッカソンでこちらのwebviewを利用させてもらった。<br />USリージョン限定だったのと、最新のnodeで動かなかったので、↓のように書き換えて、その場で export NODE_PATH="$PWD/custom_modules/" して実行。<br /><pre class="brush:diff">diff --git a/server.js b/server.js<br />index d202da4..a4177aa 100644<br />--- a/server.js<br />+++ b/server.js<br />@@ -3,7 +3,7 @@<br /> //<br /><br /> // We keep our own modules separate from npm modules (which go into node_modules)<br />-require.paths.unshift(__dirname + "/custom_modules/");<br />+//require.paths.unshift(__dirname + "/custom_modules/");<br /><br /> var express = require('express');<br /> var simpledb = require('simpledb');<br />@@ -26,7 +26,7 @@ app.use(express.static(__dirname + '/public'));<br /> //<br /> app.get('/api/select', function(req, res){<br />   var cookie = JSON.parse( req.cookies['aws-credentials'] );<br />-  var creds = { keyid:cookie.keyid, secret:cookie.secret };<br />+  var creds = { keyid:cookie.keyid, secret:cookie.secret, host:'sdb.ap-northeast-1.amazonaws.com' };<br />   var sdb = new simpledb.SimpleDB(creds);<br /><br />   sdb.select(req.query.queryStr, function(_err, _res, _meta){<br />@@ -40,7 +40,7 @@ app.get('/api/select', function(req, res){<br /> //<br /> app.get('/api/domains', function(req, res){<br />   var cookie = JSON.parse( req.cookies['aws-credentials'] );<br />-  var creds = { keyid:cookie.keyid, secret:cookie.secret };<br />+  var creds = { keyid:cookie.keyid, secret:cookie.secret, host:'sdb.ap-northeast-1.amazonaws.com' };<br />   var sdb = new simpledb.SimpleDB(creds);<br /><br />   sdb.listDomains(function(errDomains, resDomains, metaDomains){<br /></pre>クエリ打てたらなおよしだけど、まぁそれはRubyとかのSDK叩くのも大して手間がかからないのでいいかなーという感じ。または、これをちょっと改造すればいけそう。<br />ちなみに、firefox使いなら、<a href="http://d.hatena.ne.jp/tottokug/20110328/1301284859" target="_blank">東京リージョン対応のSDB Tool</a>の方がよいと思う。<br /><br />しかし、ひさびさにnodeを触ったな。……いや、触ったうちに入らないか。