import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {Session} from '../components/Response';
import {UserPrompt} from '../components/UserPrompt';
import {InputBox} from '../components/InputBox';
import {type FC, useRef, useState} from 'react';
import {chat} from '../api/chat';
import {getTime} from '../utils/getTime';

type Message = {
	content: string;
	thoughts?: string;
	seconds?: number;
	sender: 'user' | 'assistant';
};

type MainPageProps = {
	id: number;
	sessionId: string;
};

export const Main: FC<MainPageProps> = ({id, sessionId}) => {
	const [inputDisabled, setInputDisabled] = useState(true);
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [activeMessage, setActiveMessage] = useState<Message | null>(null);
	const scrollViewRef = useRef<ScrollView>(null);

	const handleSubmit = (value: string) => {
		if (!id || !sessionId) {
			Alert.alert('会话未创建', '请稍后再试');
			return;
		}
		setInputDisabled(true);
		setLoading(true);
		setMessages(prev => [
			...prev,
			{
				id: id,
				content: value,
				sender: 'user',
			},
		]);
		const loadStartTime = getTime();
		const timer = setInterval(() => {
			setActiveMessage({
				content: '请稍后...',
				seconds: Math.floor((Date.now() - (loadStartTime || 0)) / 1000),
				thoughts: '正在思考...',
				sender: 'assistant',
			});
		}, 1000);
		chat(id, sessionId, value)
			.then(msg => {
				setActiveMessage(null);
				setMessages(prev => [
					...prev,
					{
						content: msg.output.text,
						seconds: Math.floor(
							(getTime() - (loadStartTime || 0)) / 1000,
						),
						thoughts: msg.output.thoughts.find(
							t => t.action_type === 'reasoning',
						)?.response,
						sender: 'assistant',
					},
				]);
			})
			.catch(error => {
				console.error('Error:', error);
				Alert.alert('发生错误', error);
				setLoading(false);
			})
			.finally(() => {
				setInputDisabled(false);
				setLoading(false);
				clearInterval(timer);
				scrollViewRef.current?.scrollToEnd({animated: true});
			});
	};

	return (
		<View style={[styles.root]}>
			<ScrollView style={styles.scrollView} ref={scrollViewRef}>
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
				<View>
					{loading && (
						<Session
							content={activeMessage?.content || ''}
							thoughts={activeMessage?.thoughts || ''}
							seconds={activeMessage?.seconds || 0}
							loading={true}
						/>
					)}
				</View>
			</ScrollView>
			<InputBox disabled={inputDisabled} onSubmit={handleSubmit} />
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#242424',
	},
	scrollView: {
		flexShrink: 1,
		width: '100%',
		paddingHorizontal: 16,
	},
});
