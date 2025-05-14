---
layout: default
title: About Page Moved
permalink: /about/
---

<div style="text-align: center; padding: 50px 20px;">
  <h2>This page has moved</h2>
  <p>Please update your bookmarks. Redirecting you to the new location in 3 seconds...</p>
  <p><a href="{{ '/' | relative_url }}">Click here if you are not redirected automatically</a></p>
</div>

<script>
  setTimeout(function() {
    window.location.href = "{{ '/' | relative_url }}";
  }, 3000);
</script>
