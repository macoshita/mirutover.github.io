---
layout: post
title: sinatraでcommons風アクセスログ ～ローテーションもあるよ～
date: 2012-01-27 10:11:00 UTC
updated: 2012-08-24 13:59:15 UTC
comments: false
categories: blog
tags: JavaScript Vim Ruby
---
{% include JB/setup %}

sinatraでは、use Rack::CommonLoggerと書くことでcommons風のアクセスログを表示出来るのだけれど、あまりに溜まり過ぎるので、デイリーとかでログファイルをローテーションする必要がある。<br />しかしそれをcronとかでやるのは微妙なので、何とかしたいと思ってたら、<a href="http://doc.ruby-lang.org/ja/1.9.2/class/Logger.html" target="_blank">ruby標準のloggerクラス</a>がデイリーやマンスリーやサイズ等の条件でrotateしてくれることが分かった。やったね！<br />……と思ったけど、単純にuse Rack::CommonLogger, Logger.new('access.log', 'daily')じゃ動かない。なんでだ？　と思って<a href="http://rack.rubyforge.org/doc/Rack/CommonLogger.html" target="_blank">CommonLoggerのソース</a>を見たら、writeメソッドで書き込んでいる。そりゃ動かないよねー。<br />ということで、少々強引だけど以下のコードで対応した。<br /><pre class="brush:ruby">require 'sinatra'<br />require 'logger'<br /><br />logger = Logger.new("access.log", "daily")<br />logger.instance_eval { alias :write :'&lt;&lt;' unless respond_to?(:write) }<br />use Rack::CommonLogger, logger<br /><br />get '/' do<br />  'Hello world!'<br />end</pre>rubyの良いところ<span style="font-size: xx-small;">（とも言い切れないけど）</span>、動的なメソッド追加を利用して、ログ書き込みメソッドの&lt;&lt;をwriteにaliasしてるだけ。一応メソッド定義チェックはしているけれど、commonloggerが先に対応しそうな気がする。<br />……ちなみに、このコードに似た感じのものをstackoverflowかどこかで見た覚えがあるんだけど見当たらないので、見かけたら教えて下さい。。