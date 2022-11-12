import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Info from "../../Components/Home/Info";
import { HomeInfo } from "../../Interfaces/Interfaces";
import { connect, dbs } from "../../utils/DBConnection";

function Link({ post }: { post: HomeInfo | null }) {
  if (post === null) {
    return (
      <div>
        <h1>Vi hittade inget inlägg här!</h1>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{`${post.title} | ${post.miniHeader} | Killer 2022`}</title>
        <meta
          name="description"
          content={"Dagens vapen är en flytväst, bär den ytterst"}
        />
        <meta name="author" content="HawaiiDev" />
        <link rel="shortcut icon" href={post.imageUrl} />
      </Head>
      <Info info={post} />
    </div>
  );
}

export async function getServerSideProps({
  query,
}: {
  query: { [key: string]: string };
}) {
  await connect();
  const post: HomeInfo = await dbs.posts.findOne({ id: query.link });

  if (post === null) {
    return {
      props: {
        post: null,
      },
    };
  }
  const returnPost: HomeInfo = {
    id: post.id,
    imageUrl: post.imageUrl,
    title: post.title,
    miniHeader: post.miniHeader,
    text: post.text,
  };

  return {
    props: {
      post: returnPost,
    },
  };
}

export default Link;
