---
layout: post
title: rspecのmock requestでIPを変更する
date: 2012-02-14 15:02:00 UTC
updated: 2012-08-24 13:59:15 UTC
comments: false
categories: blog
tags: JavaScript Vim Ruby
---
{% include JB/setup %}

<pre class="brush:ruby">post 'blog/new', 'new post', 'REMOTE_ADDR' =&gt; '127.0.0.1'<br /></pre>こんな感じで上手くいった。<br /><a href="http://rubydoc.info/github/brynary/rack-test/master/Rack/Test/Methods" target="_blank">Rack::Test::Methods</a>&nbsp;→&nbsp;<a href="http://rubydoc.info/gems/rack-test/0.5.6/Rack/MockSession" target="_blank">Rack::MockRequest</a>&nbsp;→&nbsp;<a href="http://rack.rubyforge.org/doc/classes/Rack/Request.html" target="_blank">Rack::Request</a>&nbsp;→ <a href="http://rack.rubyforge.org/doc/classes/Rack/Request.src/M000288.html" target="_blank">ipってメソッド</a>の実装見て、こんな感じでいいのかなーと。<br />……完全に実装追っちゃってるけど、どっかに書いてないのかしら。