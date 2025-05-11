import {StyleSheet, View} from 'react-native';
import {Session} from './components/Response';
import {UserPrompt} from './components/UserPrompt';

function App() {
	return (
		<View style={[styles.root]}>
			<UserPrompt />
			<Session />
			<UserPrompt />
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
