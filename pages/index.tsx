import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Info from "../Components/Home/Info";
import { HomeInfo } from "../Interfaces/Interfaces";
import { connect, dbs } from "../utils/DBConnection";

export default function Home({ posts }: { posts: HomeInfo[] }) {
  console.log(posts, posts.length);

  return (
    <>
      <Header
        title={`KILLER ${new Date(Date.now()).getFullYear()}`}
        description="Killers nya offeciella hemsida. Följ Killer genom hela eventet och missa aldrig nästa sak"
      />
      <br />
      <div className="home">
        <div>
          {posts
            .sort((a, b) => a.index - b.index)
            .map((i, index) => {
              return <Info info={i} key={index} />;
            })}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await connect();
  var posts: HomeInfo[] = await dbs.posts.find();

  var returns: HomeInfo[] = [];
  posts.map((i) => {
    returns.push({
      imageUrl: i.imageUrl,
      title: i.title,
      miniHeader: i.miniHeader,
      text: i.text,
      id: i.id,
      index: i.index,
    });
  });

  return {
    props: {
      posts: returns,
    },
  };
}
