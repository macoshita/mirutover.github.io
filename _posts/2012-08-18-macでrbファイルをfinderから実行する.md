---
layout: post
title: macでrbファイルをfinderから実行する
date: 2012-08-18 13:04:00 UTC
updated: 2012-08-24 13:57:54 UTC
comments: false
categories: blog
tags: Mac Ruby
---
{% include JB/setup %}

rubyでちょっとしたファイル操作をするスクリプト（特定のディレクトリ構成を作成するようなもの）を作ったのだけど、いちいちターミナルから実行しなきゃならないのは不便なので、何とかしようと調べてみたけど、多分いちばん簡単なのはこれ。<br /><br /><ul><li>rubyスクリプトを書く</li><li>.command拡張子に変更</li><li>chmodで実行権限を付与</li></ul><br />で、気をつけるのはスクリプトの実行ディレクトリがユーザのホームディレクトリになるので、頭で下記のような処理を入れてやる必要がある。<br /><pre class="brush:ruby">#!/usr/bin/ruby<br />Dir.chdir File.dirname(__FILE__)</pre>ただ、macでやるならautomator?とか使うほうがスマートなのかもしれない……。正直macを表面でしか使えてない感が強いなぁ。