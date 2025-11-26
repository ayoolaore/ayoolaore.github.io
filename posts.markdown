---
layout: page
title: Posts
permalink: /posts/
---

<div class="posts-container">
  {% if site.posts.size > 0 %}
    {% for post in site.posts %}
      <article class="post-card">
        <h2>
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h2>

        <div class="post-meta">
          <span class="post-date">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 4px;">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {{ post.date | date: "%B %-d, %Y" }}
          </span>

          {% if post.categories.size > 0 %}
            {% for category in post.categories %}
              <span class="post-category">{{ category }}</span>
            {% endfor %}
          {% endif %}
        </div>

        {% if post.excerpt %}
          <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
        {% endif %}

        <a href="{{ post.url | relative_url }}" class="read-more">
          Read more
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-left: 4px;">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </article>
    {% endfor %}
  {% else %}
    <p class="no-posts">No posts found. Check back soon!</p>
  {% endif %}
</div>

<style>
  .posts-container {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
  }

  .post-excerpt {
    margin: var(--space-md) 0;
    line-height: 1.7;
  }

  .read-more {
    display: inline-flex;
    align-items: center;
    color: var(--accent-primary);
    font-weight: 600;
    font-size: var(--text-sm);
    transition: all var(--transition-fast);
    margin-top: var(--space-sm);
  }

  .read-more:hover {
    color: var(--accent-secondary);
    transform: translateX(4px);
  }

  .read-more svg {
    transition: transform var(--transition-fast);
  }

  .read-more:hover svg {
    transform: translateX(4px);
  }

  .no-posts {
    text-align: center;
    color: var(--text-tertiary);
    font-size: var(--text-lg);
    padding: var(--space-3xl) 0;
  }
</style>
