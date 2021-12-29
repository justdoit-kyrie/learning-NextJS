import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import * as React from 'react';

export interface PostDetailPageProps {
  post: any;
}

export default function PostDetailPage({ post }: PostDetailPageProps) {
  return (
    <div>
      <h1>Post Detail Page</h1>

      <p>Post detail</p>
      <p>{post.title}</p>
      <p>{post.description}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`https://js-post-api.herokuapp.com/api/posts`);

  const data = await response.json();

  const newData = data.map((post: any) => ({
    params: {
      postId: post.id,
    },
  }));

  return {
    paths: newData,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const postId = context.params?.postId;
  console.log('GET STATIC PROPS', postId);
  if (!postId)
    return {
      props: {},
    };

  const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`);

  const data = await response.json();

  return {
    props: {
      post: data,
    },
  };
};
