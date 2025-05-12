import {Alert} from 'react-native';
import {useEffect, useState} from 'react';
import {createSession} from './api/create-session';
import {Main} from './pages/Main';

function App() {
	const [id, setId] = useState<number | null>(null);
	const [sessionId, setSessionId] = useState<string | null>(null);

	useEffect(() => {
		createSession()
			.then(res => {
				if (res.code === 1) {
					console.log(
						'Session created:',
						res.data.id,
						res.data.sessionId,
					);
					setId(res.data.id);
					setSessionId(res.data.sessionId);
				} else {
					console.error('Failed to create session:', res.msg);
					Alert.alert('创建会话失败', res.msg);
				}
			})
			.catch(err => {
				console.error('Error creating session:', err);
				Alert.alert('创建会话失败', '网络错误，请稍后再试');
			});
	}, []);

	return id && sessionId ? <Main id={id} sessionId={sessionId} /> : <></>;
}

export default App;
