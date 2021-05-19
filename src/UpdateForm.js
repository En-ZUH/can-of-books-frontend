import React from 'react';


export class UpdateBook extends React.Component {
    render() {
        return (
            <div>
                <form onSubmit={(e) => this.props.update(e)}>
                    <fieldset>
                        <legend>Update Form</legend>

                        <label>Name of the Book</label>
                        <input onChange={(e) => this.props.updateBookName(e)} value={this.props.name} type='text' />


                        <label>status</label>
                        <input onChange={(e) => this.props.updateStatusOfBook(e)} value={this.props.status} type='text' />

                        <label>description</label>
                        <input onChange={(e) => this.props.updateDiscOfBook(e)} value={this.props.description} type='text' />

                        <input type="submit" value="=Update Book" />
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default UpdateBook