import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: { 
      padding: 16,
      marginTop: 20,
    },
    image: { 
      width: "100%",
      height: 356,
    },
    title: {
      fontSize: 24,
      marginVertical: 10,
      fontFamily: "PlusJakartaSans-Bold",
    },
    iconsContainer: {
        flexDirection: "row",
        marginVertical: 10,
        paddingBottom: 10,
    },
    author: { 
      fontSize: 16,
      color: "gray",
      fontFamily: "PlusJakartaSans-Regular",
    },
    infoContainer: { 
      flexDirection: "row", 
      marginVertical: 10,
    },
    eta: {
      fontFamily: "PlusJakartaSans-Regular",
      marginRight: 10,
    },
    calorie: {
      fontFamily: "PlusJakartaSans-Regular",
    },
    nutritionContainer: { 
      flexDirection: "row",
      justifyContent: "space-around",
      marginVertical: 10
    },
    carbs: {
      fontFamily: "PlusJakartaSans-Regular",
    },
    fat: {
      fontFamily: "PlusJakartaSans-Regular",
    },
    protein: {
      fontFamily: "PlusJakartaSans-Regular",
    },
    sectionTitle: { 
      fontSize: 24, 
      marginVertical: 10,
      fontFamily: "PlusJakartaSans-Bold",
    },
    ingredientsContainer: {
        marginTop: 5,
        marginBottom: 5,
    },
    ingredient: {
        fontFamily: "PlusJakartaSans-Regular",
    },
    button: { 
      backgroundColor: "#ff6347", 
      padding: 10, 
      borderRadius: 5, 
      marginTop: 20, 
      alignItems: "center" 
    },
    buttonText: { 
      color: "white", 
      fontWeight: "bold"
  },
});

    
export default styles;