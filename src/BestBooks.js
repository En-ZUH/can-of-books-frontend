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



class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      book: [],
      email: '',
      bookName: '',
      discOfBook: '',
      statusOfBooks: ''

    }


  }

  componentDidMount = async () => {
    const { user } = this.props.auth0;
    const myBooks = `${process.env.REACT_APP_HOST}/books?email=${user.email}`;
    const showApiUrlbook = await axios.get(myBooks);
    this.setState({ book: showApiUrlbook.data });
  }


  updateEmail = (e) => this.setState({ email: e.target.value });
  updateBookName = (e) => this.setState({ bookName: e.target.value });
  updateDiscOfBook = (e) => this.setState({ discOfBook: e.target.value });
  updateStatusOfBook = (e) => this.setState({ statusOfBooks: e.target.value });

  addBook = async (e) => {
    e.preventDefault();

    const bodyData = {
      name: this.state.bookName,
      description: this.state.discOfBook,
      status: this.state.statusOfBooks,
      email: this.state.email
    }

    const newBook = await axios.post(`${process.env.REACT_APP_HOST}/books`, bodyData);

    this.setState({
      book: newBook.data
    })
  }

  render() {

    return (

      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>


        {this.state.book.map(ele => {
          return <Card style={{ width: '18rem' }}>
            <ListGroup variant="flush">
              <ListGroup.Item as="li" active>book Nam:
                {ele.name}</ListGroup.Item>
              <ListGroup.Item>description: {ele.description}</ListGroup.Item>
              <ListGroup.Item>status: {ele.status}</ListGroup.Item>
            </ListGroup>  </Card>;
        })}

        <FormBooks
          updateEmail={this.updateEmail}
          updateBookName={this.updateBookName}
          updateDiscOfBook={this.updateDiscOfBook}
          updateStatusOfBook={this.updateStatusOfBook} />
      </Jumbotron>

    );

  }
}


export default withAuth0(MyFavoriteBooks);