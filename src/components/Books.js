import React from 'react'
import styled from "styled-components"
import BookImage from './BookImage'

import booksJson from '../content/books/books.json'

const BooksContainer = styled.section`
    display: grid;
    grid-template-columns: repeat(${props => props.columns || "4"}, 1fr);
    grid-gap: 10px;

    ${props => {
        if (props.size == "small") {

        } else {
            return `
                margin-left: -20% !important;
                width: 140%;
            `
        }
    }}
`

const BookContainer = styled.section`
    padding 20px;
    // cursor: pointer;
    transition: background 0.1s ease 0s;
    border-radius: 10px;
    &:hover {
        background-color: rgba(255, 118, 39, 0.06);
    }
`

const BookTitle = styled.span`
    margin-top: 10px;
`

const BookAuthor = styled.span`
`

const Book = (props) => {
    return (
        <BookContainer>
            <BookImage coverImageName={props.coverImageName} />
            <BookTitle>{props.title}</BookTitle><br />
            <BookAuthor>by {props.author}</BookAuthor>
            <p>{props.year}</p>
        </BookContainer>
    )
}

export const Books = (props) => {

    let books = booksJson.books

    if (props.count > 0) {
        books = books.slice(0, props.count)
    }

    return <BooksContainer columns={props.count} {...props}>
        {books.map(book => {
            return (
                <Book
                    coverImageName={book.coverImageName}
                    title={book.title}
                    author={book.author}
                    year={book.year}
                />
            )
        })}
    </BooksContainer>
}