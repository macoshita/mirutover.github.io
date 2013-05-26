---
layout: post
title: vagrant ssh を Windows でもできるように ssh コマンド作った（teraterm 編）
date: 2013-04-11 04:09:00 UTC
updated: 2013-04-23 01:43:17 UTC
comments: false
categories: blog
tags: Windows VirtualBox Vagrant
---
{% include JB/setup %}

なお teraterm 編以外が出来る予定はない模様。

## Vagrant の前準備
Vagrant は VirtualBox とかをコマンドラインでさくさく操作できるツール。詳しい説明は端折る。VirtualBox はそもそもコマンドラインで操作できるんだけど、それをかなり楽にしてくれるような感じ。Windows だと裏は VMWare って選択肢もあるだろうけど、Mac も VirtualBox 使ってるので、Windows でもそっちを使うことにした。

しかし、VirtualBox を動かすまでがなかなかハマる。とりあえず、Vagrant 使う前に VirtualBox で動かしたい OS をインストールする、みたいな操作をやってみて、問題を切り分けたほうがよい。自分は CentOS　を動かすのに下記の BIOS の設定を切り替える必要があった。

<http://qiita.com/items/ba254063df4a9ff15354>

## vagrant ssh
mac とかだと vagrant ssh とコマンド叩けば ssh コマンド使って接続しに行ってくれるんだけど、windows だと当然そんなもの無いから失敗する。で、teraterm とか使ってるならそっちを起動してポート番号とか入れて SSH することになるんだけど、２台立てるとポート番号かわったり（ポートフォワーディングなので）、結構めんどくさい。

でも、実は ssh.bat を echo "hoge" とかくらいで作ってパスを通すと、一応 ssh コマンドを実行してはいてくれてる事がわかる。

ということで、「teraterm を起動する ssh.bat を作ればいいんじゃね？」という発想に行きあたって、こんなのを作った。

<script src="https://gist.github.com/mirutover/5218955.js"></script>

こいつをそこの view raw とかからダウンロードして、ssh.bat という名前で保存し、パスを通せば OK。

実は、ssh.bat 自体は結構むかしに作ってたんだけど、pageant だよりで秘密鍵指定のオプションに対応したりをしてなかったので、そのあたりだけ書き加えた感じ。vagrant 無くてもこいつ結構役に立ってたり。

これでサクサク vagrant up からのー vagrant ssh という具合で操作できるようになった。てか vagrant ssh の重要性でかいわ。