---
layout: post
title: VirtualBox, CentOS, Guest Additionsを入れて共有フォルダ作成
date: 2012-08-22 13:26:00 UTC
updated: 2012-08-24 13:51:09 UTC
comments: false
categories: blog
tags: CentOS VirtualBox
---
{% include JB/setup %}

とは言ってもGuest Additions入れるとこは正直うろ覚え……。<br /><br /><a href="http://www.virtualbox.org/manual/ch04.html#mountingadditionsiso">http://www.virtualbox.org/manual/ch04.html</a><br />システムメニューの「デバイス」→「Guest Additionsのインストール」を選択<br />するとインストールCDが入るので、<br />mkdir /mnt/cdrom<br />mount -r /dev/cdrom /mnt/cdrom<br />ドキュメントにある通りgccを入れる<br />yum install gcc-g++<br />あとはインストール<br />cd /mnt/cdrom<br />./VBoxLinuxAdditions.run<br /><br />だいたいこんな感じだったはず……。多分抜けがあるのであまり参考にしないでください。<br /><br /><b>共有フォルダ</b><br />VMのGUIな設定画面から適当に追加<br />自動マウントにしておけば、/media/sf_〜にマウントされる<br />で、このままだとrootでしかアクセス出来ない……どうしたものか……と思ってたら、<br /><a href="http://d.hatena.ne.jp/ytooyama/20110317/1300336490">http://d.hatena.ne.jp/ytooyama/20110317/1300336490</a><br />vboxsfってグループ権限がついてるじゃないっすかーやだー。ググる前に気づけ俺。。ってことで、<br />usermod -G vboxsf -a ユーザ名<br />で無事解決。めでたしめでたし