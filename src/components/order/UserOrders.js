import React, { Fragment } from 'react'
import MetaData from '../Layouts/MetaData'
import {MDBDataTable} from 'mdbreact'

export const UserOrders = () => {
    const setOrders = ()=>{
        const data = {
            columns:[
                {
                    label: "Order ID",
                    field: "id",
                    sort:"asc"
                },
                {
                    label: "Number Of Items",
                    field: "numOfItems",
                    sort:"asc"
                },
                {
                    label: "Amount",
                    field: "amount",
                    sort:"asc"
                },
                {
                    label: "Status",
                    field: "status",
                    sort:"asc"
                },
                {
                    label: "Actions",
                    field: "actions",
                    sort:"asc"
                }
            ],
            rows:[]
        }
        return data
    }
  return (
    <Fragment>
        <MetaData title='My Orders'/>
        <h1 className='mt-5'>My orders</h1>
        <MDBDataTable
         className='px-3'
         bordered
         striped
         hover
         data={setOrders()}
        ></MDBDataTable>
    </Fragment>
  )
}
