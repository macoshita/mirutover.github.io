---
layout: post
title: "Github Pages で Google AdSense のモバイル/PC 出し分け"
description: ""
category: blog
tags: []
---
{% include JB/setup %}

## Google AdSense のレスポンシブデザイン対応

[こちらのブログ](http://okaoka.net/2013/06/06/adsense-esponsive.html)を読んで知ったのですが、Google AdSense のポリシーが改定され、php やらなんやらで広告を出しわけなくても、JavaScript で出し分けられるようになりました。

Google 公式の情報はこちら→ <http://adsense.blogspot.jp/2013/05/updates-to-our-modifying-ad-code-policy.html>

何が嬉しいかって、**github pages で運用しているブログでも、広告の出し分けが可能になった**ことです。

前のブログでは AdSense を貼っていたんですが、このブログに移動してから「そういやポリシー的にモバイルと出し分け無理じゃん」と気付き、まぁもともとアフィの勉強用だったしいいかーくらいで放置していたところにこのニュース。らっきーらっきー。

## 公式より少しお行儀の良いコード

で、[こちら](https://support.google.com/adsense/answer/1354736?hl=en&topic=1271508&ctx=topic#sourceid=aso&subid=ww-en-et-asblog_2013-05-23&medium=link)に公式のコードはあるのですが、width がもろグローバル変数なので、このブログではこんなふうにしてます。

```javascript
google_ad_client = "ca-pub-2880839926756664";

(function(width) {
  if (width < 728) {
    /* 虫けらロック モバイル */
    google_ad_slot = "3777583297";
    google_ad_width = 320;
    google_ad_height = 50;
  } else {
    /* 虫けらロック PC */
    google_ad_slot = "4056784894";
    google_ad_width = 728;
    google_ad_height = 90;
  }
})(document.documentElement.clientWidth);
```

まぁ無名関数でくくっただけですけどね。あとは、メディアクエリを利用して位置を調整してるくらいです。
