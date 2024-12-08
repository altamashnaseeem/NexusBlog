import React, { useState, useEffect } from 'react'
import { CiSearch } from "react-icons/ci";
import { IoMdMoon } from "react-icons/io";
import { IoMdSunny } from "react-icons/io";
import { data } from '../data';
import { IoMdClose } from "react-icons/io";

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [filteredPosts, setFilteredPosts] = useState(data);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const results = data.filter(post => 
      (searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      ) &&
      (category === '' || post.category === category)
    );

    const sortedResults = results.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      return sortOrder === 'newest' 
        ? dateB.getTime() - dateA.getTime() 
        : dateA.getTime() - dateB.getTime();
    });

    setFilteredPosts(sortedResults);
  }, [searchTerm, category, sortOrder]);

  const resetFilters = () => {
    setSearchTerm('');
    setCategory('');
    setSortOrder('newest');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Header Section */}
      <div className='flex flex-col sm:flex-row justify-between items-center mt-8 space-y-4 sm:space-y-0'>
        {/* Logo */}
        <div className='flex items-center space-x-3'>
          <span className='text-3xl font-bold'>
            <span className='text-black dark:text-white'>Nexus</span>
            <span className='text-gray-500 dark:text-gray-400'>Blog</span>
          </span>
        </div>

        {/* Search, Filters */}
        <div className='w-full sm:w-auto flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4'>
          {/* Search Input */}
          <div className='w-full sm:w-auto relative'>
            <div className='flex items-center w-full sm:w-[300px] border border-gray-300 dark:border-gray-600 p-2 bg-gray-100 dark:bg-gray-800 rounded-full'>
              <CiSearch className='h-5 w-5 text-gray-500 dark:text-gray-400 mr-2'/> 
              <input 
                type="text"  
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                placeholder='Search blogs' 
                className='w-full bg-gray-100 dark:bg-gray-800 dark:text-white outline-none font-semibold'
              />
              {(searchTerm || category) && (
                <button 
                  onClick={resetFilters}
                  className="ml-2"
                >
                  <IoMdClose className='h-5 w-5 text-gray-500 dark:text-gray-400' /> 
                </button>
              )}
            </div>
          </div>

          {/* Filters Dropdown */}
          <div className='w-full sm:w-auto flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 border rounded-md text-gray-600 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 font-semibold cursor-pointer outline-none"
            >
              <option value="">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Travel">Travel</option>
            </select>

            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 border rounded-md text-gray-600 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 font-semibold cursor-pointer outline-none"
            >
              <option value="newest">Newest </option>
              <option value="oldest">Oldest </option>
            </select>

            {/* Theme Toggle Button*/}
            <button 
              onClick={toggleDarkMode} 
              className='transition-colors'
            >
              {isDarkMode ? (
                <IoMdSunny className='h-6 w-6 text-yellow-500' />
              ) : (
                <IoMdMoon className='h-6 w-6 text-gray-800' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Blog Posts Section */}
      {filteredPosts.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-4 mt-16 font-semibold">
          No blog found
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-8 mt-16'>
          {filteredPosts.map((post) => (
            <div 
              key={post.id} 
              className='flex flex-col sm:flex-row gap-4 border-b border-gray-200 dark:border-gray-700 py-8 
                         transition-all duration-300 ease-in-out 
                         hover:shadow-xl hover:scale-[1.01] 
                         rounded-lg p-4 
                         bg-white dark:bg-gray-800 
                         hover:bg-gray-50 dark:hover:bg-gray-700'
            >
              <div className='w-full sm:w-[400px] h-[250px] flex-shrink-0'>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className='w-full h-full object-cover rounded-lg 
                             transition-transform duration-300 ease-in-out 
                             group-hover:scale-105'
                />
              </div>
              
              <div className='flex flex-col gap-3'>
                <h2 className='text-xl sm:text-2xl font-bold 
                               text-black dark:text-white
                               transition-colors duration-300 
                               group-hover:text-blue-600 dark:group-hover:text-blue-400'>{post.title}</h2>
                <div className='flex gap-3 items-center'>
                  <span className='text-sm font-semibold text-gray-800 dark:text-gray-200'>{post.author}</span>
                  <span className='text-sm opacity-50'>{post.date}</span>
                </div>
                <p className='text-gray-600 dark:text-gray-300 line-clamp-3'>
                  {post.description}
                </p>
              </div>
            </div>     
          ))}
        </div>
      )}
    </div>
  )
}

export default Blogs;