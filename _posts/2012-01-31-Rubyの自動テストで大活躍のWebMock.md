---
layout: post
title: Rubyの自動テストで大活躍のWebMock
date: 2012-01-31 11:11:00 UTC
updated: 2012-08-24 13:59:15 UTC
comments: false
categories: blog
tags: JavaScript Vim Ruby
---
{% include JB/setup %}

<div>外部サービスにリクエストを投げる部分のテストについて、<b>WebMock</b>という、ウェブアクセスを全てmock化してくれるライブラリを使ってみることに。</div><div><a href="https://github.com/bblimke/webmock" target="_blank">https://github.com/bblimke/webmock</a></div><div>このライブラリがとても素晴らしくて、お陰ですんなりテストを書くことができた。</div><div><br /></div><div>一点だけハマった点としては、すべての外部リクエストがmock化するので、stub_requestで定義していないリクエストが来るとエラーとなること。でもこれは自分がライブラリのコンセプトレベルで勘違いしていただけなので問題なし。</div><div>specを実行時に予期せぬリクエストが来るとエラーとなるんだけど、そのときstubの定義方法まで出力されるので、その通りにリクエストを定義すればよいという親切さ。</div><div>Mashup Awardも終わったけれど、Mashup系のサイトの自動テストでかなり活躍してくれそう。</div><div><br /></div><div><b><u>余談</u></b></div><div>FakeWebというのもあったけど、更新が１年前だったので今はWebMockなのかなと思った。その辺りの空気を読むには、githubの更新とか、あとは<a href="https://www.ruby-toolbox.com/" target="_blank">ruby toolbox</a>なんかを眺めるとかでいいのかな。</div>