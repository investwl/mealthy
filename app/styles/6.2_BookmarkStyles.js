import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containersafe:{
    flex:1,
    height:'100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F6F6',
    // paddingTop: 35,
  },
  loadingContainer: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#333',
    fontFamily: 'PlusJakartaSans-Bold'
  },
  content: {
    flex: 1,
    paddingBottom: 80,
  },
  recipeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  recipeItem: {
    width: '48%',
    marginBottom: 20,
    backgroundColor: '#FEFAE0',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  recipeImage: {
    width: '100%',
    height: 150,
  },
  recipeTextContainer: {
    padding: 10,
    marginTop: 2,
    alignItems: 'center',
  },
  containername: {
    minHeight:70,
  },
  recipeTitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'PlusJakartaSans-Regular'
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    marginHorizontal: 8,
    color: '#777',
    fontSize: 14,
  },
  recipeDetails: {
    fontSize: 14,
    color: '#777',
    marginLeft: 5,
    fontFamily: 'PlusJakartaSans-Regular'
  },
  infoBox: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FEFAE0',
    alignItems: 'center',
    marginHorizontal: 90,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#4B4B4B',
    fontFamily: 'PlusJakartaSans-Regular'
  },
  buttonContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  button: {
    backgroundColor: '#F1E3A1',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1C28B',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#4B4B4B',
    fontFamily: 'PlusJakartaSans-Regular'
  },
  iconSpacing: {
    marginLeft: 8,
  },
  searchAndFilterContainer: {
    alignItems:'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBE2',
    height: 35,
    borderRadius: 8,
    paddingHorizontal: 0,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 15,
    alignSelf: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#000000',
    marginLeft: 15,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#333',
    fontFamily: 'PlusJakartaSans-Bold',
    marginTop: -10,  // Menambah margin top untuk mengangkat posisi title
  },

  filterList: {
    flexDirection: 'row',
    width: '100%',
  },
  filterItem: {
    backgroundColor: '#A6B37D',
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 32,
    marginRight: 10,
  },
  filterItemSelected: {
    backgroundColor: '#8aa683',
  },
  filterText: {
    fontSize: 14,
    color: '#4a4a4a',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  filterTextSelected: {
    color: '#000000',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  scrollContainer: {
    paddingBottom: 30,  
  },
});

export default styles;