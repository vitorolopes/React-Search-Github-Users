import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';

const Repos = () => {

  const {repos} = React.useContext(GithubContext)
  console.log(repos);

  const languages = repos.reduce((total, item)=>{
    const {language, stargazers_count} = item;
    if(!language) return total // In some repos the language property has a value of null
    if (!total[language]){ // If this language does not already exists lets create it. ...
      total[language] = {
        label: language, value: 1, // this is the format of chartData
        stars: stargazers_count
      } 
    } else { // ... .If this property is already in the object we are going to return lets update it.
      total[language] = {
        ...total[language], // we copy everything inside total[language] object ...
        value: total[language].value + 1, // ... and we overwrite the value property
        stars: total[language].stars + stargazers_count
      }
    }
    return total
  }, {})
  console.log(languages)
//* Most used languages
  const mostUsed = Object.values(languages) // This way we transform the object of objects in an array of objects
              .sort((a,b)=>{ // We only want the 5 most representative languages (some people have a lot of languages)
                return b.value - a.value // so we sort ...in descending order and then we slice it
              })
              .slice(0,5) 
//* Most popular languages (Stars Per Language)
  const mostPopular = Object.values(languages)
                  .sort((a,b) => {
                    return b.stars - a.stars
                  })
                  .map(item=>{
                    return {...item, value: item.stars} // The Fusion Charts chart is looking for the value property, so we copy
                    // the item object and we overwrite the value of the value property with the value of the stars property
                  })
                  .slice(0,5)
//! HERE 1 
//* Most Popular and Most Forked Repos 
  let {stars, forks} = repos.reduce((total,item)=>{ // item represents each and every item and total is what we are going to return
    const {stargazers_count, name, forks} = item;
    total.stars[stargazers_count] = {label: name, value: stargazers_count} // Here we are creating a property for the "wraping" object
    // and we name that property as the value of stargazers_count. We do this because we can't have an object like the following
    // { {label:"something", value:"777"},{label:"another thing", value: "888"} }
    total.forks[forks] = {label: name, value: forks}
    return total // we are going to return an object where the properties are objects themselves
    }, 
    {
      stars:{}, forks:{}
    }
  )
  console.log(stars)//! NOTE: Why does the stars object only contains 19 objects when (in mockRepos.js) we have 100 repos?
  //! Does it have something to do with the fact that many repos have the same value of stargazers_count?
  //! Are we overwriting the (current) object of the stars "wrapping" object each time we encounter a repo with the same value
  //! of stargazers_count as a previous repo has?
  //  But we're only overriding for the case of small values (0, 1, etc). It's highly unlikely that you're going to have a repo
  //  with the same starsgarzers_count, for big values, 206 for instance. Now, there might be the case, but most likely it won't going to happen.
  stars = Object.values(stars) // We transform the object into an array
            .slice(-5) // We slice the 5 last elements
            .reverse() // We want to display the one with the greater value first
  console.log(stars)
  forks = Object.values(forks).slice(-5).reverse() 

  return (
    <section>
      <Wrapper className='section-center'>
        <Pie3D data={mostUsed}/> 
        {/* //! HERE 2 */}
        <Column3D data={stars}/>
        <Doughnut2D data={mostPopular}/>
        {/* //! HERE 3 */}     
        <Bar3D data={forks}/>
      </Wrapper>
    </section>    
  )
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;
export default Repos;
