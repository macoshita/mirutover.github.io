---
layout: post
title: padrinoでsinatra-synchronyが動かないような？
date: 2012-01-24 09:44:00 UTC
updated: 2012-08-24 13:59:15 UTC
comments: false
categories: blog
tags: JavaScript Vim Ruby
---
{% include JB/setup %}

最近は仕事も趣味もrubyばかり書いてるのだけど、作るものの性質的にrailsよりはsinatraで十分な感じで、それでも流石に生のsinatraだと色々足りない・めんどくさいので、padrinoというフレームワークを使っている。<br /><br />rails3とpadrinoの違いをそこまでハッキリと説明できないのだけど、自分の場合はpadrino派。<span style="font-size: xx-small;">なんとなく速い気がするのと、</span>sinatra extensionやらrack middlewareなんかをちゃんと探せばだいたい事足りるのと、何よりルーティングは明らかにpadrinoが好み。<br />ただ、そもそもruby初心者なので、なんとなくの理由しか無いので、今後意見が変わる可能性は高いけど。<br /><br /><b>で、本題。</b><br />sinatra-synchronyというライブラリがあって、それがうまく動いてくれなかったのでメモ。<br />sinatra-synchronyは、em-synchronyというeventmachine関連のライブラリをsinatra対応させたもので、sinatraのコードをほとんど書き換える事無くノンブロッキングI/Oを実現できるライブラリ。<br />自分の環境での各種ライブラリのバージョンは↓のような感じ。<br /><ul><li>padrino (0.10.5)</li><li>async-rack (0.5.1)</li><li>rack (1.4.1)</li><li>sinatra (1.3.2)</li><li>sinatra-synchrony (0.1.1)</li></ul>その上で、試したコードはpadrinoサイトにあった<a href="http://www.padrinorb.com/guides/asynchronous-concurrency-with-padrino" target="_blank">これ</a>なんだけど、padrino start とやると Server handler (thin, mongrel, webrick) not found. (RuntimeError) とか言われて動かない。<br />padrino start -a thin と指定してやると、今度は、&nbsp;uninitialized constant Rack::ContentLength と怒られる。<br />use すると今度は Rack::Chunked で怒られる。 <br /><pre class="brush:ruby">class Test &lt; Padrino::Application<br />  use Rack::ContentLength<br />  use Rack::Chunked<br /></pre>最終的に、こんな感じで指定したら動いた。<br />しかしこれでいいのか……？　なんかもっとちゃんとした解決方法とか、そもそも他のライブラリとかにすべきだよとかあったら教えて下さい。