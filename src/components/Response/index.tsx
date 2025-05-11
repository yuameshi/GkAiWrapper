import {StyleSheet, View} from 'react-native';
import {Thoughts} from './Thoughts';

export const Session = () => {
	return (
		<View style={[styles.root]}>
			<Thoughts
				seconds={100}
				thoughts={
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti exercitationem repudiandae excepturi ut perferendis, corporis ea quod tenetur vero perspiciatis minima sunt ex eaque consequatur quia quibusdam mollitia, accusantium voluptas?'
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		width: '100%',
		backgroundColor: '#000',
	},
});
