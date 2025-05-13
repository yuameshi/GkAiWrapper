import { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SwitchModelModal } from './Modal';
import { ModelContext } from '../../contexts/modelContext';

export const ModalSwitch = () => {
	const [visible, setVisible] = useState(false);
	const { model } = useContext(ModelContext);

	return (
		<>
			<TouchableOpacity
				onPress={() => setVisible(true)}
				style={styles.root}>
				<View>
					<Text style={styles.text}>{model.name}</Text>
				</View>
			</TouchableOpacity>
			<SwitchModelModal
				visible={visible}
				onRequestClose={() => setVisible(false)}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	root: {
		padding: 10,
		width: '100%',
	},
	text: {
		textAlign: 'center',
		fontSize: 18,
		fontWeight: 'bold',
		color: '#fff',
	},
});
