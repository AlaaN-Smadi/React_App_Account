import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Posts = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: 'http://localhost:3050/',
          scope: 'read:posts',
        });
        const response = await fetch('http://localhost:3050/books?email=alaasmadi1010@gmail.com', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(await response.json());
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {posts.map((post, index) => {
        return <li key={index}>{post}</li>;
      })}
    </ul>
  );
};

export default Posts;
