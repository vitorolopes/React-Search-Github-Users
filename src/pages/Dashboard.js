import React,{ useContext } from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';

const Dashboard = () => {
//! HERE 1
  const {isLoading} = useContext(GithubContext)
//! HERE 2
  if(isLoading){
    return (
      <main>
       <Navbar/>
       <Search/> 
       <img src={loadingImage} className="loading-img" alt="loading" />
      </main>
    );
  }

  return (
    <main>
     <Navbar/>
     <Search/> 
     <Info/>
     <User/>
     <Repos/>
    </main>
  );
};

export default Dashboard;
