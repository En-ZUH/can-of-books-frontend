/* eslint-disable no-unused-vars */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import BookFormModal from './BookFormModal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import UpdateForm from './UpdateForm';




class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      book: [],

      name: '',
      description: '',
      status: '',
      showUpdateForm: false,
      index: 0

    }


  }

  componentDidMount = async () => {
    const { user } = this.props.auth0;
    const myBooks = `${process.env.REACT_APP_HOST}/books?email=${user.email}`;
    const showApiUrlbook = await axios.get(myBooks);
    this.setState({ book: showApiUrlbook.data });
  }

  addBook = async (e) => {// sending the request to backend 
    e.preventDefault();


    const bodyData = { // passing the info inside the body
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
      status: this.state.status,
      description: this.state.description,
      email: this.props.auth0.user.email

    }

    const newBook = await axios.post(`${process.env.REACT_APP_HOST}/books`, bodyData);

    this.setState({
      book: newBook.data
    })
  }

  deleteBook = async (index) => {
    const newArrayOfBooks = this.state.book.filter((cat, idx) => {
      return idx !== index;
    });
    this.setState({
      book: newArrayOfBooks
    })

    const query = {
      email: this.props.auth0.user.email
    }
    await axios.delete(`${process.env.REACT_APP_HOST}/books/${index}`, { params: query })
  }


  update = async (e) => {
    e.preventDefault();
    const reqBody = {
      name: this.state.name,
      status: this.state.status,
      description: this.state.description,
      email: this.props.auth0.user.email
    }
    const newBook = await axios.put(`${process.env.REACT_APP_HOST}/books/${this.state.index}`, reqBody); //put to update// send data to server

    this.setState({
      book: newBook.data
    })

  }

  showUpdateForm = (idx) => {

    // Filter the cats by by the index to choose the cat information that we want to pass down to the component 
    const newBook = this.state.book.filter((value, index) => {
      return idx === index;

    });

    console.log(newBook);

    this.setState({
      index: idx,
      name: newBook[0].name,
      status: newBook[0].status,
      description: newBook[0].description,
      showUpdate: true
    });
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

        <BookFormModal
          addBook={this.addBook}

          updateBookName={this.updateBookName}
          updateDiscOfBook={this.updateDiscOfBook}
          updateStatusOfBook={this.updateStatusOfBook}
        />

        {this.state.showUpdate &&
          <UpdateForm

            update={this.update}
            name={this.state.name}
            description={this.state.description}
            status={this.state.status}
            updateBookName={this.updateBookName}
            updateDiscOfBook={this.updateDiscOfBook}
            updateStatusOfBook={this.updateStatusOfBook}

          />}

        {
          this.state.book.map((ele, indx) => {
            return (
              <>
                <Card style={{ width: '18rem', margin: '26px auto' }}>
                  <ListGroup variant="flush">
                    <ListGroup.Item as="li">Book Name:
                {ele.name}</ListGroup.Item>
                    <ListGroup.Item>Description: {ele.description}</ListGroup.Item>
                    <ListGroup.Item>Status: {ele.status}</ListGroup.Item>
                  </ListGroup>

                  <Button className='m-3 btn btn-danger' onClick={() => this.deleteBook(indx)}>Delete Book</Button>
                  <Button className='m-3 btn btn-danger' onClick={() => this.showUpdateForm(indx)}>Update Book</Button>
                </Card>;
              </>
            )
          })
        }


      </Jumbotron >
      //} </>
    );

  }
}


export default withAuth0(MyFavoriteBooks);