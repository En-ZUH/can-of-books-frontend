/* eslint-disable no-unused-vars */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';


class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],

      // show: false,
      server: process.env.REACT_APP_SERVER_URL
    }


  }
  ComponentDidMount = async () => {
    const { user } = this.props.auth0;
    try {
      const params = { email: user.email }
      const url = `${this.state.server}/books?email=${user.email}`
      const books = await axios.get(url);
      this.setState({
        books: books.data[0].books,
        // show: true,

      });
      console.log(books.data[0], books);
    }
    catch (error) {
      console.error();

    };

  }


  render() {

    return (
      <>
        {this.state.books.length >= 0 &&

          <Jumbotron>
            <h1>My Favorite Books</h1>
            <p>
              This is a collection of my favorite books
        </p>

            {this.state.books.map((data, ind) => {
              return (
                <>
                  <p>name:{data.name}</p>
                  <p>status:{data.status}</p>
                  <p>description:{data.description}</p>
                </>
              )
            })}

          </Jumbotron>
        }
      </>
    );

  }
}


export default withAuth0(MyFavoriteBooks);