import React, { useEffect, useState } from 'react';

import useHelloWorld from './custom-hooks/useHelloWorld.js';

import './style.css';

const useDate = () => {
  const date = new Date();


  const getDay = () => {
    return date.getDay();
  };

  const getMonth = () => {
    return date.getMonth();
  };

  const addDay = (numberOfDays) => {
    //N.B if day after adding is greater than number of days for that month, date returned should be a new month date

    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numberOfDays);

    if (newDate.getMonth() !== date.getMonth()) {
      newDate.setMonth(date.getMonth() + 1);
    }

    date = newDate;
  };

  const addMonth = (numberOfMonths) => {
    //N.B if month after adding is greater than 11, date returned should be a new year

    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + numberOfMonths);

    if (newDate.getMonth() < date.getMonth()) {
      newDate.setFullYear(date.getFullYear() + 1);
    }

    date = newDate;
  };

  return { date, getDay, getMonth, addDay, addMonth};
};

export default function App() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState('');
  const { value, setValue } = useHelloWorld();
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

  const { date, getDay, getMonth } = useDate();

  console.log('----->', value);

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
     {posts.map((post) => (
        <div style={{ border: '1px dashed', marginBottom: '5px' }} key={post.id}>
          {post.id === editPostId ? (
            <div>
              <input type="text" value={input} onChange={handleChange} />
              <button onClick={handleSavePostEdit}>Save</button>
            </div>
          ) : (
            <>
              {post.title}
              <button onClick={() => handlePostEdit(post.id)}>Edit</button>
            </>
          )}
        </div>
      ))}
      {value}
      <br />
      Date: {date.toString()}
      <br />
      Day: {getDay()}
      <br />
      Month: {getMonth()}
      <br />
      <input type="text" onChange={handleChange} />
      <button
        onClick={() => {
          setValue(input);
        }}
      >
      Change The World
      </button>
    </div>
  );
}
