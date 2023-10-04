import React, { useEffect, useState } from 'react';


import './style.css';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState('');
  const [editPostId, setEditPostId] = useState(null);

  const handlePostEdit  = (postId) => {
    const postEdit = posts.find((post) => post.id == postId)
    setInput(postEdit.title)
    setEditPostId(postId)
  }

  const handleSavePostEdit = () => {
    if (editPostId !== null) {
      const updatedPosts = posts.map((post) =>
        post.id === editPostId ? { ...post, title: input } : post
      );
      setPosts(updatedPosts);
      setInput('');
      setEditPostId(null);
    }
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };


  // when a component mounts
  // when a component's state or props changes
  // when a component unmounts
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos?limit=5'
        );

        const data = await response.json();

        console.log(data);
        setPosts(data);
        return () => {
          console.log('I am unmounting...');
        };
      } catch (error) {
        console.log(error);
      }
    })(); //iife
  }, []);

  const handleChange = ({ target }) => {
    setInput(target.value);
  };

  useEffect(() => {
    console.log('Input changed');
  }, [input]);


  return (
    <div>
     {posts.map((post, index) => (
      <div
        style={{
          width: '50%', 
          margin: '0 auto', 
          marginBottom: '10px',
          border: '1px solid black', 
          backgroundColor: 'white', 
          color: 'black',
          borderRadius: '10px'
        }}
        key={post.id}
      >
        <div style={{ padding: '10px', marginBottom: '10px' }}> 
          {post.id === editPostId ? (
            <div>
              <input
                type="text"
                value={input}
                onChange={handleChange}
                style={{
                  marginBottom: '10px', 
                  padding: '8px', 
                  width: '100%' 
                }}
              />
              <button
                style={{
                  border: 'none',
                  borderRadius: '5px',
                  padding: '8px 16px',
                  marginRight: '10px', 
                  backgroundColor: 'lightblue', 
                  color: 'white', 
                  cursor: 'pointer' 
                }}
                onClick={handleSavePostEdit}
              >
                Save
              </button>
            </div>
          ) : (
            <>
              {post.title}
              <button 
                style={{
                  border: 'none',
                  borderRadius: '5px', 
                  padding: '8px 16px', 
                  marginLeft: '10px',
                  backgroundColor: 'lightblue', 
                  color: 'white', 
                  cursor: 'pointer' 
                }}
                onClick={() => handlePostEdit(post.id)}
              >
                Edit
              </button>
              <button 
                style={{
                  border: 'none',
                  borderRadius: '5px', 
                  padding: '8px 16px', 
                  marginLeft: '10px', 
                  backgroundColor: 'lightblue', 
                  color: 'white', 
                  cursor: 'pointer'
                }}
                onClick={() => handleDeletePost(post.id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    ))}


    </div>
  );
}
