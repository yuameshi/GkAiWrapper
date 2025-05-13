import { Model, models } from '../components/ModelSwitch/models';
import { createContext } from 'react';

export const ModelContext = createContext({
	model: models[1],
	setModel: (_model: Model) => {},
});
