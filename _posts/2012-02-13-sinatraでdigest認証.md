---
layout: post
title: sinatraでdigest認証
date: 2012-02-13 07:54:00 UTC
updated: 2012-08-24 13:59:15 UTC
comments: false
categories: blog
tags: JavaScript Vim Ruby
---
{% include JB/setup %}

結論、<a href="http://recipes.sinatrarb.com/" target="_blank">http://recipes.sinatrarb.com/</a>はひと通り読めってこと。下記は<a href="http://recipes.sinatrarb.com/#middleware_rack_auth_basic_and_digest" target="_blank">こちら</a>の引用。<br /><pre class="brush:ruby">#main.rb<br /><br />require 'sinatra'<br /><br />get '/' do<br />  "secret"<br />end<br /></pre><pre class="brush:ruby">#config.ru<br /><br />require './main'<br /><br />app = Rack::Auth::Digest::MD5.new(Sinatra::Application) do |username|<br />  {'foo' =&gt; 'bar'}[username]<br />end<br /><br />app.realm = 'Protected Area'<br />app.opaque = 'secretkey'<br /><br />run app<br /></pre>Rack::Auth::Digestを使う時はconfig.ruを書いてrackup -p 4567で起動するしか無いみたい。