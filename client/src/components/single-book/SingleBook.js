import React, { Component } from 'react'
import {connect} from 'react-redux';
import {getBookWithReviewer} from '../../actions/';

class SingleBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        this.props.dispatch(getBookWithReviewer(this.props.match.params.id));

    }


    renderBook = (book) => {
        console.log(book)
        if(book.info) {
            return (
                <div className="br_container">
                    <div className="br_header">
                        <h2>{book.info.name}</h2> 
                        <h5>{book.info.author}</h5>   
                        <div className="br_reviewer">
                            <span>Reviwed by:</span> {book.reviewer.name} {book.reviewer.lastname}
                        </div>
                    </div>
                    <div className="br_review">
                        {book.info.review}
                    </div>

                    <div className="br_box">
                        <div className="left">
                            <div>
                                <span>Price: </span> {book.info.price}
                            </div>
                            <div>
                                <span>Pages: </span> {book.info.pages}
                            </div>
                        </div>
                        <div className="right">
                            <span>Rating:</span>
                            <div>{book.info.rating}/5</div>
                        </div>

                    </div>
                </div>

            )
        } else {
            return null;
        }

    }

    render() {
        console.log(this.props);
        return (
            <div>
                {this.renderBook(this.props.book)}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    // console.log(state);
    return {
        book: state.books
    }

}

export default connect(mapStateToProps)(SingleBook);
