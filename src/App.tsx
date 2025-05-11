import {StyleSheet, View} from 'react-native';
import {Session} from './components/Response';

function App() {
	return (
		<View style={[styles.root]}>
			<Session />
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default App;
