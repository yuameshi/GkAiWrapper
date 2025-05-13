import { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { models } from './models';
import { ModelContext } from '../../contexts/modelContext';

export const ModelLists = () => {
	const { model, setModel } = useContext(ModelContext);

	return (
		<View style={styles.list}>
			{models.map((item, index) => (
				<TouchableOpacity
					key={index}
					style={[
						styles.item,
						model.id === item.id && styles.selected,
					]}
					onPress={() => {
						setModel(item);
					}}>
					{model.id === item.id && <Text style={styles.tick}>✓</Text>}
					<Text style={styles.itemText}>{item.name}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	list: {
		borderTopWidth: 1,
		borderTopColor: '#79747e',
		borderBottomWidth: 1,
		borderBottomColor: '#79747e',
		marginHorizontal: 15,
		paddingVertical: 10,
		gap: 10,
	},
	item: {
		paddingLeft: 40,
		paddingRight: 20,
		paddingVertical: 10,
		flexDirection: 'row',
	},
	selected: {
		paddingLeft: 0,
		backgroundColor: '#2b2930',
	},
	tick: {
		width: 40,
		textAlign: 'center',
		color: '#fff',
		fontSize: 16,
	},
	itemText: {
		fontSize: 18,
		color: '#fff',
		textAlign: 'left',
	},
});
