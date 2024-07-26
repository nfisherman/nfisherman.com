---
layout: pages/blog/index.liquid
title: featured pages
---

# ヾ(☆▽☆) welcome to my blog !!
<br>

## pinned posts

{% for post in collections.pinned %}
    {% include '_blog/feed.liquid' %}
{% endfor %}