import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  backButton: {
    padding: 10,
    margin: 10,
    backgroundColor: '#393939',
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 16,
    color: '#ffffff',
  },
  statsContainer: {
    padding: 10,
    backgroundColor: '#393939',
    borderRadius: 30,
    marginBottom: 14,
  },
  statsText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  controlButton: {
    padding: 12,
    backgroundColor: '#212121',
    margin: 5,
    borderRadius: 15,
    alignItems: 'center',
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
  },
  containerSC: {
    padding: 10,
    backgroundColor: '#393939',
    borderRadius: 15,
    margin: 2,
  },
  textSC: {
    fontSize: 16,
    color: '#ffffff'
  },
});