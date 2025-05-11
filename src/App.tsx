import {StyleSheet, View} from 'react-native';
import {Session} from './components/Response';
import {UserPrompt} from './components/UserPrompt';
import {InputBox} from './components/InputBox';

function App() {
	return (
		<View style={[styles.root]}>
			<UserPrompt />
			<Session />
			<UserPrompt />
			<Session />
			<InputBox
				placeholder="Type your message here..."
				onSubmit={value => {
					console.log('Submitted:', value);
				}}
			/>
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
