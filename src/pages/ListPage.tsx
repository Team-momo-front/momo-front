import { useState } from 'react';
import Categories from '../components/Categories';
import Header from '../components/Header/Header';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar/SearchBar';
import { posts } from '../mocks/posts';
import { useNavigate } from 'react-router-dom';
import { useToggleCategory } from '../hooks/useToggleCategory';

const ListPage = () => {
  const [searchFilter, setSearchFilter] = useState<string>('location');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const { categories: selectedCategories, toggleCategory } =
    useToggleCategory();

  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate('/create');
  };

  const handleSearch = () => {
    const filtered = posts.filter(post => {
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
        <div className="flex flex-wrap justify-center gap-10 mt-[26px]">
          {filteredPosts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ListPage;
