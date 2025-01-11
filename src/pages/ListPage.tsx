import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import Header from '../components/Header/Header';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar/SearchBar';
import { useToggleCategory } from '../hooks/useToggleCategory';
import { posts } from '../mocks/posts';
import { Post } from '../types/Post';

const sortedPosts = [...posts].sort((a, b) => {
  const dateA = new Date(a.meetingDate).getTime();
  const dateB = new Date(b.meetingDate).getTime();
  return dateA - dateB;
});

const ListPage = () => {
  const [searchFilter, setSearchFilter] = useState<string>('location');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(sortedPosts);

  const { categories: selectedCategories, toggleCategory } =
    useToggleCategory();

  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate('/create');
  };

  const handleNavigateToDetail = (id: string) => {
    navigate(`/post/${id}`);
  };

  // TODO: 타입스크립트로 하라고 하셔요
  const handleSearch = () => {
    const filtered = filteredPosts.filter(post => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some(category => post.categories.includes(category));
      const matchesSearch =
        !searchQuery ||
        (searchFilter === 'location' && post.location.includes(searchQuery)) ||
        (searchFilter === 'title' && post.title.includes(searchQuery)) ||
        (searchFilter === 'content' && post.content.includes(searchQuery));
      return matchesCategory && matchesSearch;
    });
    setFilteredPosts(filtered);
  };

  return (
    <>
      <Header />
      <div className="px-16 py-10">
        <SearchBar
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          posts={filteredPosts}
          setFilteredPosts={setFilteredPosts}
        />
        <div className="mt-[30px] flex justify-between">
          <div className="w-[123px]" />
          <div className="flex justify-center">
            <Categories
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
            />
          </div>
          <button
            className="btn btn-primary w-[123px]"
            onClick={handleCreatePost}
          >
            밥친구 구하기
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-start mt-[26px]">
          {filteredPosts.map((post, index) => (
            <div key={index} className="w-full">
              <PostCard
                post={post}
                onClick={() => handleNavigateToDetail(post.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListPage;
