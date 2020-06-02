import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getReviews} from '../../actions';
import {Link} from 'react-router-dom';


import is from 'is-js';

class MyReviews extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }


    renderReviewItems = function(reviews) {
        if(reviews) {
            return reviews.map(item => {

                return(
                    <tr key={item._id}>
                        <td></td>
                        <td>{item.name}</td>
                        <td>{item.author}</td>
                        <td><Link to={`/user/edit/${item._id}`}>Edit</Link></td>
                    </tr>
                )
    
            });
        } else {
            return null
        }
    


    }

    componentDidMount() {
        const {user_id} = this.props.user.login;
        this.props.dispatch(getReviews(user_id));
    }


    render() {
        // console.clear();
        const {reviews} = this.props;
        console.log(this.props);
        return (
            <div class="rl_container">
                <h2>My Reviews</h2>

                <table style={{maxWidth:'800px',margin:'0px auto'}}>
                    <thead>
                        <tr>
                            <th>Sr.</th>
                            <th>Book Name</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                
                    <tbody>
                        {(!is.empty(reviews)) ? 
                        this.renderReviewItems(this.props.reviews.reviews) : null}

                    </tbody>
                
               
                </table>
            </div>
        )


    }


} 


const mapStateToProps = (state) => {

    return {
        reviews: state.books
    }

}


export default connect(mapStateToProps)(MyReviews);












