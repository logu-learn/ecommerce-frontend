import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

 const Search = () => {
    const [keyword,setKeyword] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const searchHandler = (e)=>{
      e.preventDefault()
      navigate(`/search/${keyword}`)

    }

  
  const clearKeyword = () =>{
    setKeyword("")
  }

  useEffect(()=>{
    if(location.pathname === '/'){
      clearKeyword()
    }
  },[location])
  return (
    <form onSubmit={searchHandler}> 
      <div className="input-group">
          <input
            type="text"
            id="search_field"
            className="form-control"
            onChange={(e)=>{setKeyword(e.target.value)}}
            value={keyword}
            placeholder="Enter Product Name ..."
          />
          <div className="input-group-append">
            <button id="search_btn" className="btn">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
      </div>
   </form>
  )
}

export default Search