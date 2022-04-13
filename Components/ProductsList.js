import React, {useState, useEffect} from 'react';
import {ScrollView, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ProductListItem from './ProductListItem';
import {getProducts} from '../Services/ProductsService';
import {connect, useDispatch} from 'react-redux';

import {addProducts} from '../Redux/Actions/CartActions';

import CartIcon from './CartIcon';

function ProductsList(props) {
  // let newList = [
  //   {
  //     itemID: 100,
  //     itemName: 'ReactProX Headset',
  //     itemPrice: 350,
  //     image: require('../Assets/pizza.jpg'),
  //     description:
  //       'A headset combines a headphone with microphone. Headsets are made with either a single-earpiece (mono) or a double-earpiece (mono to both ears or stereo).',
  //   },
  //   {
  //     itemID: 101,
  //     itemName: 'ReactProX Headset',
  //     itemPrice: 350,
  //     image: require('../Assets/pizza.jpg'),
  //     description:
  //       'A headset combines a headphone with microphone. Headsets are made with either a single-earpiece (mono) or a double-earpiece (mono to both ears or stereo).',
  //   },
  //   {
  //     itemID: 103,
  //     itemName: 'ReactProX Headset',
  //     itemPrice: 350,
  //     image: require('../Assets/pizza.jpg'),
  //     description:
  //       'A headset combines a headphone with microphone. Headsets are made with either a single-earpiece (mono) or a double-earpiece (mono to both ears or stereo).',
  //   },
  //   {
  //     itemID: 104,
  //     itemName: 'ReactProX Headset',
  //     itemPrice: 350,
  //     image: require('../Assets/pizza.jpg'),
  //     description:
  //       'A headset combines a headphone with microphone. Headsets are made with either a single-earpiece (mono) or a double-earpiece (mono to both ears or stereo).',
  //   },
  // ];
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(addProducts(newList));
  // }, []);

  const navigation = useNavigation();
  // let [products, setProducts] = useState(getProducts());
  // console.log(props.cart.products);

  return (
    <ScrollView>
      {props.cart.products &&
        props.cart.products.map(product => {
          return <ProductListItem product={product} key={product.itemID} />;
        })}
      <Pressable
        onPress={() => {
          // navigation.navigate('Cart', {products});
          navigation.navigate('Cart');
        }}>
        <CartIcon />
      </Pressable>
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
    addProducts: val => dispatch(addProducts(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
