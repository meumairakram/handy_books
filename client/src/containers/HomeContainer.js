import React, { Component } from 'react'
import {connect} from 'react-redux';
import {getBooks} from '../actions';
import BookItem from '../widgetsUI/BookItem';

class HomeContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        this.props.dispatch(getBooks(3,0));
    }

    renderElement = (books) => {

        if(Array.isArray(books)) {
           return books.map((book,index) => {
                return (
                    <BookItem {...book} key={book._id} />
                )
            });
    
        } else {
            return '';
        }       
    }


    handleLoadMore = () => {
        
        this.props.dispatch(getBooks(2,this.props.books.length,this.props.books));

    }

    render() {
       
        return (
            <div>
                {this.renderElement(this.props.books)}
                <div className="loadmore" onClick={this.handleLoadMore}>Load More</div>
            </div>
        )
    }
}

const maptStateToProps = (state) => {
    return {
        books: state.books
    }
}


export default connect(maptStateToProps)(HomeContainer);
