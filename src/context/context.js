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
//! HERE 1
  const searchGithubUser = async (user) => { 
   toggleError()
// Every time I start searching for a new user, I would want to
// make sure that if there was an error in a previous search, I remove the error message.
// Now, if the error message it's not there, it's not going to do any bad because I already have 
// the default of show false.
// And then remember when I was setting up toggleError function how I passed in the ES6 defaults
// where if I don't pass in the show, by default is going to be false.
// If I don't pass in the message by default, it's just going to be empty string.
// That's why I'm just invoking the function with no parameters, because I already have some 
// predefined defaults.
// TODO: setLoading(true)
    const response = await axios(`${rootUrl}/users/${user}`)
                       .catch(err=>console.log(err))
    console.log(response);
    if(response){
      setGithubUser(response.data)
// TODO: continue to develop this function      
    }else{
      toggleError(true, "there is no user with that username")
    }
  }

  useEffect(checkRequests,[])
  
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
//! HERE 2       
        searchGithubUser
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}
export {GithubProvider,GithubContext}
