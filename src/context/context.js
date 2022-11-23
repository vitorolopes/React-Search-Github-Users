import React, { useState, useEffect, createContext } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = createContext();

const GithubProvider = ({children}) => {

  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers)
  //! HERE 1
  // request loading
  const [requests, setRequests] = useState(0);
 
  // TODO: Error
  //! HERE 2
  // check number of requests already made in the last hour
  const checkRequests = () => { 
    axios(`${rootUrl}/rate_limit`)
    .then( (res) => {
         let {data} = res; // console.log(data);
         //  let {rate} = data; //console.log(rate);
         let {rate:{remaining}} = data
         setRequests(remaining)
         if(remaining===0){
          // TODO: Throw an error
         }
    })
    .catch(err=>console.log(err))
   }
  useEffect(checkRequests,[])
  
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
//! HERE 3
        requests
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}
export {GithubProvider,GithubContext}
