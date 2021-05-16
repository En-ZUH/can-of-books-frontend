import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends Component {
    render() {
        const { user } = this.props.auth0;
        return <div>
            <p>{user.name}</p>
            <img src={user.email} alt={this.name} />
            <p>{user.picture}</p>

        </div>;
    }
}

export default withAuth0(Profile);