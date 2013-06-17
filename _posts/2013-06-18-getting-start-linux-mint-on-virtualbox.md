---
layout: post
title: "Getting Start Linux Mint on VirtualBox"
description: ""
category: blog
tags: ["Mint", "VirtualBox"]
---
{% include JB/setup %}

## GUI Linux on VirtualBox

あんまり Windows 触る気しないんだけど完全に捨てられない、そんな世の中ですね。

**そこで GUI Linux ですよ**という神の声が聞こえた気がしたので、とうとう GUI Linux に手を出してみました。きっかけは VirtualBox のシームレスモードを見せてもらったことと、その導入が楽だと聞いたこと。

シームレスモードの良さは、こちらの動画が教えてくれます。アツい。これなら、ブラウジングやソフトの充実なんかの Windows の良さと、Linux の開発しやすさが融合できるんじゃないか、と目論んだわけです。

<iframe width="560" height="315" src="http://www.youtube.com/embed/zaz42-LQbmY" frameborder="0" allowfullscreen></iframe>

ということで、今回は Mint on VirtualBox の作業ログ。Ubuntu や Mint についてはドのつく初心者なので、大目に見るか突っ込んで上げてください。大半が会社の人に聞いた受け売りです。

## Mint OS

OS は [Linux Mint](http://www.linuxmint.com/) にしてみました。いい加減 RedHat 系以外のも触ってみようかなというのと、基本 Ubuntu でググればどうにかなると聞いたのと、Ubuntu Unity はいまいち、、と聞いたので。

### Cinnamon と MATE

Mint は Cinnamon と MATE という 2 つのデスクトップを選択できまして、ざっくり言うと Cinnamon が Gnome 3 ベース、MATE が Gnome 2 ベースらしいです。**VirtualBox のシームレスモードは Gnome 2 じゃないとうまく動かないらしい？　と聞いて（未確認）**、MATE の方を選びました。

で、日本のミラーがないのでシンガポールからダウンロード。話を聞いたら、日本の特許法やら不正競争防止法やらに引っかかるから JAIST とか有名所が配布やめちゃったらしい。コーデックあり版となし版があるのは、そういう国に対応するためらしい。めんどくさい話だなー。まぁ、動画やブラウジングは Windows でやるつもりなので、no codec を選びました。

## VirtualBox 設定と Mint インストール

メモリ 1 GB のハードディスク 16 GB に設定しました。メモリは 8 GB あるんで余裕ありますが、ディスクが結構つらい。。とは言っても昔からしたら贅沢な話やで。設定したら↑で落としたディスクを入れて起動。

Mint インストール画面は他の OS と比べてわかりやすいですね。変えたのは日本語にしたくらいか。YES マンのごとくひたすら OK を押し続け、再起動して終了。

## Guest Addition

これはシームレスモードに必須です。シームレスモード使わなくても、共有フォルダも使えるようになるし、ジェスチャーも有効になるので、入れといたほうが得。

メニューからインストールを選んでディスクを挿入。

![virtualbox guest additions](/assets/images/2013-06-18-virtualbox-guest-additions.png)

オートランうんぬん出てくるけどそこはスルーしてターミナルを開き、下記コマンドを入力。username は書き換えて。まぁ、簡単ですね。

``` bash
cd /media/{username}/VBOXADDITIONS_4.2.XXXXX
sudo ./VBoxLinuxAdditions.run
```

## 日本語入力

「Ubuntu 日本語」でググればわかりますが、Ubuntu は日本語サポートが標準で入らないんですね。で、日本チームが「日本語 Remix イメージ」を配布しててそれで Ubuntu を入れるか、リポジトリを追加して自分でインストールするからしいです。

下記ページにその辺りの情報は全部乗っていて、方法 2 の手順を実行したら日本語入力ができるようになりました。私の入れたのは Mint 15 で Ubuntu 13.04 ベースなので途中で分岐してる手順は 13.04 のもので実行。

<http://www.ubuntulinux.jp/japanese>

## キー配置

私は半角全角キーを無効化して変換・無変換キーを mac っぽく「かなON」「かなOFF」にしてます。

Mint はインプットメソッドとして [iBus](http://ja.wikipedia.org/wiki/IBus) を利用することになり、こいつがそのあたりをカスタマイズできるようになっています。

Windows スタートボタンのようなメニューボタンから ibus と検索して、キーボード・インプットメソッドを起動すると、あとはなんとなく察せると思います。

![ibus settings](/assets/images/2013-06-18-ibus-settings.png)

## シームレスモード

右 Ctrl + L でシームレスモードに移行できます。ここは私は特にハマりもなく、、って感じなので、なんともｗ

## まとめ

思ったより Mint 導入とかでハマらなかったのでよかったです。ガッツリ使うのはこれからになると思うので、あとあとになって分かってくることもあると思うけど。
