---
layout: post
title: bundle package
date: 2012-02-09 09:38:00 UTC
updated: 2012-08-24 13:59:15 UTC
comments: false
categories: blog
tags: JavaScript Vim Ruby
---
{% include JB/setup %}

<a href="http://gembundler.com/bundle_package.html" target="_blank">http://gembundler.com/bundle_package.html</a><br /><pre class="brush:bash">bundle package<br /></pre>これを叩くと、vendor/cacheに各種ライブラリのgemがキャッシュされる。<br />vendor/bundleを含まないようにアーカイブにしてデプロイ先に置いた後、<br /><pre class="brush:bash">bundle install --local</pre>と叩けば、rubygems.orgとかにアクセスせず、vendor/cacheのgemを利用してインストールされる。<br />デプロイ速度向上やgemが無くなった時に役立つのかな。