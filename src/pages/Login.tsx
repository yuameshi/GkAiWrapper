import {useEffect, useState} from 'react';
import {
	Alert,
	Button,
	Image,
	Linking,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import EventSource from 'react-native-sse';
import qrcode from 'qrcode-generator';
import {CheckPasswordApi} from '../api/login/check-password';
import {CheckTicketApi} from '../api/login/check-ticket';
import {LoginQrCodeApi} from '../api/login/login-qrcode';
import {setToken as setStoredToken} from '../store/token';

export const Login = () => {
	const [client, setClient] = useState<string | null>(null);
	const [qrCode, setQrCode] = useState<string | null>(null);
	const [ticket, setTicket] = useState<string | null>(null);

	useEffect(() => {
		const es = new EventSource<
			'HELLO' | 'LOGIN_SUCCESS_TICKET' | 'SUCCESS'
		>('https://cas.gdust.edu.cn/cas-api/sse/subscribe');

		es.addEventListener('HELLO', event => {
			console.log('Client ID Got:', event.data?.slice(0, 10) + '...');
			setClient(event.data);
		});

		es.addEventListener('LOGIN_SUCCESS_TICKET', event => {
			console.log('Ticket Got:', event.data?.slice(0, 10) + '...');
			setTicket(event.data);
		});

		es.addEventListener('error', event => {
			if (event.type === 'error') {
				console.error('Connection error:', event.message);
			} else if (event.type === 'exception') {
				console.error('Error:', event.message, event.error);
			}
			Alert.alert(
				'出现错误',
				'无法获取配置信息，请检查网络连接或稍后再试。',
			);
		});

		return () => {
			if (es) {
				es.removeAllEventListeners();
			}
		};
	}, []);

	useEffect(() => {
		if (!ticket) {
			return;
		}
		CheckPasswordApi(ticket)
			.then(() => CheckTicketApi(ticket))
			.then(() => LoginQrCodeApi(ticket))
			.then(token => {
				console.log('Login success: ', token.slice(0, 10) + '...');
				setStoredToken(token);
			})
			.catch(err => {
				console.error('Login error:', err);
				Alert.alert(
					'登录失败',
					err.message || '请检查网络连接或稍后再试。',
				);
			});
		return;
	}, [ticket]);

	useEffect(() => {
		if (!client) {
			return;
		}
		const qr = qrcode(0, 'H');
		qr.addData('https://cas.gdust.edu.cn/cas/mobieAuth?clientId=' + client);
		qr.make();
		const dataURL = qr.createDataURL(4, 8);
		setQrCode(dataURL);
	}, [client]);

	const handleOpenDingTalkMobile = () => {
		if (!client) {
			return;
		}
		Linking.openURL(
			`dingtalk://dingtalkclient/page/link?url=${encodeURIComponent(
				'https://cas.gdust.edu.cn/cas/mobieAuth?clientId=' + client,
			)}`,
		);
	};

	return (
		<View style={styles.root}>
			{qrCode ? (
				<>
					<Image
						source={{uri: qrCode || '', height: 256, width: 256}}
					/>
					<Text style={styles.text}>请使用钉钉客户端扫码</Text>
					<Button
						title="打开钉钉客户端 ( Beta )"
						onPress={handleOpenDingTalkMobile}
						disabled={!client}
					/>
				</>
			) : (
				<Text style={styles.text}>请稍后……</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 16,
		backgroundColor: '#242424',
	},
	text: {
		fontSize: 16,
		color: '#fff',
	},
});
