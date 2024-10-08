import React from 'react'

export const OrderDetail = () => {
  return (
    <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-details">

            <h1 className="my-5">Order # 4543f34f545</h1>

            <h4 className="mb-4">Shipping Info</h4>
            <p><b>Name:</b> Tameem</p>
            <p><b>Phone:</b> 999 999 9999</p>
            <p className="mb-4"><b>Address:</b>8940, mount road, chennai, tamilnadu</p>
            <p><b>Amount:</b> $467</p>

            <hr />

            <h4 className="my-4">Payment</h4>
            <p className="greenColor" ><b>PAID</b></p>


            <h4 className="my-4">Order Status:</h4>
            <p className='greenColor' ><b>Delivered</b></p>


            <h4 className="my-4">Order Items:</h4>

            <hr />
            <div className="cart-item my-1">
                        <div className="row my-5">
                            <div className="col-4 col-lg-2">
                                <img src='./images/products/3.jpg' alt="Laptop" height="45" width="65" />
                            </div>

                            <div className="col-5 col-lg-5">
                                <a href="#">Laptop</a>
                            </div>


                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                <p>$467</p>
                            </div>

                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                <p>1 Piece(s)</p>
                            </div>
                        </div>
            </div>
            <hr />
        </div>
    </div>
  )
}
