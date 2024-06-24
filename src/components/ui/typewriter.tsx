'use client';

import { Typewriter, Cursor } from 'react-simple-typewriter';

interface Props {
	words: string[];
}

function TypewriterComponent({ words }: Props) {
	return (
		<>
			<Typewriter
				words={words}
				loop={0}
				typeSpeed={70}
				deleteSpeed={50}
				delaySpeed={1000}
			/>
			<Cursor />
		</>
	);
}

export default TypewriterComponent;
