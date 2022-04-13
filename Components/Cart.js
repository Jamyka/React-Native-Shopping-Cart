import React, {useState, useEffect, useCallback} from 'react';
import {ScrollView, TouchableOpacity, View, Text, Image} from 'react-native';

import {connect} from 'react-redux';
import {
  addItemToCartAction,
  removeAllItemsFromCart,
  removeItemFromCart,
} from '../Redux/Actions/CartActions';
import CartItem from './CartItem';

function Cart(props) {
  // Cart(params) let items = params.route.params.products;
  let [cartTotalPrice, setCartTotalPrice] = useState(0);
  let [cartItemsCount, setCartItemsCount] = useState(0);
  let [products, setProducts] = useState(props.cart.cart);

  useEffect(() => {
    let items = 0;
    let price = 0;

    props.cart.cart.forEach(item => {
      items += item.qty;
      price += Number(item.qty) * Number(item.itemPrice);
    });
    setCartItemsCount(items);
    setCartTotalPrice(price);
    setProducts(products);
  }, [
    cartTotalPrice,
    cartItemsCount,
    setCartItemsCount,
    setCartTotalPrice,
    props.cart.cart,
    products,
    setProducts,
  ]);
  return (
    <ScrollView>
      {props.cart.cart.length === 0 ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 200,
            backgroundColor: 'gray',
            marginVertical: 100,
          }}>
          {/* <Image /> */}
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>No Data</Text>
        </View>
      ) : (
        props.cart.cart.map(item => {
          return (
            <CartItem
              itemName={item.itemName}
              iPrice={item.itemPrice}
              image={item.image}
              description={item.description}
              itemID={item.itemID}
              qty={item.qty}
              key={item.itemID}
            />
          );
        })
      )}
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 2,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'gray',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 55,
              marginVertical: 35,
            }}>
            No. of Items = {cartItemsCount}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'gray',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            Total Order = {cartTotalPrice}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              props.removeAll();
            }}
            style={{
              width: '25%',
              height: 45,
              backgroundColor: 'red',
              marginHorizontal: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <View>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Clear Cart</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '65%',
              height: 45,
              backgroundColor: 'green',
              marginHorizontal: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <View>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Check Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
let mapStateToProps = state => {
  return {
    cart: state.cart,
  };
};

let mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    add: id => dispatch(addItemToCartAction(id)),
    remove: id => dispatch(removeItemFromCart(id)),
    removeAll: () => dispatch(removeAllItemsFromCart()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
