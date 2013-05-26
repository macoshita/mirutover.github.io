---
layout: post
title: ダブルクリックで動かせる ruby スクリプトを作る（windows）
date: 2013-02-01 11:18:00 UTC
updated: 2013-04-23 01:42:56 UTC
comments: false
categories: blog
tags: Ruby Windows
---
{% include JB/setup %}

<p>ruby にパスが通ってる必要はあるけど、それさえ満たせていれば、以下のような内容の bat ファイルを作るだけ。</p><table class="syntaxtable"><tr><td class="linenos"><div class="linenodiv"><pre>1<br />2<br />3<br />4<br />5<br />6</pre></div></td><td class="code"><div class="syntax"><pre>@ruby -x %~f0 %* &amp; pause &amp; exit /b<br /><br />#!ruby<br /># coding: utf-8<br /># ここから普通に ruby 書けばよい<br />puts &quot;こんにちはこんにちは&quot;<br /></pre></div></td></tr></table> <p>coding はそのファイルの文字コードに合わせて。pause を抜けば、一時停止しないスクリプトも作れる。</p><h2>簡単な説明</h2><p>まず頭の @ は bat の標準出力を止める意味。</p><p>ruby -x については、ruby -h に下記の記述がある。要するに #!ruby のある行まで勝手にカットして読み込むオプション。</p><table class="syntaxtable"><tr><td class="linenos"><div class="linenodiv"><pre>1</pre></div></td><td class="code"><div class="syntax"><pre>-x[directory]   strip off text before #!ruby line and perhaps cd to directory<br /></pre></div></td></tr></table> <p>%~f0 は bat ファイルのフルパスを取得する方法。つまり、この bat ファイル自身を ruby スクリプトに食わせている。</p><p>%* は bat ファイルに渡した引数すべて。ruby スクリプトにそのまま渡す。</p><p>&amp; で繋げば一行で書ける。</p><p>pause で一時停止。何かキーを押すまで先に進まない。そのまま終わって良いなら省略してもよい。</p><p>exit /b でスクリプト終了。bat としての読み込みはここで終了する。/b がないとコマンドプロンプトから実行してた時にそのプロンプトもろとも終了してしまう。</p><p>#!ruby 以降からは -x オプションによって ruby として読み込まれる部分</p><p># coding: utf-8 はスクリプトを utf-8 で記述する宣言。magic comment について<a href="http://doc.ruby-lang.org/ja/1.9.3/doc/spec=2fm17n.html#magic_comment">ドキュメント</a>を読むと、-x オプションを使った時もちゃんとcoding: utf-8 とか見てくれると書かれている。</p><p>utf-8 で書いた場合は、ARGV で取得できる引数の文字列と、スクリプト内で定義した文字列との文字コードが違ってしまうので、そのまま文字列をくっつけたりすると例外が起きる。ARGV[0].encode! "UTF-8" などとして変換してやる必要がある。</p><h2>どうでもいいはなし</h2><p>windows で ruby といえば <a href="http://rubyinstaller.org/">RubyInstaller</a> で入れてる人が多いと思うけど、とても簡単にスポーンって入るので、powershell とか使わなくても ruby でいいんじゃないかと思う。同様に node もスポーンって入るんで、最近は node か ruby でスクリプト書いてることが多い。</p>