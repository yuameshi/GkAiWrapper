import {type FC, useState} from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

type ThoughtsProps = {
	loading?: boolean;
	seconds: number;
	thoughts: string;
};

export const Thoughts: FC<ThoughtsProps> = ({seconds, thoughts, loading}) => {
	const [expanded, setExpanded] = useState(false);

	const toggleExpanded = () => setExpanded(!expanded);

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={toggleExpanded}>
				<View style={[styles.brief]}>
					{loading ? (
						<>
							<ActivityIndicator />
							<Text style={styles.text}>
								正在思考，已思考 {seconds} 秒
							</Text>
						</>
					) : (
						<Text style={styles.text}>
							思考完毕，用时 {seconds} 秒（按此以
							{expanded ? '收起' : '展开'}
							思考过程）
						</Text>
					)}
				</View>
			</TouchableOpacity>
			<Text
				selectable
				style={[
					styles.text,
					styles.thoughts,
					expanded && styles.thoughtsExpanded,
				]}>
				{thoughts}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		gap: 10,
	},
	brief: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
		justifyContent: 'flex-start',
		width: '100%',
	},
	text: {
		color: '#fff',
		fontSize: 16,
		lineHeight: 24,
	},
	thoughts: {
		display: 'none',
		color: '#999',
		fontSize: 16,
		lineHeight: 24,
	},
	thoughtsExpanded: {
		display: 'flex',
	},
});
