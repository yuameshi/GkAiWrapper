import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ModelLists } from './ModelLists';
import type { FC } from 'react';

type ModalProps = {
	visible: boolean;
	onRequestClose: () => void;
};

export const SwitchModelModal: FC<ModalProps> = ({
	visible,
	onRequestClose,
}) => {
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={visible}
			onRequestClose={onRequestClose}>
			<View style={styles.root}>
				<View style={styles.dialog}>
					<Text style={styles.title}>选择模型</Text>
					<ModelLists />
					<TouchableOpacity
						style={styles.button}
						onPress={() => onRequestClose()}>
						<Text style={styles.text}>关闭</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	dialog: {
		backgroundColor: '#1d1b20',
		borderRadius: 2.5,
		paddingHorizontal: 20,
		paddingVertical: 20,
		alignItems: 'center',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 1,
	},
	title: {
		fontSize: 20,
		color: '#fff',
		fontWeight: 'bold',
		marginBottom: 10,
	},
	button: {
		marginTop: 15,
		borderRadius: 2.5,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#007afe',
	},
	text: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
		margin: 10,
	},
});
