---
layout: post
title: sinatraでスラッシュで終わるパスをindex.html付きにリダイレクト
date: 2012-01-26 09:40:00 UTC
updated: 2012-08-24 13:59:15 UTC
comments: false
categories: blog
tags: JavaScript Vim Ruby
---
{% include JB/setup %}

下記で、example.com/ が example.com/index.html にリダイレクトされるようになる。自動生成されたyardocやrcovに短いURLでアクセスしたかっただけなので、クエリの考慮も自分的には必要なかったり。<br /><pre class="brush:ruby">before do<br />  path = request.path_info<br />  if path.end_with?('/')<br />    path &lt;&lt; 'index.html'<br />    path &lt;&lt; '?' &lt;&lt; request.query_string if request.query_string.length &gt; 0<br />    redirect to(p)<br />  end<br />end<br /></pre>しかし、こだわりたい貴方はURLにindex.htmlが付くのがいやかもしれない。その場合は<a href="http://stackoverflow.com/questions/2437390/serving-static-files-with-sinatra" target="_blank">このあたり</a>を参考にしよう。<br /><br /><b><u>sinatraサーバ</u></b><br /><pre class="brush:bash">echo "require 'sinatra'" | ruby<br /></pre>sinatraが入っていれば、たったこれだけで、コマンド打ったディレクトリ内のpublicディレクトリ内部を放出するサーバが立ち上がる、ということに気がついた雪の日の午後。<br /><br /><u><b>文字列演算速度</b></u><br />Rubyも、他の言語とおんなじように、文字列の+演算だとインスタンス生成しちゃって遅いらしい（上のコード程度ではまず問題にならないけれど）。<br />javaの+（プラス）使った文字列演算は、oracle公式やeclipse内蔵などなど、ほとんどのコンパイラはStringBuilderに置き換えるので、むしろbuilder見づらいから+で書こうよ派なのだけど、Rubyも実装によっては上手いことしてくれたりするのだろうか。いや、流石に厳しいか？<br />でもまぁ、この手のコストについての知識は大抵トリビアレベルで、議論がやたら盛り上がるけどそのテクニックが必須な場面はまず来ないんだよね。<br />一応どっちが速いか調べるけど、builderみたいにコードが汚くなるなら使わない。というスタンスでいいと思う。