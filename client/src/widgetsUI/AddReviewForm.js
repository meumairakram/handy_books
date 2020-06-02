import React, { Component } from 'react'
import {withFormik, useFormik} from 'formik';



const AddReviewForm = (props) => {

    
    const formik = useFormik({
        initialValues:{            
            name:"",
            price:"",
            author:"",
            pages:"",
            review:"",
            rating:"",
            ...props.defaultValues,
        },
        onSubmit: (values,formikBag) => {
         
            formikBag.resetForm();
            props.submitHandler(values);
        }

    });

    const {values, handleSubmit, handleChange} = formik;
    
    return (
        
        
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form_element">
                        <input type="text" name="name" value={values.name} onChange={handleChange} placeholder="Enter name" />
                    </div>

                    <div className="form_element">
                        <input type="text"  name="author" value={values.author} onChange={handleChange}  placeholder="Enter Author" />
                    </div>

                    <div className="form_element">
                        <textarea name="review"  name="review" value={values.review} onChange={handleChange}></textarea>
                    </div>

                    <div className="form_element">
                        <input type="text" name="pages" value={values.pages} onChange={handleChange} placeholder="Pages" />
                    </div>

                    <div className="form_element">
                        <input type="text" name="rating" value={values.rating} onChange={handleChange} placeholder="Rating" />
                    </div>

                    <div className="form_element">
                        <input type="text" name="price" value={values.price} onChange={handleChange} placeholder="Enter Price" />
                    </div>

                    <button type="submit">{props.buttonText}</button>
                </form>
            </div>
        )
}



// const FormikReviewForm = withFormik({

//     mapPropsToValues: () => {
        
//             return {
//                 name:"",
//                 price:"",
//                 author:"",
//                 pages:"",
//                 review:"",
//                 rating:""
//             }
      
//     },
//     handleSubmit: (values,formikBag) => {
//         // console.log(values);
//         formikBag.resetForm();
//         formikBag.props.addReviewer(values);
//     }



// })(AddReviewForm);

export default AddReviewForm;
