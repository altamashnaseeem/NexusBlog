import React from 'react'


import Blogs from './components/Blogs'
const App = () => {
  return (
    <div className='bg-white dark:bg-gray-900 min-h-screen'>
      <div className='max-w-4xl min-h-screen flex flex-col gap-3 mx-auto py-3'>
        <Blogs/>
      </div>
    </div>

  )
}

export default App