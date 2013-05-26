---
layout: post
title: Windows で Vagrant の plugin をインストールするまでのハマりどころ
date: 2013-04-23 01:41:00 UTC
updated: 2013-04-23 01:42:25 UTC
comments: false
categories: blog
tags: Windows Vagrant
---
{% include JB/setup %}

こちらのブログにかなり助けられました。ありがとうございます。

[かなりはまりどころが多い windows に Vagrant 1.1 で sandbox ( sahara )](http://d.hatena.ne.jp/nazoking/20130409/1365486067)

私が入れたのは vagrant-berkshelf だったので、要点だけ。

## 環境
- Windows 7
- Vagrant 1.2.1

## 内容
要するに、vagrant に embed してる gem コマンドが gcc を見つけられないのが問題っぽい（中身は rubyinstaller の devkit なのかな？）。

## 手順
C:¥Program Files (x86)¥HashiCorp¥Vagrant にインストールしたとする。このディレクトリ構成は 1.2 かららしい。

- メモ帳とか適当なテキストエディタを右クリックして管理者権限で起動
- C:¥Program Files (x86)¥HashiCorp¥Vagrant¥embedded¥config.yml の中のパスを、"C:/Program Files (x86)/HashiCorp/Vagrant/embedded" に変更
- コマンドプロンプトを管理者権限で開き、下記で devkit を上書きインストール
```bat
cd C:¥Program Files (x86)¥HashiCorp¥Vagrant¥embedded
bin¥ruby.exe dk.rb install -f
```

## 試す
私は berkshelf のプラグインを入れたかったので、
```
vagrant plugin install vagrant-berkshelf
```
で無事 OK。やれやれ。