import React from 'react'
import {useEffect,useState} from 'react'
import {useDispatch,useSelector} from "react-redux"
import { getProduct } from '../../actions/productsActions'
import {useParams} from 'react-router-dom'
import Loader from '../Layouts/Loader'
import MetaData from '../Layouts/MetaData'
import {Carousel,CarouselItem} from 'react-bootstrap'
import { addCartItem } from '../../actions/cartActions'
import {Modal} from 'react-bootstrap'

export const ProductDetails = () => {
    const dispatch = useDispatch()
    const {product,loading} = useSelector((state => state.productState))
    const {id} = useParams();
    const [quantity,setQuantity] = useState("1")

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const increaseQty = ()=>{
        const count = document.querySelector('.count')
        if(product.stock === 0 || count.valueAsNumber >= product.stock){
            return 
        }

        const qty = count.valueAsNumber + 1
        setQuantity(qty)
    }

    const decreaseQty = ()=>{
        const count = document.querySelector('.count')
        if(count.valueAsNumber === 1){
            return 
        }

        const qty = count.valueAsNumber - 1
        setQuantity(qty)
    }
    useEffect(() => {
        dispatch(getProduct(id))
    }, [id,dispatch])
  return (
    <>
        {
        loading ? <Loader/>:
        <>
        <MetaData title={product.name}/>
        <div className="row f-flex justify-content-around">
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
            <Carousel pause="hover">
                {
                    product.images && product.images.map(image => 
                        <CarouselItem key={image.id}>
                            <img src={image.image} alt="productitem" className="d-block w-100" height="500" width="500"/>
                        </CarouselItem>
                    )
                }
            </Carousel>
        </div>

        <div className="col-12 col-lg-5 mt-5">
            <h3>{product.name}</h3>
            <p id="product_id">Product # {product._id}</p>

            <hr/>

            <div className="rating-outer">
                <div className="rating-inner" style={{width: `${product.ratings / 5 * 100}%`}}></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews}Reviews)</span>

            <hr/>

            <p id="product_price">${product.price}</p>
            <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
            </div>
             <button type="button" id="cart_btn" disabled={product.stock === 0 ? true : false} className="btn btn-primary d-inline ml-4" onClick = {()=>dispatch(addCartItem(product._id,quantity))}>Add to Cart</button>

            <hr/>

            <p>Status: <span className={product.stock > 0 ? "greenColor":"redColor"}>{product.stock > 0 ? "In Stack":"Out of stock"}</span></p>

            <hr/>

            <h4 className="mt-2">Description:</h4>
            <p>{product.description}</p>
            <hr/>
            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
            
            <button  onClick={handleShow} id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                        Submit Your Review
            </button>
            
            <div className="row mt-2 mb-5">
                <div className="rating w-50">
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Submit Review</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                                <ul className="stars" >
                                    <li className="star"><i className="fa fa-star"></i></li>
                                    <li className="star"><i className="fa fa-star"></i></li>
                                    <li className="star"><i className="fa fa-star"></i></li>
                                    <li className="star"><i className="fa fa-star"></i></li>
                                    <li className="star"><i className="fa fa-star"></i></li>
                                </ul>

                                <textarea name="review" id="review" className="form-control mt-3">
                                </textarea>

                                <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                        </Modal.Body>
                    </Modal>
                </div>
        </div>
    </div>
</div> </>
        }
   </>
  )
}