import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containersafe:{
    flex:1,
    height:'90%',
  },
  container: {
    // padding: 1,
    flex: 1,
    backgroundColor: '#F9F6F6',
  },
  filterList: {
    alignSelf:'center',
    marginTop: 0,
    marginBottom: 10,
    flexDirection: 'row',
    width: '95%',
  },
  searchAndFilterContainer: {
    // backgroundColor:'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf:'center',
    width:'95%',
    // paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBE2',
    height: 35,
    flex: 1,
    borderRadius: 8,
    // marginLeft: 5,
    alignSelf:'center',
    paddingHorizontal: 0,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#FFFBE2',
    marginLeft: 15,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 15,
    alignSelf: 'center',
  },
  filterButton: {
    paddingLeft: 15,
    alignItems: 'center',
    flex: 0.1,
  },
  filterIcon: {
    fontSize: 18,
    color: '#B99470',
    marginRight: 10,
  },
  
  filterItem: {
    backgroundColor: '#A6B37D',
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  filterItemSelected: {
    backgroundColor: '#8aa683',
  },
  filterText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#4a4a4a',
  },
  filterTextSelected: {
    color: '#fff',
  },
  trendingItem: {
    marginRight: 15,
    marginTop: 0,
    marginBottom: 15,
  },
  trendingImage: {
    width: 263,
    height: 141,
    borderRadius: 8,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 10,
  },
  trendingText: {
    fontFamily: 'PlusJakartaSans-Bold',
    color: 'white',
    fontSize: 16,
    overflow: 'hidden',
  },
  trendingTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Bold',
    marginLeft: 4,
    marginTop: 10,
  },
  trendinglist: {
    alignSelf:'center',
    width:'95%',
    // backgroundColor:'black',
  },
  trend1: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginRight: 80,
    borderRadius: 8,
    borderTopLeftRadius: 0,
  },
  trend2: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginRight: 102,
    borderRadius: 10,
    borderTopLeftRadius: 0,
  },
  section: {
    // backgroundColor:'black',
    width:'95%',
    marginLeft: 10,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Bold',
    marginLeft: 4,
    marginBottom: 8,
  },
  recipeItem: {
    // marginLeft: 8,
    marginRight: 15,
    width: 160,
    backgroundColor: '#FFFBE2',
    borderRadius: 8,
    flexDirection: 'column',
  },
  recipeImage: {
    width: 160,
    height: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius:8,
  },
  
  recipeTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    marginTop: 8,
    minHeight: 70,
    textAlign:'center',
    marginLeft: 5,
    marginRight:5,
  },
  recipeFooter: {
    marginTop: 'auto',
    alignSelf: 'center',
    alignContent:'center',
    width:'100%',
  },
  recipeDetails: {
    color: '#888',
    fontFamily: 'PlusJakartaSans-Regular',
    paddingBottom: 10,
    textAlign:'center',
  },
  backButton: {
    marginRight: 10,
  },
  scrollContainer: {
    paddingBottom: 30,  
  },
});

export default styles;