import {Alert} from 'react-native';
import {useEffect, useState} from 'react';
import {createSession} from './api/create-session';
import {Main} from './pages/Main';
import {getToken, setToken as setStoredToken} from './store/token';
import {Login} from './pages/Login';

function App() {
	const [id, setId] = useState<number | null>(null);
	const [sessionId, setSessionId] = useState<string | null>(null);
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		getToken().then(storedToken => {
			if (storedToken) {
				setToken(storedToken);
			}
		});
	}, []);

	useEffect(() => {
		if (!token) {
			return;
		}
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
					setStoredToken(token);
				} else {
					console.error('Failed to create session:', res.msg);
					Alert.alert('创建会话失败', res.msg);
				}
			})
			.catch(err => {
				console.error('Error creating session:', err);
				Alert.alert('创建会话失败', '网络错误，请稍后再试');
			});
	}, [token]);

	return id && sessionId ? (
		<Main id={id} sessionId={sessionId} />
	) : (
		<Login setToken={setToken} />
	);
}

export default App;
