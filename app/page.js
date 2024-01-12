'use client'
import { useState, useEffect, Fragment } from 'react'
import OrgChartNode from './components/OrgChartNode';

export default function Home() {
  const [peopleData, setPeopleData] = useState([{
      name: 'Furr',
      email:"",
      children: []
    }
  ]);


  // Function to transform the data into a hierarchical structure
  function transformData(data, managerEmail = null) {
    const result = [];
    let visited = {};
    data.forEach(item => {
      if (visited[item.email] === undefined) {
        visited[item.email] = true;
        let obj = {
          name: item.name,
          email: item.email,
          designation: item.designation,
          children: getReporteeData(data, visited, item.email)
        }
        result.push(obj);
      }
    })

    return result;
  }

  const getReporteeData = (data, visited, manager_email) => {
    const result = [];
    data.forEach(item => {
      if (visited[item.email] == undefined && item.reporting_manager === manager_email) {
        visited[item.email] = true;
        let obj = {
          name: item.name,
          email: item.email,
          designation: item.designation,
          children: getReporteeData(data, visited, item.email)
        }
        result.push(obj);
      }
    })
    return result;
  }

  const getPeopleData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/people`)
      let result = await response.json();
      const transformedData = transformData(result.peoples);
      setPeopleData([{...peopleData[0], children: transformedData}]);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPeopleData();
  }, [])

  return (
    <Fragment>
      <OrgChartNode data={peopleData} />
    </Fragment >
  )
}
