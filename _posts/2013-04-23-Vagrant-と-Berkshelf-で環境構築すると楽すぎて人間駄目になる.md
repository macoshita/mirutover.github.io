---
layout: post
title: Vagrant と Berkshelf で環境構築すると楽すぎて人間駄目になる
date: 2013-04-23 10:10:00 UTC
updated: 2013-04-23 10:11:14 UTC
comments: false
categories: blog
tags: Berkshelf Vagrant Node
---
{% include JB/setup %}

エンジニアの歴史はいかに楽をするかの歴史。ということで、Vagrant だけでもう十分楽してた私が、Berkshelf を使ってさらに楽をして駄目人間を目指す話。

## 前提

Vagrant を使って VM を立てるまでは確認してあるほうが良い。[Vagrant](http://www.vagrantup.com/) の Getting Start くらいは通してあるとよさげ。

### 用語

- [VirtualBox](https://www.virtualbox.org/)
    - 有名な仮想環境構築ツール。
    - windows だと[何かとハマる](http://mirutover.blogspot.jp/2013/04/vagrant-ssh-windows-ssh-teraterm.html)ので、mac オススメ。でも、苦労はしたけど Windows 7 ではうまく動いた。
- [Vagrant](http://www.vagrantup.com/)
    - virtualbox の CLI 型ツール。他の仮想環境にも対応してるけど未確認。EC2 だけちらっと試した（仮想じゃないけど）。
- [Berkshelf](http://berkshelf.com/)
    - Chef のクックブックを bundler みたいに管理できるツール
    - Chef についてはググろう。でも今回はそこまで詳しくなくて OK。

## 各種インストール
- VirtualBox は普通に最新版をインストール。
- Vagrant もパッケージをダウンロードしてインストールする。昔は gem だったけど、今は公式もこの方法が推奨。
- vagrant のプラグインをインストールする
    - 手前味噌だけど[こちらのエントリ](http://mirutover.blogspot.jp/2013/04/windows-vagrant-plugin.html)を読んで準備
    ```bash
    vagrant plugin install vagrant-berkshelf
    ```
    - ハマったのがこれ。タイミングが悪すぎたんだけど、**vagrant-berkshelf にリネームしてる。**ほんの一週間前くらいに README が更新されててムキー。

berkshelf 自体はとりあえず不要なので、ruby 入ってない人は入れなくても OK。berks cookbook myvagrant とかするとひな形作られるから楽っちゃ楽なんだけど、ファイルが大量にできるので、私の場合は最初シンプルにってことでそれを全捨てした。

## 各種設定ファイルの準備
適当に myvagrant とかディレクトリを作っておく。

その中に下記の２つのファイルを設置。今回は、nodejs を入れる設定で試してみる。

- Vagrantfile
- Berksfile

### Vagrantfile

```ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  # VM settings
  config.vm.box = "CentOS-6.4-x86_64-v20130309"
  config.vm.box_url = "http://developer.nrel.gov/downloads/vagrant-boxes/CentOS-6.4-x86_64-v20130309.box"

  # Berkshelf settings
  config.berkshelf.enabled = true

  # chef-solo settings
  config.vm.provision :chef_solo do |chef|
    chef.run_list = [
      "recipe[nodejs::install_from_binary]"
    ]
  end
end
```

nodejs::install_from_binary でバイナリインストール。ただし redhat 系のしか無理なので、ubuntu 使う方は nodejs::install_from_package で。ソースからインストールもできる。

vagrant で使う box は Chef の入った CentOS 6.4 のミニマムなやつにしてみた。もちろん、既に add してる box がある人は、config.vm.box にその名前を入れてもいい。

ちなみに nrel は[国立再生可能エネルギー研究所](http://ja.wikipedia.org/wiki/%E5%9B%BD%E7%AB%8B%E5%86%8D%E7%94%9F%E5%8F%AF%E8%83%BD%E3%82%A8%E3%83%8D%E3%83%AB%E3%82%AE%E3%83%BC%E7%A0%94%E7%A9%B6%E6%89%80)らしい。まぁさすがに信用できるだろうけど、そのうちちゃんと自分で box 作ろうと思う。

### Berksfile

```ruby
site :opscode

cookbook 'nodejs'
```

opscode から [nodejs のクックブック](http://community.opscode.com/cookbooks/nodejs)を取ってくる。

## vagrant up

設定も書き終わったので、早速 vagrant up してみる。

```
cd myvagrant
vagrant up
```

最初は box のダウンロードに時間かかったりするけど、辛抱強く待つ。もしかしたら vagrant box add しといた方が楽かもしれない。

```
[Berkshelf] Updating Vagrant's berkshelf: 'C:/Users/~'
[Berkshelf] Using nodejs (1.1.2)
[Berkshelf] Using build-essential (1.4.0)
[Berkshelf] Using apt (1.9.2)
```

こんな感じのログが出て、クックブックをどこからか取ってくる。nodejs に build-essential と apt が依存してるので、それも取ってきてくれる。

```
[default] Creating shared folders metadata...
[default] Clearing any previously set network interfaces...
[default] Preparing network interfaces based on configuration...
[default] Forwarding ports...
[default] -- 22 => 2222 (adapter 1)
[default] Booting VM...
[default] Waiting for VM to boot. This can take a few minutes.
```

ここまでで VM が立ち上がって、

```
[default] Running provisioner: chef_solo...
Generating chef JSON and uploading...
Running chef-solo...
[2013-04-23T09:38:48+00:00] INFO: *** Chef 11.4.0 ***
[2013-04-23T09:38:49+00:00] INFO: Setting the run_list to ["recipe[nodejs::install_from_binary]"] from JSON
[2013-04-23T09:38:49+00:00] INFO: Run List is [recipe[nodejs::install_from_binary]]
[2013-04-23T09:38:49+00:00] INFO: Run List expands to [nodejs::install_from_binary]
[2013-04-23T09:38:49+00:00] INFO: Starting Chef Run for localhost
[2013-04-23T09:38:49+00:00] INFO: Running start handlers
[2013-04-23T09:38:49+00:00] INFO: Start handlers complete.
[2013-04-23T09:38:49+00:00] INFO: Processing remote_file[/usr/local/src/node-v0.10.2-linux-x64.tar.gz] action create_if_missing (nodejs::install_from_binary line 39)
[2013-04-23T09:39:07+00:00] INFO: remote_file[/usr/local/src/node-v0.10.2-linux-x64.tar.gz] updated
[2013-04-23T09:39:07+00:00] INFO: remote_file[/usr/local/src/node-v0.10.2-linux-x64.tar.gz] mode changed to 644
[2013-04-23T09:39:07+00:00] INFO: Processing ruby_block[verify_sha_sum] action run (nodejs::install_from_binary line 52)

[2013-04-23T09:39:07+00:00] INFO: ruby_block[verify_sha_sum] called
[2013-04-23T09:39:07+00:00] INFO: Processing execute[install package to system] action run (nodejs::install_from_binary line 64)
[2013-04-23T09:39:08+00:00] INFO: execute[install package to system] ran successfully
[2013-04-23T09:39:08+00:00] INFO: Chef Run complete in 19.094028762 seconds
[2013-04-23T09:39:08+00:00] INFO: Running report handlers
[2013-04-23T09:39:08+00:00] INFO: Report handlers complete
```

一気に終了。vagrant ssh で VM に入って、確認。

```
$ node -v
v0.10.2
```

バッチリ入ってる！　ちょーテンション上がる！

## 余談

こんな短い設定ファイルで環境作れるとか、人間駄目になるなと思った。もっと駄目になっていきたい。

他にも rbenv + ruby_build を入れてみたり、vim を入れてみたりしたけども、どれも滞り無く実行された。

妄想だけど、こいつでガリガリ chef のテストをして、満足行く感じになったら vagrant の ec2 連携でインスタンス作れたら、もうちょっと人間駄目になれる気がする。

あ、私は**まだ本番環境構築とかには使ってない**ので、そこら辺はご了承願いたい。

あと opscode の cookbook はいろんな OS に対応するために冗長なので、素直に cookbook を書いたほうがいい場合も多い。ということで、Chef 知らなくてもここまではできるけど、ここから先のカスタマイズには Chef の知識が必要になる。

ということで、これから頑張ります（