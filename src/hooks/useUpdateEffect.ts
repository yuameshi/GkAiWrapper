import { useRef, useEffect } from 'react';

export const useUpdateEffect: typeof useEffect = (effect, deps) => {
	const isFirst = useRef(true);

	useEffect(() => {
		if (isFirst.current) {
			isFirst.current = false;
			return;
		}
		if (!isFirst.current) {
			return effect();
		}
	}, deps);
};
