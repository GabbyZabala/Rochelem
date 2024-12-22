import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    marginBottom: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#282c34',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  // HomeScreen styles
  homeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  logout: {
    padding: 20,
    backgroundColor: '#2196F3', // Changed to blue to match theme
    height: 50,
    justifyContent: 'center',
    alignItems: 'center', // Corrected alignment
    borderRadius: 5,
  },
  Accounts: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    height: 50,
    backgroundColor: '#2196F3', // Changed to blue to match theme
    borderRadius: 5,
  },
  welButton: {
    padding: 10,
  },
  welButtonText: {
    color: '#fff',
  },
  // NoteEditScreen styles
  noteEditContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  noteEditInput: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  noteEditDeleteButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  noteItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  noteTitle: {
    fontSize: 18,
    color: '#282c34',
  },
});

export default styles;