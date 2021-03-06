---
layout: post
title: rubyのmoduleのincludeの色々
date: 2012-01-25 11:11:00 UTC
updated: 2012-08-24 13:59:15 UTC
comments: false
categories: blog
tags: JavaScript Vim Ruby
---
{% include JB/setup %}

いろいろ勉強になった。<br /><br /><b><u>moduleをトップレベルでincludeするとObjectクラスに展開される</u></b><br />要するに、下記のようなことが起こるという意味。<br /><pre class="brush:ruby">module Test<br />  def hoge<br />    puts "hoge"<br />  end<br />end<br /><br />include Test<br /><br />class A<br />end<br /><br />class B<br />end<br /><br />A.new.hoge # =&gt; "hoge"<br />B.new.hoge # =&gt; "hoge"<br /></pre>ちゃんと調べてよかった。sinatraとかで遊んでばかりいないで、このあたりはちゃんと勉強したほうが良いと思った。<br /><br /><u><b>moduleをincludeしたクラスは、そのmoduleのメソッド全てにアクセスできる</b></u><br /><a href="http://blade.nagaokaut.ac.jp/cgi-bin/scat.rb/ruby/ruby-list/41813">ここ</a>に辿り着き、現状もそういうメソッドは作れないことが分かった。<br />醜い方法か、それとも妥協したりクラスにしたりするか、という選択肢なら、自分は後者を選ぶ。ということでそこを塞ぐのは諦めた。<br /><br /><u><b>module_functionは便利だけど、ちょい不満あり</b></u><br />例えばMathモジュールなんかを作るとして、Math.sinとも呼び出せるし、includeしてsinだけで呼び出せるようなメソッドを作ることができる。<br /><div>これは内部的に何をしてるかというと、<a href="http://doc.okkez.net/static/187/method/Module/i/module_function.html" target="_blank">ここ</a>にある通り、</div><blockquote class="tr_bq"><span style="background-color: white; font-family: Meiryo, 'Hiragino Kaku Gothic Pro', 'MS Gothic', Osaka, sans-serif; line-height: 22px; text-align: left;">プライベートメソッドとモジュールの特異メソッドの 2 つを同時に定義</span></blockquote>しているらしい。<br />しかしこれ、例えばMath.sinの中にMath.cosでも再利用できるなってパーツがあった場合、その部分をprivateメソッドに切り出したいと考えると思うのだけど、上記の「moduleをincludeしたら最後、そのクラスはprivateメソッドにもアクセス可能」というのがあるので、切り出したメソッドを（醜い方法でしか）隠せない。<br /><br /><u><b>余談</b></u><br />privateな定数も（醜い方法でしか）作れない。<br /><pre class="brush:ruby">class Test<br />  @@teisuu = 'teisuu'.freeze<br />end<br /></pre>どちらかと言うとこっちの方が困ることが多いかも。javaのprivate static final intとかに慣れているせいだろうか。