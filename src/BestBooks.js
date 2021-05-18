/* eslint-disable no-unused-vars */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import FormBooks from './FormBooks';
// import { Form } from 'react-bootstrap';




class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      book: [],

      name: '',
      description: '',
      status: ''

    }


  }

  componentDidMount = async () => {
    const { user } = this.props.auth0;
    const myBooks = `${process.env.REACT_APP_HOST}/books?email=${user.email}`;
    const showApiUrlbook = await axios.get(myBooks);
    this.setState({ book: showApiUrlbook.data });
  }

  addBook = async (e) => {
    e.preventDefault();

    // sending the request to backend 
    const bodyData = {
      name: this.state.name,
      status: this.state.status,
      description: this.state.description,
      email: this.props.auth0.user.email

    }
    const newBook = await axios.post(`${this.state.server}/book`, bodyData);


    this.setState({
      book: newBook.data
    })
  }



  updateBookName = (e) => this.setState({ name: e.target.value });
  updateDiscOfBook = (e) => this.setState({ description: e.target.value });
  updateStatusOfBook = (e) => this.setState({ status: e.target.value });

  addBook = async (e) => {
    e.preventDefault();

    const bodyData = {
      name: this.state.name,
      description: this.state.description,
      status: this.state.status,
      email: this.props.auth0.user.email

    }

    const newBook = await axios.post(`${process.env.REACT_APP_HOST}/books`, bodyData);

    this.setState({
      book: newBook.data
    })
  }

  render() {

    return (
      //<>
      //{this.state.books.length>0

      <Jumbotron   >
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>

        <FormBooks
          addBook={this.addBook}

          updateBookName={this.updateBookName}
          updateDiscOfBook={this.updateDiscOfBook}
          updateStatusOfBook={this.updateStatusOfBook}
        />

        {
          this.state.book.map(ele => {
            return <Card style={{ width: '18rem' }}>
              <ListGroup variant="flush">
                <ListGroup.Item as="li" active>book Nam:
                {ele.name}</ListGroup.Item>
                <ListGroup.Item>description: {ele.description}</ListGroup.Item>
                <ListGroup.Item>status: {ele.status}</ListGroup.Item>
              </ListGroup>  </Card>;
          })
        }


      </Jumbotron >
      //} </>
    );

  }
}


export default withAuth0(MyFavoriteBooks);