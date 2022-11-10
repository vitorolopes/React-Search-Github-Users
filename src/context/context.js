import React, { useState, useEffect, createContext } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = createContext();

const GithubProvider = ({children}) => {

  const dummyValue = "Dummy Hello"
  
  return (
    <GithubContext.Provider
      value={{
        dummyValue
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export {GithubProvider,GithubContext}
