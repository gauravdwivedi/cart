import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
        products: [
            {
                price: 19999,
                title: 'Phone',
                qty: 1,
                img: 'https://images.unsplash.com/photo-1571380401583-72ca84994796?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
                id: 1
            },

            {
                price: 19999,
                title: 'Laptop',
                qty: 1,
                img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=926&q=80',
                id: 2
        
            },

            {
                price: 19999,
                title: 'Camera',
                qty: 1,
                img: 'https://images.unsplash.com/photo-1492850298657-e81006f7a54c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
                id: 3
            },

            {
                price: 19999,
                title: 'Diamond Ring',
                qty: 1,
                img: 'https://images.unsplash.com/photo-1527628173875-3c7bfd28ad78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
                id: 4
            }
        ]
    }
}

handleIncreaseQuantity = (product) => {
    console.log('Hey please increase the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    products[index].qty += 1;

    this.setState({
        //products:products
        products
    })
}

handleDecreaseQuantity = (product) => {
    console.log('Hey please decrease the qty of ', product);
    const { products } = this.state;

    const index = products.indexOf(product);

    if (products[index].qty === 0) {
        return;
    }

    products[index].qty -= 1;

    this.setState({
        products
    })
}
handleDeleteProduct = (id) => {
    const { products } = this.state;
    const items = products.filter((item) => item.id !== id);

    this.setState({ products: items });
}
  getCartCount=()=>{
  const { products } = this.state;

  let count = 0;

  products.forEach((product) => {
    count += product.qty;
  });
  return count;
  }

  getCartTotal = () => { 
    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => { 
      cartTotal = cartTotal + product.qty * product.price;
    })
    return cartTotal;
  }
  render() {
    const { products } = this.state;
    return (
      <div className="App">

        <Navbar count={this.getCartCount()} />
        <Cart
          products ={products}
         onIncreaseQuantity={this.handleIncreaseQuantity}
         onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct} />
        <div style={{padding:10, fontSize:20}}>Total :{this.getCartTotal()}</div>
      </div>
    );
  }
}
export default App;
