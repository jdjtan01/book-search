import React, {useState, useEffect, useContext } from 'react'
import {Container, Row, Col, Card, Button} from 'react-bootstrap'
import {useParams, useNavigate, Link} from 'react-router-dom'

export default function Book(props) {
    return (
        <div id="book-card" className="container mx-2 my-4 col-10">
            <div className='row'>
                <div className="col-lg-1 col-md-3 col-sm-3 px-2 mx-2" id="book-img">
                    <a href={props.img_url} target='_blank'>
                        <img id="coverPage" src={props.cover_page} alt="book_cover" />
                    </a>
                </div>

                <div id="book-details" className="col-5 mx-2">
                    <h4><strong>{props.title}</strong></h4>
                    <p className='lead'>by: {props.author}</p>
                </div>

                
                <div id="moreDetails" className="col-5 my-auto mx-3">
                    <a href={props.reDirect} target='_blank'>
                    <button>More Details</button>
                    </a>
                </div>
            </div>
        </div>
    )
}