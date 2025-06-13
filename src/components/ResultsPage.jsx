import React, {useState, useEffect}from "react";
import Book from "./BookCard";
import SearchBar from "./SearchPage";

export default function Result(props) {
    const API_URL = "https://openlibrary.org/search.json";
    const [result, setResult] = useState([]);





    return(
        <div>
            <div id="search-bar2">
                <h1>Your Book</h1>
                <form action="post" onSubmit={Search}>
                    <select id="searchBy" onClick={handleSearchBy} aria-label="Search by">
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                        <option value="subject">Subject</option>
                    </select>
        
                    <input type="text" id="titleInput" name="title" className='my-2'placeholder='Search' onChange={handleInput} value={searchValue}/>
                    <input id="get" type="submit" value="Search" className='' formAction="/get-title"/>
            
                </form>
            </div>
        </div>
    )
}