import React from 'react';
import { mockBlogPosts } from '../components/Ui/data/mockdata';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/CardComponents';

const BlogPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBlogPosts.map((post) => (
          <Card key={post.id} className="shadow-md">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription className="text-gray-500">{post.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{post.excerpt}</p>
              <a href={`/blog/${post.slug}`} className="text-blue-500 hover:underline">Read more</a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;