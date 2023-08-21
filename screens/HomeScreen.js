import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { deals, images, list, offers } from "../staticData";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("jewelery");
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);

  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const { data } = await axios.get("https://fakestoreapi.com/products");
        if (data) {
          setProducts(data);
        }
      } catch (error) {
        console.log("error msg:", error);
      }
    };
    fetchProductData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* searchbox */}
        <View style={styles.searchContainer}>
          <Pressable style={styles.searchBox}>
            <AntDesign
              name="search1"
              size={22}
              style={{ paddingLeft: 10 }}
              color="black"
            />
            <TextInput placeholder="Search on Amazon.in" />
          </Pressable>
          <Feather name="mic" size={24} color="black" />
        </View>

        {/* Sub address */}
        <View style={styles.addressContainer}>
          <Ionicons name="location-outline" size={24} color="black" />
          <Pressable>
            <Text style={styles.addressText}>
              Deliver to Suraj - Mumabi 410218
            </Text>
          </Pressable>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </View>

        {/* Products */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list.map((item, index) => (
            <Pressable key={index} style={styles.productBox}>
              <Image source={{ uri: item?.image }} style={styles.productImg} />
              <Text style={styles.productText}>{item?.name}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* sliderbox */}
        <SliderBox
          images={images}
          autoPlay
          circleLoop
          dotColor={"#13274f"}
          inactiveDotColor={"#90a4ae"}
          ImageComponentStyle={{ width: "100%" }}
        />

        {/* Trending  */}
        <Text style={styles.trending}>Trending Deals of the week</Text>
        <View style={styles.trendingMain}>
          {deals.map((item, index) => (
            <Pressable key={index} style={styles.trendingBox}>
              <Image
                source={{ uri: item?.image }}
                style={styles.trendingProductImg}
              />
            </Pressable>
          ))}
        </View>

        {/* Border */}
        <Text style={styles.border} />

        {/* Todays deals */}
        <Text style={styles.Tdeals}>Today's Deals</Text>

        {/* offers */}

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {offers.map((item, index) => (
            <Pressable
              key={index}
              onPress={() =>
                navigation.navigate("Info", {
                  id: item.id,
                  title: item.title,
                  price: item?.price,
                  carouselImages: item.carouselImages,
                  color: item?.color,
                  size: item?.size,
                  oldPrice: item?.oldPrice,
                  item: item,
                })
              }
              style={styles.offerBox}
            >
              <Image style={styles.offerImg} source={{ uri: item?.image }} />

              <View style={styles.offerBoxText}>
                <Text style={styles.offerBoxTextDetails}>
                  Upto {item?.offer}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* Border */}
        <Text style={styles.border} />

        {/* dropdown picker */}
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 20,
            width: "45%",
            marginBottom: open ? 50 : 15,
          }}
        >
          <DropDownPicker
            style={[styles.dropDownPicker, { marginBottom: open ? 120 : 15 }]}
            open={open}
            value={category} //genderValue
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
            placeholder="Choose Category"
            placeholderStyle={styles.placeholderStyles}
            onOpen={onGenderOpen}
            // onChangeValue={onChange}
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>

        {/* products from api fakestore*/}
        <View style={styles.productContainer}>
          {products
            ?.filter((item) => item.category === category)
            .map((item, index) => (
              <ProductItem item={item} key={index} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  searchContainer: {
    backgroundColor: "#00ced1",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    gap: 10,
    marginHorizontal: 7,
    borderRadius: 3,
    height: 35,
    flex: 1,
  },
  addressContainer: {
    flexDirection: "row",
    backgroundColor: "#afeeee",
    alignItems: "center",
    gap: 5,
    padding: 10,
  },
  addressText: {
    fontWeight: "500",
    fontSize: 13,
  },
  productBox: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  productImg: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
  productText: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 5,
  },
  trending: {
    fontWeight: "bold",
    fontSize: 18,
    padding: 10,
  },
  trendingMain: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  trendingProductImg: {
    height: 180,
    width: 180,
    resizeMode: "contain",
  },
  trendingBox: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  border: {
    height: 1,
    borderColor: "#D0D0D0",
    borderWidth: 2,
    marginTop: 15,
  },
  Tdeals: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  offerBox: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  offerImg: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  offerBoxText: {
    backgroundColor: "#E31837",
    paddingVertical: 5,
    width: 130,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 4,
  },
  offerBoxTextDetails: {
    textAlign: "center",
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  dropDownPicker: {
    borderColor: "#B7B7B7",
    height: 30,
  },
});
