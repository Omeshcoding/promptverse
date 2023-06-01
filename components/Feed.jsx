'use client';
import { useState, useEffect } from 'react';
import PromptCard from '@components/PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 md:flex gap-6  prompt-layout">
      {data.map((post) => (
        <PromptCard
          post={post}
          key={post._id}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResult, setSearchedResult] = useState([]);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setPosts(data);
  };
  useEffect(() => {
    fetchPosts();
    console.log(posts);
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, 'i');
    return posts.filter(
      (post) =>
        regex.test(post.creator.username) ||
        regex.test(post.tag) ||
        regex.test(post.prompt)
    );
  };
  const handleSearch = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResult(searchResult);
      }, 500)
    );
  };
  const handleTagClick = (tagname) => {
    setSearchText(tagname);
    console.log(tagname);
    const searchResult = filterPrompts(tagname);
    setSearchedResult(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearch}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList data={searchedResult} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
