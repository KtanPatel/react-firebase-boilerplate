import React, { Component } from 'react';
import { withAuthorization } from '../Session';
class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.ref = props.firebase.db.collection('users');
        this.unsubscribe = null;
        this.state = {
            loading: false,
            users: [],
        };
    }
    onCollectionUpdate = (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() });
        });
        this.setState({
            users,
            loading: false,
        });
    }
    componentDidMount() {
        this.setState({ loading: true });
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }
    componentWillUnmount = () => {
        // this.unsubscribe = null;
    }
    render() {
        const { users, loading } = this.state;
        return (
            <div>
                <h1>Admin</h1>
                {loading && <div>Loading ...</div>}
                <UserList users={users} />
            </div>
        );
    }
}

const UserList = ({ users }) => (
    <ul>
        {users.map(user => (
            <li key={user.uid}>
                <span>
                    <strong>ID:</strong> {user.uid}
                </span>
                <span>
                    <strong>E-Mail:</strong> {user.email}
                </span>
                <span>
                    <strong>Username:</strong> {user.username}
                </span>
            </li>
        ))}
    </ul>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(AdminPage);