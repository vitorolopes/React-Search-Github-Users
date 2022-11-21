import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';

// https://www.fusioncharts.com/dev/getting-started/react/your-first-chart-using-react
// https://www.fusioncharts.com/dev/chart-guide/list-of-charts

const Repos = () => {

  const {repos} = React.useContext(GithubContext)

  //! HERE 1
  let languages = repos.reduce((total, item)=>{
    const {language} = item;
    if(!language) return total // In some repos the language property has a value of null
    if (!total[language]){ // If this language does not already exists lets create it. ...
      total[language] = {label: language, value: 1} // this is the format of chartData
    } else { // ... .If this property is already in the object we are going to return lets update it.
      total[language] = {
        ...total[language], // we copy everything inside total[language] object ...
        value: total[language].value + 1 // ... and we overwrite the value property
      }
    }
    return total
  }, {})
  //! HERE 2
  languages = Object.values(languages) // This way we transform the object of objects in an array of objects
              .sort((a,b)=>{ // We only want the 5 most representative languages (some people have a lot of languages)
                return b.value - a.value // so we sort ...in descending order and then we slice it
              })
              .slice(0,5) 
  console.log(languages);
//! HERE 3
  // const chartData = [
  //   {
  //     label: "HTML",
  //     value: "20"
  //   },
  //   {
  //     label: "CSS",
  //     value: "27"
  //   },
  //   {
  //     label: "JS",
  //     value: "50"
  //   }
  // ];

  return (
    <section>
      <Wrapper className='section-center'>
                     //! HERE 4
        <Pie3D data={languages}/>  
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
