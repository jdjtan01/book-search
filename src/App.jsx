import { useState } from 'react'
import './App.css'
import Book from './components/BookCard'
import SearchBar from './components/SearchPage'
import Footer from './components/Footer'

export default function App() {


  return (
    <div>
      <SearchBar />
      <Footer />
    </div>
  )
}