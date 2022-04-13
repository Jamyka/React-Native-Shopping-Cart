import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {
  addItemToCartAction,
  minusItemfromCartAction,
  removeItemFromCart,
  addProducts,
} from '../Redux/Actions/CartActions';

function ProductListItem(props) {
  let [product, setProduct] = useState(props.product);
  let [counter, setCounter] = useState(product.qty);
  let [addToCart, setAddToCart] = useState(false);
  let increaseCounter = () => {
    props.add(product.itemID);
  };
  let decreaseCounter = () => {
    props.minus(product.itemID);
  };

  useEffect(() => {
    props.cart.products.forEach(ele => {
      if (ele.itemID === product.itemID) {
        // console.log(ele.qty, 'QTY');
        // console.log(counter, 'Counter');
        // console.log(ele.itemID, product.itemID);
        // setCounter(ele.qty < 1 ? decreaseCounter() : ele.qty);
        // if (ele.qty !== 0) {
        //   setCounter(0);
        // } else {
        //   setCounter(ele.qty);
        // }
        setCounter(ele.qty === 0 ? 0 : ele.qty);
        ele.qty === 0 ? setAddToCart(false) : setAddToCart(true);
      }
    });
    if (props.cart.cart.length === 0) {
      () => setAddToCart(false);
      () => setCounter(0);
    }
  });

  return (
    <View
      key={product.itemID}
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10,
        backgroundColor: 'orange',
        borderRadius: 10,
        padding: 5,
      }}>
      <View style={{borderRadius: 5, margin: 10}}>
        <Image
          source={require('../Assets/pizza.jpg')}
          style={{
            width: 100,
            height: 150,
            borderRadius: 5,
            resizeMode: 'stretch',
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '70%',
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 10}}>
          {product.itemName}
        </Text>
        <Text style={{fontSize: 14, marginTop: 10}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy.
        </Text>
        {addToCart ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              marginTop: 40,
              margin: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                increaseCounter();
                console.log(props.cart.products);
              }}>
              <View
                style={{
                  backgroundColor: '#3b5998',
                  width: 60,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <Icon name="plus" size={12} color={'white'} />
              </View>
            </TouchableOpacity>

            <Text style={{marginHorizontal: 20, fontSize: 18}}>{counter}</Text>

            <TouchableOpacity
              onPress={() => {
                decreaseCounter();
                console.log(counter);
              }}>
              <View
                style={{
                  backgroundColor: '#3b5998',
                  width: 60,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <Icon name="minus" size={12} color={'white'} />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <Pressable
            style={{
              marginTop: 40,
              width: '100%',
              height: 40,
              backgroundColor: '#3b5998',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10,
            }}
            onPress={() => {
              increaseCounter();
              console.log(counter);
              setAddToCart(true);
            }}>
            <Text style={{color: '#fff', fontSize: 18}}>Add To Cart</Text>
          </Pressable>
        )}
      </View>
    </View>
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
    minus: id => dispatch(minusItemfromCartAction(id)),
    addProducts: val => dispatch(addProducts(val)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductListItem);
