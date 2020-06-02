import React, { PureComponent } from 'react'
import LoaderAnim from '../../widgetsUI/LoaderAnim';
import AddReviewForm from '../../widgetsUI/AddReviewForm';
import {connect} from 'react-redux';
import {getBookWithReviewer, clearBookEdit, updateBook} from '../../actions/';


class EditBook extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            loading:false,
            editSaved:false
        }
    }

    componentDidMount() {
        
        let bookID = this.props.match.params.id;

        this.props.dispatch(getBookWithReviewer(bookID));
        
    }


    componentWillUnmount() {

        this.props.dispatch(clearBookEdit());
    }


    renderDefaultValues = (values) => {
            
        let book = values.bookInfo;
        if(book.info && book.info.hasOwnProperty('name')) {
            let defaultData = {
                name:book.info.name,
                rating:book.info.rating,
                author:book.info.author,
                pages:book.info.pages,
                price:book.info.price,
                review:book.info.review
            }
            
            return (
                <AddReviewForm submitHandler={this.handleEditBook} defaultValues={defaultData} buttonText="Update Review" />
            )
        } else {
            return (<></>)
        }

       
    }



    handleEditBook = (values) => {

    const bookValues = {
        book_id:this.props.match.params.id,
        ...values
    };

        this.props.dispatch(updateBook(bookValues));

        this.setState({
            editSaved:true
        });
    }

   

    render() {
        if(this.state.loading) {
            return <LoaderAnim />
        } else {

        
            return (
                <div className="rl_container">
                    <h2>Edit Review</h2>
                    {this.renderDefaultValues(this.props)}
                    {(this.state.editSaved) ? <div className="success">Book Updated Successfully.</div> : ''}
                    
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {

    return {
        bookInfo:state.books,    
    }

}


export default connect(mapStateToProps)(EditBook);
