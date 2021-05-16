/* eslint-disable no-unused-vars */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { useAuth0 } from '@auth0/auth0-react';

function MyFavoriteBooks() {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();


  return isAuthenticated && (
    <>
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
      </Jumbotron>

    </>
  );

}

export default MyFavoriteBooks;
