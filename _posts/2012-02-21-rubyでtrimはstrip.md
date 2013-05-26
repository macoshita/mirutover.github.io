---
layout: post
title: rubyでtrimはstrip
date: 2012-02-21 09:08:00 UTC
updated: 2012-02-21 09:08:54 UTC
comments: false
categories: blog
tags: 
---
{% include JB/setup %}

hogehogeさんしか実行できないスクリプトをこんな感じで書こうとしたら<br /><pre class="brush:ruby">exit 1 unless 'hogehoge' == `id -un`</pre>sudo -u hogehoge ruby test.rb でも実行できない。なんで？　と思ってp `id -un`したら"hogehoge\n"って出てきてバカーと思って`id -un`.trim って書いたらそんなのないって怒られた。ってかrubyはじめてそこそこ経つのにtrimが必要なかったのが意外だった。正解はこちら。<br /><pre class="brush:ruby">exit 1 unless 'hogehoge' == `id -un`.strip!</pre><br />脱げ！