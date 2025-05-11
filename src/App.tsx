import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {Session} from './components/Response';
import {UserPrompt} from './components/UserPrompt';
import {InputBox} from './components/InputBox';
import {useEffect, useState} from 'react';
import {createSession} from './api/create-session';

function App() {
	const [inputDisabled, setInputDisabled] = useState(false);
	const [sessionId, setSessionId] = useState<string | null>(null);

	useEffect(() => {
		createSession()
			.then(res => {
				if (res.code === 1) {
					setSessionId(res.data.sessionId);
					setInputDisabled(false);
				} else {
					console.error('Failed to create session:', res.msg);
					Alert.alert('创建会话失败', res.msg);
					setInputDisabled(true);
				}
			})
			.catch(err => {
				console.error('Error creating session:', err);
				Alert.alert('创建会话失败', '网络错误，请稍后再试');
				setInputDisabled(true);
			});
	}, []);

	return (
		<View style={[styles.root]}>
			<ScrollView style={styles.scrollView}>
				<UserPrompt />
				<Session />
			</ScrollView>
			<InputBox
				disabled={inputDisabled}
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
