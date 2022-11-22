import React, { useState, useEffect, createContext } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = createContext();

const GithubProvider = ({children}) => {
//! HERE
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers)

  // const dummyValue = "Dummy Hello"
  
  return (
    <GithubContext.Provider
      value={{
        // dummyValue
        githubUser,
        repos,
        followers
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export {GithubProvider,GithubContext}
