---
layout: post
title: sencha touch 2のSDK tools betaを64bit windows7で動かす
date: 2012-03-16 09:32:00 UTC
updated: 2012-08-24 13:59:15 UTC
comments: false
categories: blog
tags: JavaScript
---
{% include JB/setup %}

どこまでガチで行けるのかを試そうと思いSDK toolsを入れたはいいものの動かない。<br />一応、以下の点に気をつけてインストールしたらアプリのapp createまでは出来た。<br /><br /><ul><li>Program Files(x86)に入れると動かない</li><ul><li>C:\dev とかにする</li></ul><li>/path/to/sencha-touch-2-sdk/"commands" まで移動して sencha を実行</li><ul><li>ドキュメントと違う</li></ul><li>その後は /path/to/sencha-touch-2-sdk/ に戻って sencha を実行</li><li>ちゃんと動いた！</li></ul><div>まぁこの辺りの不便はそのうち解消されるとは思う。</div><div>しかし、senchaはクセがあるというか、js on rails みたいな感じだなぁ。確かにきっちりしたものは作れそうだけど、自由度が不安。</div>