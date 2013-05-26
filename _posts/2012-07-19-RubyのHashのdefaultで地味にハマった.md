---
layout: post
title: RubyのHashのdefaultで地味にハマった
date: 2012-07-19 09:02:00 UTC
updated: 2012-08-24 13:57:54 UTC
comments: false
categories: blog
tags: Ruby
---
{% include JB/setup %}

↓のようにハッシュのデフォルト値を決められるんだけど、<br /> <pre class="brush:ruby"><br />hash = {}<br />hash.default = 1<br /><br />puts hash[:a]  # =&gt; 1<br />puts hash[100] # =&gt; 1<br /></pre> じゃー↓はどうなるか？っつーと  <pre class="brush:ruby"><br />hash = {}<br />hash.default = []<br /><br />p hash[:a]    # => []<br />hash[:a] << 1<br /><br />p hash[:hoge] # => [1]<br /></pre> こうなる。 ドキュメントにはこうして例外出すのがいいと思うよ、と書いてある。  <pre class="brush:ruby"><br />hash = Hash.new([].freeze)<br /># hash.default = [].freeze としてもよい<br /><br />p hash[:a]      # => []<br />hash[:a] << 1 # ここで例外が出る<br /></pre> Hash#default= の方を先に知ってしまって、そちらには特にそういう注意点が書かれてなかったのでプチハマりしたという話です。 でも、↓みたいに書かずに済むのかな、と思って書いたので、うーんな感じ。  <pre class="brush:ruby"><br />hash = {}<br /><br />hash[:a] = [] if hash[:a].nil?<br />hash[:a] << 1<br /></pre> で、閃いた。。  <pre class="brush:ruby"><br />hash = Hash.new([].freeze)<br /><br />hash[:a] += [1]<br />hash[:a] += [2]<br />hash[:b] += [3]<br /><br />p hash # => {:a=>[1, 2], :b=>[3]}<br /></pre> これでいいのか、、これまでのコード、、ぐぬぬ、、