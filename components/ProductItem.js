import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

const ProductItem = ({ item }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  return (
    <Pressable style={styles.container}>
      <Image style={styles.img} source={{ uri: item?.image }} />

      <Text numberOfLines={1} style={styles.title}>
        {item?.title}
      </Text>

      <View style={styles.detailBox}>
        <Text style={styles.price}>₹{item?.price}</Text>
        <Text style={styles.rating}>{item?.rating?.rate} ratings</Text>
      </View>

      <Pressable style={styles.btn}>
        {addedToCart ? (
          <View>
            <Text>Added to Cart</Text>
          </View>
        ) : (
          <Text>Add to Cart</Text>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 25,
  },
  img: {
    width: 130,
    height: 130,
    resizeMode: "contain",
  },
  title: {
    width: 130,
    marginTop: 10,
  },
  detailBox: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
  },
  rating: {
    color: "#FFC72C",
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: "#FFC72C",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
});
