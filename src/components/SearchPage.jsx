import React, {useState, useEffect, useContext } from 'react'
import {Container, Row, Col, Card, Button} from 'react-bootstrap'
import {useParams, useNavigate, Link} from 'react-router-dom'
import Book from './BookCard';

export default function SearchBar(props){
    const [bookSearch, setBookSearch] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchBy, setSearchBy] = useState("title");
    const [searchedParam, setSearchedParam] = useState('')

    const API_URL = "https://openlibrary.org/search.json";
    const COVER_PAGE_URL = "https://covers.openlibrary.org/b"
    const NO_COVER_URL = "https://openlibrary.org/images/icons/avatar_book-sm.png"
    const WORKS_URL = "https://openlibrary.org"


    async function Search(event) {
        event.preventDefault()
        const noSpace = searchValue.replace(/\s+/g, '+' );

        await fetch(`${API_URL}?${searchBy}=${noSpace}&limit=30`)
            .then(result => result.json())
            .then(data => {

                if(data.docs !== false && data.docs !== null && data.docs.length !== 0){
                    setBookSearch(data.docs.map(detail => {
                        // Author Name
                        var author = "Unknown Author"
                      
                        if(detail.author_name) {
                            author = detail.author_name.join(", ")
                        } 

                        // Cover Page
                        var cover_key = "id";
                        var cover_value = detail.cover_i;
                        var cover_size = "M";
                        var coverPage = NO_COVER_URL;

                        if(cover_value) {
                            coverPage = `${COVER_PAGE_URL}/${cover_key}/${cover_value}-${cover_size}.jpg`;
                        }

                        // Works
                        var works_key = detail.key;
                        var lendingEdition = detail.lending_edition_s;
                        var titleUnderScore = detail.title.replace(/\s+/g, '_' );
                        var worksPage = ""
                        worksPage = `${WORKS_URL}/${works_key}/${titleUnderScore}?edition=key%3A/books/${lendingEdition}`;

                        setSearchedParam(`You searched for the ${searchBy}: ${searchValue}`)
                        
                        return(
                            <Book key={detail.key} title={detail.title} author={author} cover_page={coverPage} img_url={coverPage} reDirect={worksPage}/>
                        )
                    }))
                } else {
                    setSearchedParam('')
                    setBookSearch("No books directly matched your search.")
                }
            })
        setSearchValue('')
    }

    function handleInput(event) {
        setSearchValue(event.target.value);
    }

    function handleSearchBy(event){
        var e = document.getElementById("searchBy");
        var selection = e.value
        setSearchBy(selection);
    }

    return (
        <div id="searchPage" className='container'>
            {/* Search Bar */}
            <div id="search-bar" className='mx-auto text-center col-sm-12 col-lg-6 col-md-6 pb-5'>
                <a href="/">
                <h1>Your Book</h1>
                </a>
                <form action="post" onSubmit={Search}>
                    <select id="searchBy" onClick={handleSearchBy} aria-label="Search by">
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                        <option value="subject">Subject</option>
                    </select>
        
                    <input type="text" id="titleInput" name="title" className='my-2'placeholder='Search' onChange={handleInput} value={searchValue}/>
                    <input id="get" type="submit" value="Search" formAction="/get-title"/>
            
                </form>
            </div>

            {/* Results Page */}
            
            <div id='resultsPage'>
                <div className='mx-5 px-5 col-sm-12'>
                    <h5 className=''>{searchedParam}</h5>
                </div>
                
                {bookSearch}
            </div>
        </div>
        
    )
}
