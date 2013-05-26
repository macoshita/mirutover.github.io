---
layout: post
title: rbenvでsudo
date: 2012-02-28 09:01:00 UTC
updated: 2012-08-24 14:00:01 UTC
comments: false
categories: blog
tags: Ruby
---
{% include JB/setup %}

なにも考えずにrbenvを導入したせいで、sudoの仕方が分からなくなった。<br />rbenvの中身を追ってみるかと思ったら<a href="http://d.hatena.ne.jp/sugyan/20111128/1322420500" target="_blank">こちらの記事</a>を見つけたので、これでいけるか？　と思ってやってみたら、<br /><pre class="brush:bash">sudo rbenv exec bundle exec ruby app.rb -p80</pre>いけた。開発環境ならとりあえずこれでいいか。<br />rbenvを本番環境で導入する場合はどうしたらいいかなー。