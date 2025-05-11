import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {Session} from './components/Response';
import {UserPrompt} from './components/UserPrompt';
import {InputBox} from './components/InputBox';
import {useEffect, useState} from 'react';
import {createSession} from './api/create-session';

type Message = {
	id: number;
	content: string;
	thoughts?: string;
	seconds?: number;
	sender: 'user' | 'assistant';
};

function App() {
	const [inputDisabled, setInputDisabled] = useState(true);
	const [id, setId] = useState<number | null>(null);
	const [sessionId, setSessionId] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		createSession()
			.then(res => {
				if (res.code === 1) {
					setId(res.data.id);
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

	const handleSubmit = (value: string) => {
		if (!id || !sessionId) {
			Alert.alert('会话未创建', '请稍后再试');
			return;
		}
		setLoading(true);
		setMessages(prev => [
			...prev,
			{
				id: id,
				content: value,
				sender: 'user',
			},
		]);
		// Simulate sending a message
		setTimeout(() => {
			// Simulate receiving a response
			setMessages(prev => [
				...prev,
				{
					id: id,
					content: '这是一个模拟的响应',
					thoughts: '思考内容',
					seconds: 2,
					sender: 'assistant',
				},
			]);
			setLoading(false);
		}, 2000);
	};

	return (
		<View style={[styles.root]}>
			<ScrollView style={styles.scrollView}>
				{messages.map((msg, index) => (
					<View key={index}>
						{msg.sender === 'user' ? (
							<UserPrompt content={msg.content} />
						) : (
							<Session
								content={msg.content}
								thoughts={msg.thoughts || ''}
								seconds={msg.seconds || 0}
								loading={false}
							/>
						)}
					</View>
				))}
			</ScrollView>
			<InputBox disabled={inputDisabled} onSubmit={handleSubmit} />
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
