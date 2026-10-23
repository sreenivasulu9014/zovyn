import React from "react";
import { BlogPost } from "@/types/job";

interface ArticleSchemaProps {
  post: BlogPost;
  url: string;
}

export function ArticleSchema({ post, url }: ArticleSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Organization",
      "name": post.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "zovyn.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zovyn.in/logo.png",
      },
    },
    "datePublished": post.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
