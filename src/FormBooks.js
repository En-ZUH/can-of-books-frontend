import React, { Component } from 'react'

export class FormBooks extends Component {
    render() {
        return (
            <div>
                <form onSubmit={(e) => this.props.addBooks(e)}>
                    <label>Name of the Book</label>
                    <input onChange={(e) => this.props.updateEmail(e)} type='text' />

                    <label>Description of the Book</label>
                    <input onChange={(e) => this.props.updateBookName(e)} type='text' />
                    
                    <label>Status of the Book</label>
                    <input onChange={(e) => this.props.updateDiscOfBook(e)} type='text' />

                    <label>Enter your email</label>
                    <input onChange={(e) => this.props.updateStatusOfBook(e)} type='text' />


                    <input type="submit" value="Add New Book" />
                </form>
            </div>
        )
    }
}

export default FormBooks
