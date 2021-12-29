import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { useEffect, useState } from 'react';

export interface ParamsPageProps {
  query: any;
  post: any;
}

export default function ParamsPage({ query, post }: ParamsPageProps) {
  const [counter, setcounter] = useState(0);

  useEffect(() => {
    const waitTimer = setInterval(() => {
      setcounter((prev) => {
        if (prev > 60) clearInterval(waitTimer);
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(waitTimer);
  }, []);

  return (
    <div>
      <h1>Params Page</h1>

      <h2>Timer: {counter}</h2>

      <h2>Post Detail</h2>
      <p>{post?.title}</p>
      <p>{post?.description}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  context.res.setHeader('Cache-Control', 'public, s-maxage=5');

  const postId = context.query.postId;
  if (!postId)
    return {
      props: {
        query: context.query,
      },
    };

  const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`);

  const data = await response.json();

  return {
    props: {
      query: context.query,
      post: data,
    },
  };
};
