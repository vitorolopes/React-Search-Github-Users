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
  // request loading
  const [requests, setRequests] = useState(0);
//! HERE 1
  // error
  const [error, setError] = useState({show: false, msg:""})

  // check number of requests already made in the last hour
  const checkRequests = () => { 
    axios(`${rootUrl}/rate_limit`)
    .then( (res) => {
         let {data} = res; // console.log(data);
         //  let {rate} = data; //console.log(rate);
         let {rate:{remaining}} = data
         remaining = 0 //! here 3a, just for demo purposes
         setRequests(remaining)
         if(remaining===0){
          // TODO: Throw an error
          //! HERE 3
          toggleError(true, "sorry, you have exceded your hourly rate limit")
         }
    })
    .catch(err=>console.log(err))
   }
//! HERE 2
  const toggleError = (show = false, msg = "") => {
    setError({show,msg})
  }
  
  useEffect(checkRequests,[])
  
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        //! HERE 3
        error
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}
export {GithubProvider,GithubContext}
