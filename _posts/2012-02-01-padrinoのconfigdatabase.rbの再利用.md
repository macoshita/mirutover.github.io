---
layout: post
title: padrinoのconfig/database.rbの再利用
date: 2012-02-01 11:10:00 UTC
updated: 2012-08-24 13:59:15 UTC
comments: false
categories: blog
tags: JavaScript Vim Ruby
---
{% include JB/setup %}

<u>素直にDB接続のroot, localhost, DB名を別ファイルに切り出すべきかもしれないなー、という結論で終わってるので、メモ程度で。</u><br /><br />padrinoだとDB接続設定がconfig/database.rbに書き込まれているのだけど、こいつをcron処理なんかで再利用したいと思って、以下のようにやってみた。<br />（datamapper以外だとまた違うかも）<br /><u><br /></u><br /><u>config/database.rb </u><br /><pre class="brush:ruby">DataMapper.logger = logger if defined? logger<br />if defined? Padrino<br />  env = Padrino.env<br />else<br />  env = CRON_ENV<br />end<br /><br />case env<br />when :development DataMapper.setup(:default, "mysql://root@localhost/fugafuga_development")<br /># 以下略<br /></pre><u><br /></u><br /><u>再利用するスクリプト </u><br /><pre class="brush:ruby">CRON_ENV = :development unless defined? CRON_ENV<br />require 'dm-core'<br />require File.expand_path("../../config/database.rb", __FILE__)<br />require File.expand_path("../../models/hogehoge.rb", __FILE__)<br />DataMapper.finalize<br /><br /># 以下略<br /></pre><br />これで一応目的は達成できたけど、ちょっと無理やり感がある。database.rbをいじらなくて済めばいいんだけどなー。<br /><br /><b><u>余談</u></b><br /><pre class="brush:ruby">DataMapper.logger = logger</pre>この代入してるloggerがメソッドだと気づくのに時間がかかった。まだまだruby力が低いなぁ。