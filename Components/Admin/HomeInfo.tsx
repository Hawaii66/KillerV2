import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { HomeInfo } from "../../Interfaces/Interfaces";
import styles from "./info.module.css";

function HomeInfoEditor({ email, jwt }: { email: string; jwt: string }) {
  const [posts, setPosts] = useState<HomeInfo[]>([]);

  const fetchPosts = async () => {
    const url = `/api/server/admin/posts?email=${email}&jwt=${jwt}`;
    const results = await fetch(url);
    const fetchedPosts = await results.json();
    setPosts(fetchedPosts);
  };

  const editPost = (newPost: HomeInfo, index: number) => {
    const old = [...posts];
    old[index] = newPost;
    setPosts(old);
  };

  const save = async () => {
    const url = `/api/server/admin/posts?email=${email}&jwt=${jwt}`;
    const results = await fetch(url, {
      method: "POST",
      body: JSON.stringify(posts),
    });
    alert(await results.text());
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <div className={styles.infoWrapper}>
        {posts.map((post, index) => {
          return (
            <div className={styles.info} key={index}>
              <div className={styles.inputs}>
                <div className={styles.input}>
                  <p>Title</p>
                  <div className={styles.inputx}>
                    <input
                      type={"text"}
                      value={post.title}
                      onChange={(val) => {
                        editPost(
                          {
                            ...post,
                            title: val.target.value,
                          },
                          index
                        );
                      }}
                    />
                    <Button
                      onClick={() =>
                        setPosts((old) =>
                          [...old].filter((i) => i.title !== post.title)
                        )
                      }
                      variant="danger"
                    >
                      X
                    </Button>
                  </div>
                </div>
                <div className={styles.input}>
                  <p>Mini Header</p>
                  <input
                    type={"text"}
                    value={post.miniHeader}
                    onChange={(val) => {
                      editPost(
                        {
                          ...post,
                          miniHeader: val.target.value,
                        },
                        index
                      );
                    }}
                  />
                </div>
                <div className={styles.input}>
                  <p>Share Tag</p>
                  <input
                    type={"text"}
                    value={post.id}
                    onChange={(val) => {
                      editPost(
                        {
                          ...post,
                          id: val.target.value,
                        },
                        index
                      );
                    }}
                  />
                </div>
                <div className={styles.input}>
                  <p>Bild URL</p>
                  <input
                    type={"url"}
                    value={post.imageUrl}
                    onChange={(val) => {
                      editPost(
                        {
                          ...post,
                          imageUrl: val.target.value,
                        },
                        index
                      );
                    }}
                  />
                </div>
                <div className={styles.inputbig}>
                  <p>Text</p>
                  <textarea
                    value={post.text}
                    onChange={(val) => {
                      editPost(
                        {
                          ...post,
                          text: val.target.value,
                        },
                        index
                      );
                    }}
                  />
                </div>
              </div>
              <img src={post.imageUrl} />
            </div>
          );
        })}
      </div>
      <div>
        <ButtonGroup>
          <Button
            onClick={() =>
              setPosts((old) => [
                ...old,
                {
                  imageUrl: "",
                  title: "",
                  miniHeader: "",
                  text: "",
                  id: "",
                },
              ])
            }
            variant="info"
          >
            Lägg till Post
          </Button>
          <Button onClick={save} variant="success">
            Spara
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default HomeInfoEditor;
