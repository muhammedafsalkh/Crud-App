import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Read = () => {
  const [data,setData] = useState([]);
  const [tabledark,setTableDark] = useState('')
  function getData() {
    axios.get("https://6537566bbb226bb85dd314cd.mockapi.io/crud-youtube")
    .then((res)=>{
      setData(res.data)
    });
  }

  function handleDelete(id){
    axios.delete(`https://6537566bbb226bb85dd314cd.mockapi.io/crud-youtube/${id}`).then(()=>{
      getData()
    })
  }

  const setToLocalStorage = (id,name,email) =>{
    localStorage.setItem("id",id)
    localStorage.setItem("name",name)
    localStorage.setItem("email",email)
  }

  useEffect(()=>{
    getData();
  },[]);
 
  return (
    <>
    <div class="form-check form-switch">
  <input className="form-check-input" type="checkbox" onClick={()=>{
    if (tabledark === 'table-dark') setTableDark("")
    else setTableDark("table-dark")
      
    
  }} />
  
</div>
     <div className='d-flex justify-content-between m-2'>
      <h2>Read Operation</h2>
      <Link to="/">
      <button className='btn btn-secondary'>Create</button>
      </Link>
    </div>
      <table className={`table ${tabledark}`}>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
  </thead>
  {
    data.map((eachData)=>{
      return (
        <>
         <tbody>
    <tr>
      <th scope="row">{eachData.id}</th>
      <td>{eachData.name}</td>
      <td>{eachData.email}</td>
     <div className='d-flex w-100 justify-content-between'>
        <Link to="/update">
        <td><button className='btn-success' onClick={()=> setToLocalStorage(eachData.id,eachData.name,eachData.email)}>Edit</button></td>
        </Link>
        <td><button className='btn-danger' onClick={()=> handleDelete(eachData.id)}>Delete</button></td>
     </div>
    </tr>
  </tbody>
        </>
      )
    })
   }
</table>
    </>
  )
}

export default Read