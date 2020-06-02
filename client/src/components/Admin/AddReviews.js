import React, { Component } from 'react'
import {connect} from 'react-redux';
import {addBook} from '../../actions';
import AddReviewForm from '../../widgetsUI/AddReviewForm';
import LoaderAnim from '../../widgetsUI/LoaderAnim';
import is from 'is-js';



class AddReviews extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading:false,
            success:false
        }
    }


    addReviewer = (values) => {

        let valuesToSubmit = {...values, ownerId:this.props.user.login.user_id};
        this.setState({
            loading:true
        });

        this.props.dispatch(addBook(valuesToSubmit));
        
        return true;
    }


    componentDidUpdate(prevProps,prevState,snapshot) {

        // console.log(snapshot);

       if(!is.empty(this.props.reviews) && is.empty(prevProps.reviews)) {
           this.setState({
               loading:false,
               success:true
           });
       }


    }

    render() {
             
        if(this.state.loading) {
            return <LoaderAnim />
        } else {

        
            return (
                <div className="rl_container">
                    <h2>Add Review</h2>
                    <AddReviewForm submitHandler={this.addReviewer} defaultValues={{rating:'5',price:'0'}} buttonText="Add Review" />
                    {(this.state.success) ? <div className="success"> Successfully Added Book </div> : ''}
                </div>
            )
        }
    }
}


const mapStateToProps = (state) => {

    return {
        reviews: state.books
    }
}

export default connect(mapStateToProps)(AddReviews);

