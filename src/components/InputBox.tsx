import {type FC, useState} from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

type TextInputProps = {
	disabled?: boolean;
	onSubmit: (value: string) => void;
};

export const InputBox: FC<TextInputProps> = ({disabled, onSubmit}) => {
	const [value, setValue] = useState<string>('');
	const disabledInternal = disabled || !value.trim();

	const handleChange = (text: string) => {
		setValue(text);
	};

	const handleSubmit = () => {
		if (value.trim()) {
			onSubmit(value);
			setValue('');
		}
	};

	return (
		<View style={styles.root}>
			<TextInput
				style={styles.input}
				value={value}
				onChangeText={handleChange}
				onSubmitEditing={handleSubmit}
				placeholder="有问题，尽管问我吧"
				editable={!disabled}
			/>
			<TouchableOpacity
				disabled={disabledInternal}
				onPress={handleSubmit}>
				<View
					style={[
						styles.button,
						disabledInternal && styles.buttonDisabled,
					]}>
					<Text
						style={[
							styles.buttonText,
							disabledInternal && styles.buttonTextDisabled,
						]}>
						发送
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};
const styles = StyleSheet.create({
	root: {
		width: '100%',
		flexDirection: 'row',
		padding: 18,
		gap: 10,
	},
	input: {
		flex: 1,
		height: 48,
		borderColor: 'gray',
		borderWidth: 1,
		paddingHorizontal: 10,
		color: '#fff',
	},
	button: {
		flex: 1,
		padding: 12,
		backgroundColor: '#007AFF',
		borderRadius: 2,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		textAlign: 'center',
	},
	buttonDisabled: {
		backgroundColor: '#f0f0f0',
	},

	buttonTextDisabled: {
		color: '#ccc',
	},
});
