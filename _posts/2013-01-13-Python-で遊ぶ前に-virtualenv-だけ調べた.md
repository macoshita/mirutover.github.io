---
layout: post
title: Python で遊ぶ前に virtualenv だけ調べた
date: 2013-01-13 06:48:00 UTC
updated: 2013-01-13 06:53:48 UTC
comments: false
categories: blog
tags: Python
---
{% include JB/setup %}

<p>どうも、普段は Ruby をおさわりしている私です。</p> <p>blogger API を使ってみようと思ったんだけど、ruby 版のクライアントがα版で、かつ google ってこともあり（google は python を含む４言語をメイン言語と定めてるらしい）、まぁ python で書くかと決意。</p> <p>と、どうやら XCode のコマンドラインツールを入れたことで、python 2.7 が既に入っちゃってるようだ。じゃーあとは pip で適当にインストールして作っていくかと思ったけど、「まてよ、これって ruby 的には gem install してる感じで、忘れた頃に効いてくるボディーブロー的なアレだな」と思い直して、最低限 <a href="http://pypi.python.org/pypi/virtualenv">virtualenv</a> は勉強しとくかと思った。</p> <h2>virtualenv</h2> <p>名前の通り、仮想的な環境を作る。その環境下でインストールしたものは、その環境下でしか有効にならないので、本体の環境を汚さない。</p> <h3>環境を作る</h3> <p>2.7 系と、試しに 2.6 の開発環境を作ってみる。私の場合 .pyenv というディレクトリをホームに作り、その中に色々な環境を入れていくことにした。また、（多分）XCode のコマンドラインツールを入れたことで、python2.7 と python2.6 というコマンドが予めインストールされている。</p> <pre class="brush:bash"><br />mkdir ~/.pyenv<br />virtualenv -p python2.7 ~/.pyenv/2.7<br />virtualenv -p python2.6 ~/.pyenv/2.6<br /></pre>  <p>試してないが、-p オプションで python の実行ファイルを指定してやらないと mac では問題が起きるらしい。 実行すると、下記のような表示があり、setuptools や pip がインストールされることがわかる。</p> <pre><code>Installing setuptools............................done.<br />Installing pip...............done.<br /></code></pre> <p>あとは、下記のように環境を切り替えて遊ぶ。</p> <pre><code>$ . ~/.pyenv/2.7/bin/activate<br />(2.7)$ python --version<br />Python 2.7.2 # &lt;- 2.7環境になっている<br />(2.7)$ deactivate<br />$ . ~/.pyenv/2.6/bin/activate<br />(2.6)$ python --version<br />Python 2.6.7 # &lt;- 2.6環境になっている<br /></code></pre> <h2>雑感</h2> <h3>rbenv が近い？</h3> <p>ruby で言えば rbenv が近いのかなと思った。rbenv はホームディレクトリに .rbenv ってディレクトリを作って、その中で 1.9.3 とか 1.8.7 とかそれぞれ個別の環境がつくれるツール。</p> <p>で、例えば 1.9.3 で gem install しても、別の環境ではそのパッケージは利用できないので、一応 virtualenv みたいな使い方はできるけど、ruby のパッケージ管理はほとんどの場合 bundler で行われてるから、rbenv はあくまで ruby を切り替えるものというイメージが強い。</p> <h3>virtualenvwrapper</h3> <p>virtualenv を簡単に使える wrapper らしい。でも、そんな頻繁に切り替えるつもりもないので、とりあえずは virtualenv のみ入れてみた。</p>