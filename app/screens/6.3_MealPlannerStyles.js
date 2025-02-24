import { StyleSheet } from "react-native";  

const styles = StyleSheet.create({
  containersafe:{
    flex:1,
    height:'100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  dateWrapper: {
    margin: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  dateContainer: {
    backgroundColor: '#FFF9DB',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
    color: '#555',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  pickerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', // Efek overlay semi-transparent
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Pastikan overlay muncul di atas elemen lain
  },

  pickerContainer: {
    backgroundColor: '#FFF',
    paddingBottom: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Efek shadow untuk Android
    width: '90%', // Ukuran picker agar tidak terlalu kecil
    alignItems: 'center',
  },
  scrollContainer: {
    paddingBottom: 30,  
  },
});

export default styles;