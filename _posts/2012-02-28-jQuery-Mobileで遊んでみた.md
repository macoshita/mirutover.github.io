---
layout: post
title: jQuery Mobileで遊んでみた
date: 2012-02-28 05:37:00 UTC
updated: 2012-03-01 02:59:26 UTC
comments: false
categories: blog
tags: 
---
{% include JB/setup %}

今更だけど、jQuery Mobileを触ってみた。で、iPhoneやAndroidで動かしてみた。<br /><ul><li>見た目がiPhoneでもAndroidでも同じ感じになる</li><li>適当にパーツを組むだけで結構それっぽくなる</li><li>やっぱjQueryのDOM操作は楽でいい</li><li>タッチイベントの端末差異吸収がデカイ</li></ul>というところは、お手軽ウェブアプリ制作には必須と言ってもいいツールだよなと感じつつも。<br /><b><br /></b><br />……Androidが微妙すぎる……。<br /><br />リストから遷移するときの動きがカクカク、たまに１度に２ページ飛んでしまう。<br />また、fixedなフッターの動きが微妙すぎる。カクカクするし、アニメーション切ってるのに時々アニメーションするし、たまにボタン効かないし、たまにボタンのフォーカス外れるしでかなり微妙。<br />私のコードが悪いのかと思って<a href="http://jquerymobile.com/demos/1.0/docs/toolbars/footer-persist-a.html" target="_blank">公式サイト</a>の例を見たけど、同じことが起こるのでガッカリ(´・ω・｀)<br /><br />ただ、これはjQueryの問題じゃなくて、Android 2.3のブラウザの動作速度に問題があるような気もする。しかし、今や半数はandroidなわけで、そっちの見栄えを完全無視もつらい……。<br /><br />とはいえ、現状でもモックを作るのはかなり簡単だし、あくまで差異を吸収するためだけに、安定したパーツを使うだけと割り切れば、結構いいのかもしれない。<br />sencha touchの方が動作感が良くて、非常に悩みどころだけど……。