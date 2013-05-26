---
layout: post
title: VMの時間がずれまくってSSH接続やHTTPアクセスが遅くなる件
date: 2012-08-28 13:39:00 UTC
updated: 2012-08-28 13:40:04 UTC
comments: false
categories: blog
tags: 
---
{% include JB/setup %}

なんとなくcairo + sinatraで遊んでたんだけど、やたらHTTPリクエストに時間がかかってる状態だった。<br />問題のマシンはVMだったので、そっち周りで調べてたけどさっぱりで、トイレ入ったらハッと「時間だ」と気づいた。<br />ntpも入ってなかったのでyum install ntpしてntpdate ntp.nict.jpしたら爆速になった。<br />めでたしめでたし。<br /><div><br />……が、VMはとにかく時間がずれる。特にMacスリープした時間分ずれるのが致命的。ntpd使えば……と思うけど、ntpdは<a href="http://www.asahi-net.or.jp/~aa4t-nngk/ntpd.html" target="_blank">ここ</a>や<a href="http://www.eecis.udel.edu/~mills/ntp/html/miscopt.html#tinker" target="_blank">ここ</a>を参考にすると、0.128秒のずれが300秒以上続かなければあわせてくれない、しかも300秒は小さい値にすべきでないとのこと。<br />さらに調べたらどうやらVMは起動時に時間をあわせてくれるようだ。でも普段VMをわざわざ終了させるのもちょっと面倒……。<br /><br />結局、いい案が浮かばないので、なるべくVMの電源を落とすのと、ntpdate ntp.nict.jpとの併用でごまかしてる状態。うーむ。</div>