'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile = () => {
  const { data: session } = useSession();
  const route = useRouter();

  const [posts, setPosts] = useState([]);
  const handleEdit = () => {};
  const handleDelete = async () => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      console.log(data);
      setPosts(data);
    };
    console.log(posts);
    if (session?.user.id) fetchPosts();
  }, []);
  console.log(posts);
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;