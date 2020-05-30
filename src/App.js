import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
// import Timer from './Timer';
import * as firebase from 'firebase';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true
    }

    this.db = firebase.firestore();
    
}

  componentDidMount() {
    // firebase.firestore()
    //   .collection('products')
    //   .get()
    //   .then((snapshot) => {
    //     console.log(snapshot);
    //     snapshot.docs.map((doc) => {
    //       console.log(doc.data());
    //     });

    //     const products = snapshot.docs.map((doc) => {
    //       const data = doc.data();

    //       data['id'] = doc.id;
    //       return data;
    //       //return doc.data();
    //     })

    //     this.setState({
    //       products,
    //       loading: false
    //     })
    // })
    this.db
    .collection('products')
    .onSnapshot((snapshot) => {
      console.log(snapshot);
      snapshot.docs.map((doc) => {
        console.log(doc.data());
      });

      const products = snapshot.docs.map((doc) => {
        const data = doc.data();

        data['id'] = doc.id;
        return data;
        //return doc.data();
      })

      this.setState({
        products,
        loading: false
      })
    })
    
        //this is for Timer
        this.interval = setInterval(() => this.tick(), 1000);
  }

  //timer 
componentWillUnmount(){
  clearInterval(this.interval);
}
  
  
handleIncreaseQuantity = (product) => {
    console.log('Hey please increase the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);

  //   products[index].qty += 1;

  // this.setState({
  //   //products:products
  //   products,
    
  // });

  const docRef = this.db.collection('products').doc(products[index].id);

  docRef.update({
    qty:products[index].qty + 1
  })
    .then(()=> {
    console.log("Updated Successfully")
  })
}

handleDecreaseQuantity = (product) => {
    console.log('Hey please decrease the qty of ', product);
    const { products } = this.state;

    const index = products.indexOf(product);

    if (products[index].qty === 0) {
        return;
    }

    // products[index].qty -= 1;

    // this.setState({
    //     products
    // })
    const docRef = this.db.collection('products').doc(products[index].id);

    docRef.update({
      qty:products[index].qty - 1
    })
      .then(()=> {
      console.log("Updated Successfully")
      }).catch((error) => {
        console.log("Error", error);
    })
}
handleDeleteProduct = (id) => {
    const { products } = this.state;
    // const items = products.filter((item) => item.id !== id);

    // this.setState({ products: items });
  const docRef = this.db.collection('products').doc(id);
  docRef
    .delete()
  .then(()=> {
    console.log("Deleted Successfully")
    }).catch((error) => {
      console.log("Error", error);
  })
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
      if (product.qty > 0) {
        cartTotal = cartTotal + product.qty * product.price;
      }
      return '';
    })
    return cartTotal;
  }

  tick() {
    this.setState(state => ({
        seconds: state.seconds + 1
    }));
}

  timer = () => {
    this.state = { seconds: 0 };
  }

  addProduct = () => {
    this.db.collection(
      'products'
    )
      .add({
        img: '',
        price: 900,
        qty: 4,
        title:'washing machine'
      })
      .then((docRef) => {
        console.log("Prodcut has been added", docRef);
      })
      .catch((error) => {
        console.log("Error", error);
    })
      
  }
  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        {/* <Timer /> */}
        <Navbar count={this.getCartCount()} />
        <button onClick={this.addProduct}>Add a Product</button>
        <Cart
          products ={products}
         onIncreaseQuantity={this.handleIncreaseQuantity}
         onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
          products={products} />
        { loading && <h1>Loading Products ...</h1>}
        <div style={{padding:10, fontSize:20}}>Total :{this.getCartTotal()}</div>
      </div>
    );
  }
}
export default App;
