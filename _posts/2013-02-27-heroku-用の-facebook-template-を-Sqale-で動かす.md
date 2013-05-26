---
layout: post
title: heroku 用の facebook template を Sqale で動かす
date: 2013-02-27 14:14:00 UTC
updated: 2013-02-27 14:16:58 UTC
comments: false
categories: blog
tags: Facebook Sqale Ruby
---
{% include JB/setup %}

facebook の dev center から facebook アプリを作るとき、heroku にサンプルアプリをデプロイするかどうか選べる。出た当初は「すげぇ！　あと書き換えて push するだけじゃん！」って思ったもんだ。でも、正直 heroku は日本国内から使うにはちょっとだるいというのが自分の印象で、通信が重いからデプロイするのもログ見るのも遅くてグンニョリする。

ところが最近は、先日のブログでも書いたけれど Sqale だったり mogok だったり ruby 系の国産 PaaS が増えてきてて、結構いい感じに動いてくれる。
と、[Sqale のサポートページ](https://sqale.jp/support)を見てたら [FOREMAN](http://ddollar.github.com/foreman/) に対応してたり postinstall が使えるようになってたりしてて、heroku でデプロイしてるやつを移行するのも簡単そうだなと思い、試しに facebook テンプレートアプリを動かしてみた。

## Sqale と facebook の準備

### Sqale
[sqale のダッシュボード](https://sqale.jp/dashboard) から新しいアプリを作る。仮に **fb-test** で取ったとして話を進める。あと公開鍵の設定は終わってる前提で。前のブログにも書いたけど、１アプリに付き１５日無料なので、躊躇わずアカウントとって遠慮せず作るべし。

数十秒でアプリが出来上がり、リロードすると下記の画面が表示される。

[![Sqale Dashboard][sqale]][sqale]

### facebook
[https://developers.facebook.com/apps](https://developers.facebook.com/apps) からアプリを作る。適当な名前とネームスペースを入れて決定するだけ。

作成後、「App Domains」と「Facebook でログインするサイト」を Sqale で作ったアプリの URL を指定してやる。

[![facebook apps][fb]][fb]

ここの、App ID と App Secret は後で必要になる。

## heroku テンプレートアプリの clone & git リポジトリ追加
[heroku の facebook テンプレートアプリ](https://github.com/heroku/facebook-template-ruby)は github にあるので、clone してくる。

```
git clone git://github.com/heroku/facebook-template-ruby.git
```

次に Sqale の git リポジトリをコピーして、先程 clone したディレクトリに移動しリポジトリを追加する。

```
cd facebook-template-ruby
git remote add sqale ssh://sqale@gateway.sqale.jp:2222/mirutover/fb-test.git
```

## clone したアプリを Sqale 用に編集

### .env と postinstall
Facebook のキーを入れるため、.env ファイルを作り、下記のように記述する。

```
FACEBOOK_APP_ID={さっきの App ID}
FACEBOOK_SECRET={さっきの App Secret}
```

これを commit して push するのはどうよって話なので、.gitignore にすでに書かれている。なので、[こちらのページ](https://sqale.jp/support/manual/faq-technical#secret-env)にある通り、postinstall を用意する。下記のように記述。shebang 必須。

```
#!/bin/sh

cp /home/sqale/etc/.env /home/sqale/current/
```

### Procfile
FOREMAN 用の設定ファイル Procfile をいじる。heroku だと web: 〜 とかなってるのを、[こちら](https://sqale.jp/support/manual/change-web-server) の thin 用の設定ファイルに書き換える。

```
app: bundle exec thin --socket /var/run/app/app.sock start
```

### app.rb
この項目は後々消すかもしれない。テンプレートアプリ、動かないんだ。多分バグだと思う。app.rb を下記のように書き換えてやれば動く。

```
--- a/app.rb
+++ b/app.rb
@@ -48,7 +48,7 @@ helpers do
 
   # allow for javascript authentication
   def access_token_from_cookie
-    authenticator.get_user_info_from_cookies(request.cookies)['access_token']
+    @access_token ||= authenticator.get_user_info_from_cookies(request.cookies)['access_token']
   rescue => err
     warn err.message
   end
```

原因は facebook SDK の koala の[この pull request](https://github.com/arsduo/koala/pull/268) を読む限り、fb の仕様変更→ koala の get_user_info_from_cookies メソッドが仕様変更→テンプレートアプリが対応してない　……だと思う。pullreq 投げるかなー。

### commit
全部編集したら git add . して git commit -a

## Sqale にデプロイする

### .env を配置
まず SSH して .env を置いておく。SSH は Sqale のダッシュボードにコマンドが書かれてるので、それをコピペでいけるはず。

```
ssh -p 2222 sqale@gateway.sqale.jp
```

SSH できたらホームディレクトリに etc ディレクトリを作って .env をコピー

```
mkdir etc
vi etc/.env
logout
```

### ソースコードをデプロイ
最後に、ログアウトして、下記コマンドでデプロイするのみ。

```
$ git push sqale master
Counting objects: 174, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (78/78), done.
Writing objects: 100% (174/174), 127.35 KiB, done.
Total 174 (delta 79), reused 167 (delta 77)
To ssh://sqale@gateway.sqale.jp:2222/mirutover/fb-test.git
 * [new branch]      master -> master
```

## 起動確認
うまく動いていれば、facebook でログインするページが表示されて、ログインするとあなたの顔写真やら名前やら友達リストやらが表示されるはず。

うまく動かないなら、SSH 接続して /var/log/app のログを確認したり ps コマンドで foreman プロセスがちゃんと動いてるか確認したりしてなんとかしよう！

## まとめ
もっと軽く書くつもりが割と力が入っている気がした今日この頃。

[sqale]: http://2.bp.blogspot.com/-502NmPYtZq4/US4SO7ufXpI/AAAAAAAAA6c/aBDTIL3oh80/s320/5b7c6597-a815-4bb5-9c5f-c552044472b0.jpeg
[fb]: http://4.bp.blogspot.com/-DURf1R4JkGE/US4TbL3HKwI/AAAAAAAAA6o/FKBtvvk9xsY/s320/44f3c05c-7013-4de8-98cc-29ea50a61f9a.jpeg