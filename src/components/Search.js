import {useRef} from 'react';

const Search = ({searchedUsername , isSuccessful}) => {
  const inputRef = useRef();
  

  const searched = e =>{
    e.preventDefault();
    console.log(inputRef.current.value);
    const searchKeyword = inputRef.current.value;
    searchedUsername(searchKeyword);
  }
    return(
        <div className='card search'>
        <h1>Search for user</h1>
        <form onSubmit={searched}>
          <input type="text" ref={inputRef} className={isSuccessful === false ? "incorrect-input" : ""} />
          <button >Search</button>
        </form>
          {isSuccessful === false ? <p className='incorrect'>Invalid Username</p> : false}
        </div>
        
    )
}
export default Search
