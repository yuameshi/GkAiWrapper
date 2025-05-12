import { StyleSheet, View } from 'react-native';
import { Thoughts } from './Thoughts';
import { ResponseFullText } from './FullText';
import type { FC } from 'react';

type ResponseProps = {
	loading: boolean;
	seconds: number;
	thoughts: string;
	content: string;
};

export const Session: FC<ResponseProps> = ({
	loading,
	thoughts,
	seconds,
	content,
}) => {
	return (
		<View style={[styles.root]}>
			<Thoughts loading={loading} seconds={seconds} thoughts={thoughts} />
			<ResponseFullText content={content} />
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		width: '100%',
		backgroundColor: '#000',
	},
});
