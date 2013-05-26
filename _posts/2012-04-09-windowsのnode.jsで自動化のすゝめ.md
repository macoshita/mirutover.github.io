---
layout: post
title: windowsのnode.jsで自動化のすゝめ
date: 2012-04-09 13:01:00 UTC
updated: 2012-08-24 13:59:15 UTC
comments: false
categories: blog
tags: JavaScript
---
{% include JB/setup %}

<div>いつの間にかnode.jsがすごく簡単にインストールできるようになっていた(windows)。<br />普通にインストーラ使えば、npmも入ってくるので、あとはパス通しちゃえば即座に開発に取り掛かれる感じ。これはありがたい。</div><div><br /></div><div>で、node.jsで便利な関数に、<a href="http://nodejs.org/api/fs.html#fs_fs_watch_filename_options_listener" target="_blank">fs.watch</a>というものがある。これは、指定したファイルやディレクトリ内の変更をウオッチしてくれるもの。</div><div>これを利用すれば、lessの自動コンパイラ、自動コンプレスなど、色々な自動化ツールが作れる。</div><div>ということで、自動コンプレスの例を作ってみた。</div><pre class="brush:javascript">var fs = require('fs'),<br />    jsp = require("uglify-js").parser,<br />    pro = require("uglify-js").uglify,<br />    JS_FILE = 'app.js',<br />    timer;<br /><br />fs.watch(JS_FILE, function(event, filename) {<br />  try {<br />    if (timer) {<br />      return;<br />    }<br /><br />    timer = setTimeout(function() {<br />      var ast = jsp.parse(fs.readFileSync(JS_FILE, 'UTF-8'));<br />      console.log(pro.gen_code(ast));<br />      clearTimeout(timer);<br />      timer = null;<br />    }, 500);<br />  } catch (err) {<br />    console.error(err);<br />  }<br />});<br /></pre>いやぁ、カンタンですね！　と言いたかったんだけど、若干ハマった点があり、fs.watchが一度のファイル変更で何度もイベントを呼び、そのイベント名が全部'change'なので何が何だか分からないという事態に陥った。ここについては、fs.watchのドキュメントに記述があるように、そもそもOSのファイルシステム依存なので、ある程度は妥協するしかないようだ。上記の例では、最初のイベントから500ミリ秒は何もしないという手段で妥協している。とはいえ、個人利用には十分じゃないかなと思っている。<br /><br />lessコンパイルを走らせてcssをコンプレスとか、jsを結合させてからmin.js生成とかはbatでも出来るけど、なかなか自動化まで対応するものは作りにくいと思っていたので、今後いろいろ生かせるといいなと思う。