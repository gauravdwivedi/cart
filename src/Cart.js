import React from 'react';
import CartItem from './CartItem'



class Cart extends React.Component {

    constructor() {
        super();
        this.state = {
            products: [
                {
                    price: 19999,
                    title: 'Phone',
                    qty: 1,
                    img: '',
                    id: 1
                },

                {
                    price: 19999,
                    title: 'Laptop',
                    qty: 1,
                    img: '',
                    id: 2
            
                },

                {
                    price: 19999,
                    title: 'Camera',
                    qty: 1,
                    img: '',
                    id: 3
                },

                {
                    price: 19999,
                    title: 'Phone',
                    qty: 1,
                    img: '',
                    id: 4
                }
            ]
        }
    }

    render() {
        const { products } = this.state;
        return (
            <div className="cart">
                {products.map((product) => {
                    return <CartItem product={product}
                        key={product.id}/>
               })}
            </div>
        )
    }
}

export default Cart;