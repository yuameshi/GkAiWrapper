import { Alert, Platform, SafeAreaView, StatusBar, View } from 'react-native';
import { useEffect, useState } from 'react';
import { createSession } from './api/create-session';
import { Main } from './pages/Main';
import { getToken, setToken as setStoredToken } from './store/token';
import { Login } from './pages/Login';

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

	const refreshSession = async () => {
		if (!token) {
			return;
		}
		try {
			const response = await createSession();
			if (response.code === 1) {
				console.log(
					'Session refreshed:',
					response.data.id,
					response.data.sessionId,
				);
				setId(response.data.id);
				setSessionId(response.data.sessionId);
				setStoredToken(token);
			} else {
				console.error('Failed to refresh session:', response.msg);
				Alert.alert('创建会话失败', response.msg);
			}
		} catch (error) {
			console.error('Error creating session:', error);
			Alert.alert('创建会话失败', '网络错误，请稍后再试');
		}
	};

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
		<Main id={id} sessionId={sessionId} refreshSession={refreshSession} />
	) : (
		<Login setToken={setToken} />
	);
}

export default function AppWrapper() {
	const OS = Platform.OS;
	if (OS === 'ios') {
		return (
			<SafeAreaView>
				<App />
			</SafeAreaView>
		);
	} else if (OS === 'android') {
		return (
			<>
				<StatusBar
					translucent={true}
					backgroundColor="transparent"
					barStyle="dark-content"
				/>
				<View style={{ height: StatusBar.currentHeight }} />
				<App />
			</>
		);
	} else {
		return <App />;
	}
}
