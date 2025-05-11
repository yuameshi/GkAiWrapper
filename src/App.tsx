import {ScrollView, StyleSheet, View} from 'react-native';
import {Session} from './components/Response';
import {UserPrompt} from './components/UserPrompt';
import {InputBox} from './components/InputBox';

function App() {
	return (
		<View style={[styles.root]}>
			<ScrollView style={styles.scrollView}>
				<UserPrompt />
				<Session />
			</ScrollView>
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
	scrollView: {
		flexShrink: 1,
		width: '100%',
		paddingHorizontal: 16,
	},
});

export default App;
