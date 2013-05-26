---
layout: post
title: Padrino::Routingでの定数スコープ
date: 2012-02-16 13:06:00 UTC
updated: 2012-08-24 13:59:15 UTC
comments: false
categories: blog
tags: JavaScript Vim Ruby
---
{% include JB/setup %}

「一日一個くらいは学ぶことあるだろ」という思いで書いてるブログだけど、学びすぎても書くのがしんどいということを学んだ。一つ、学んだけど未解決なものを。<br /><pre class="brush:ruby">module Const<br />  FUGA = 1<br />end<br /><br />class TestApp &lt; Padrino::Application<br />  include Const<br />  HOGE = 1<br />end<br /><br />TestApp.controllers :foo do<br />  get :bar do<br />    puts FUGA # =&gt; 1<br />    puts HOGE # =&gt; undef<br />  end<br />end<br /></pre>なんでFUGAが見れるのか？　ってのは、中を追ったらcontrollersメソッドがinstance_evalしてるからだってことがわかったんだけど、じゃなんでHOGEが見れないのかがさっぱり分からない。<br />なんか頭が混乱してるだけで、もっと単純な話しなのかな……。<br />定数をどこに書くかってことを考えてただけで、Const::FUGAの「Const::」を書きたくないとかって話ではないので、また時間があるときにでもソース追ってみる。