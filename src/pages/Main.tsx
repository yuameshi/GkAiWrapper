import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Session } from '../components/Response';
import { UserPrompt } from '../components/UserPrompt';
import { InputBox } from '../components/InputBox';
import { type FC, useEffect, useRef, useState } from 'react';
import { chat } from '../api/chat-sse';
import { getTime } from '../utils/getTime';
import { ModalSwitch } from '../components/ModelSwitch';
import { models } from '../components/ModelSwitch/models';
import { ModelContext } from '../contexts/modelContext';
import { useUpdateEffect } from '../hooks/useUpdateEffect';

type Message = {
	content: string;
	thoughts?: string;
	seconds?: number;
	sender: 'user' | 'assistant';
};

type MainPageProps = {
	id: number;
	sessionId: string;
	refreshSession: () => Promise<void>;
};

export const Main: FC<MainPageProps> = ({ id, sessionId, refreshSession }) => {
	const [inputDisabled, setInputDisabled] = useState(true);
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [activeMessage, setActiveMessage] = useState<Message | null>(null);
	const scrollViewRef = useRef<ScrollView>(null);
	const [model, setModel] = useState(models[1]);

	useEffect(() => {
		if (!id || !sessionId) {
			setInputDisabled(true);
			return;
		} else {
			setInputDisabled(false);
		}
	}, [id, sessionId]);

	useUpdateEffect(() => {
		if (!refreshSession) {
			return;
		}
		console.log('Model changed:', model);
		setInputDisabled(true);
		refreshSession().then(() => {
			setInputDisabled(false);
			setActiveMessage(null);
			setMessages([]);
		});
	}, [model]);

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
		chat(
			id,
			sessionId,
			model.id,
			value,
			msg => {
				if (msg.output.finish_reason === 'stop') {
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
					setInputDisabled(false);
					setLoading(false);
					scrollViewRef.current?.scrollToEnd({ animated: true });
					return;
				}
				setActiveMessage({
					content: msg.output.text,
					seconds: Math.floor(
						(getTime() - (loadStartTime || 0)) / 1000,
					),
					thoughts: msg.output.thoughts.find(
						t => t.action_type === 'reasoning',
					)?.response,
					sender: 'assistant',
				});
			},
			() => {
				if (activeMessage) {
					setMessages(prev => [...prev, activeMessage]);
				}
				setActiveMessage(null);
				setLoading(false);
				setInputDisabled(false);
				setLoading(false);
				Alert.alert('发生错误', '请稍后再试');
				scrollViewRef.current?.scrollToEnd({ animated: true });
			},
		);
	};

	return (
		<View style={[styles.root]}>
			<ModelContext.Provider value={{ model, setModel }}>
				<ModalSwitch />
			</ModelContext.Provider>
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
