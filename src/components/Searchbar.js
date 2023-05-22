import { useState } from "react";
export default function SearchBar(props) {
  const {onSearch}=props;
  const [search,setSearch]=useState("")
  function onChange(e) {
    setSearch(e.target.value);
    if(e.target.value===0){
      setSearch(null)
    }
  }
  async function onClick(){
    onSearch(search)
  }
  return (
    <div className="searchbar-container">
      <div className="searchbar">
        <input placeholder="Search Pokemon..." onChange={onChange} />
      </div>
      <div className="searchbar-button">
        <button onClick={onClick}>Search</button>
      </div>
      <div>

      </div>
    </div>
  );
}
