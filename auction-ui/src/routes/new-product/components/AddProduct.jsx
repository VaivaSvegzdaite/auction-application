import { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import UploadPicWidget from "./UploadPicWidget";
import axios from "axios";
import authHeader from "../../../services/auth.header.jsx";

const productCategories = [
    "ANTIQUES",
    "ART",
    "BOOKS",
    "CLOTHING",
    "COINS",
    "ELECTRONICS",
    "GARDEN",
    "HOME_APPLIANCES",
    "JEWELRY",
    "MUSICAL_INSTRUMENTS",
    "VEHICLES"
]


export default function AddProduct({currentUser, requestState, setRequestState, setAddedProduct}) {

    const [ imgUrl, setImgUrl ] = useState();
    const [ product, setProduct ] = useState(() => ({
        name: '',
        description: '',
        category: 'ANTIQUES'
    }))
    const [ isNameError, setIsNameError] = useState(false);
    const [ isLoading, setIsLoading] = useState(false);


    const submitProduct = (e) => {
        e.preventDefault();

        const data = {
            ...product,
            url: imgUrl,
            user: {id: currentUser.id}
        }

        setIsLoading(true);
        
        axios.post(
            'http://localhost:8080/api/product/',
                data, {headers: authHeader()}
            ).then(response => {
                setIsLoading(false);
                setRequestState({reqSent: true, isError: false, resMessage: "Product successfully created" });
                setAddedProduct(response.data)
                setProduct({
                    name: '',
                    description: '',
                    category: 'ANTIQUES'
                })
                setImgUrl(null);
            })
            .catch(err => {
                console.log(err.response.data);
                setIsLoading(false);
                setRequestState({reqSent: true, isError: true, resMessage: "Network error, try again later"});
            }) 
    }

    

    return (        
        <div className="card card-container mt-4">
            <Form
                onSubmit={submitProduct}
            >
                <div className="form-group">
                    <label htmlFor="name">Product name</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="name"
                        value={product.name}
                        maxLength={50}
                        onChange={(e) => {
                            setProduct(prev => ({... prev, name: e.target.value}))
                            const isOnlyCharSpace = /^(?!.*\s{2,})(?!^ )[A-Za-z\s]{1,50}$/.test( e.target.value);
                            const isCorrectLength =  e.target.value.length >= 3 &&  e.target.value.length <=50;           
                            if (!isOnlyCharSpace ){
                                setIsNameError(true);
                            } else { 
                                setIsNameError(false);
                             }
                        }}  
                        required
                    />
                    {isNameError && (
                        <div className="alert alert-danger mt-1 text-small" role="alert">
                            Name should have between 3 and 50 characters.
                            Name should contain only alphabet letters and spaces.
                            Name should not start or end with a space and should not contain consecutive spaces.
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="description"
                        value={product.description}
                        onChange={(e) => {
                            setProduct(prev => ({... prev, description: e.target.value}))
                        }}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        className="form-select"
                        onChange={(e) => {
                            setProduct(prev => ({... prev, category: e.target.value}))
                        }}
                        value={product.category}
                        required
                    >
                        {productCategories.map(category => {
                            return <option value={category} key={category}>{category}</option>
                        })}
                    </select>
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="img">Image</label>
                    <UploadPicWidget setImgUrl={setImgUrl}/>
                    {imgUrl && 
                        <div className="alert alert-success" role="alert">
                            Image uploaded successfully
                        </div>
                    }
                </div>

                <div className="form-group">
                    <button
                        type="submit"
                        className="btn btn-dark btn-block"
                        disabled={isLoading || isNameError || !imgUrl}
                    >
                        {isLoading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Add product</span>
                    </button>
                    
                </div>
                {requestState.reqSent && (
                    <div className="form-group">
                        <div className={requestState.isError ? "alert alert-danger" : "alert alert-success"} role="alert">
                            {requestState.resMessage}
                        </div>
                    </div>
                )}
            </Form>
        </div>
)
}
