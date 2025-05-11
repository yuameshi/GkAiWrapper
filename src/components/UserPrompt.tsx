import type {FC} from 'react';
import {StyleSheet, Text} from 'react-native';

type UserPromptProps = {
	content: string;
};

export const UserPrompt: FC<UserPromptProps> = ({content}) => {
	return (
		<Text selectable style={styles.text}>
			{content}
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
