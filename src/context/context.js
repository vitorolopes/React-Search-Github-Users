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
  const [isLoading, setIsLoading] = useState(false)
  // error
  const [error, setError] = useState({show: false, msg:""})

  // check number of requests already made in the last hour
  const checkRequests = () => { 
    axios(`${rootUrl}/rate_limit`)
    .then( (res) => {
         let {data} = res; // console.log(data);
         //  let {rate} = data; //console.log(rate);
         let {rate:{remaining}} = data
         setRequests(remaining)
         if(remaining===0){
          toggleError(true, "sorry, you have exceded your hourly rate limit")
         }
    })
    .catch(err=>console.log(err))
  }
  const toggleError = (show = false, msg = "") => {
    setError({show,msg})
  }
  const searchGithubUser = async (user) => { 
    toggleError()
    setIsLoading(true)

    const response = await axios(`${rootUrl}/users/${user}`)
                       .catch(err=>console.log(err))

    if(response){
      setGithubUser(response.data)  
      const {login, followers_url} = response.data;
//! HERE 1
      await Promise.allSettled([ 
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`)
      ])
          .then(results=>{
              console.log(results)
              const [repos, followers] = results; //* Array destructuring
              const status = "fulfilled"
              if(repos.status === status){ setRepos(repos.value.data)}              
              if(followers.status === status){setFollowers(followers.value.data)}

          })
          .catch(err=>console.log(err))

    } else { toggleError(true, "there is no user with that username")}

    checkRequests(); // Update the number of available requests
    setIsLoading(false)
  }

  useEffect(checkRequests,[])
  return (
    <GithubContext.Provider                                                  
      value={{githubUser, repos, followers, requests,  error,searchGithubUser,
              isLoading }}
    >
      {children}
    </GithubContext.Provider>
  )
}
export {GithubProvider,GithubContext}
