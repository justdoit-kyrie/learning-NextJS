import { GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export interface PostsListPageProps {}

export default function PostsListPage(props: PostsListPageProps) {
  const router = useRouter();
  const [postList, setPostList] = useState([]);
  const page = Number(router.query.page);

  console.log("Router query", router.query);

  const handleNextPage = () => {
    router.push(
      {
        pathname: "/posts",
        query: {
          page: (page || 1) + 1,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  useEffect(() => {
    if (!page) return;

    (async () => {
      const response = await fetch(
        `https://js-post-api.herokuapp.com/api/posts?_page=${page}`
      );

      const { data } = await response.json();

      setPostList(data);
    })();
  }, [page]);

  return (
    <div>
      <h1>Post List Page</h1>
      <ul className="post-list">
        {postList.map((post: any) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button onClick={handleNextPage}>Next Page</button>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  console.log("GET STATIC PROPS");

  return {
    props: {},
  };
};
