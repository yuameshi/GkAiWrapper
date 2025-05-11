import {StyleSheet, Text} from 'react-native';

export const ResponseFullText = () => {
	return (
		<Text selectable style={styles.text}>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis optio
			praesentium quasi perferendis asperiores ratione dolorum deserunt
			consectetur. Explicabo, sunt?
		</Text>
	);
};

const styles = StyleSheet.create({
	text: {
		color: '#fff',
		fontSize: 16,
		lineHeight: 24,
		padding: 10,
		textAlign: 'justify',
	},
});
