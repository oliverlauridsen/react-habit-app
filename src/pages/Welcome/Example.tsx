import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedForm from './AnimatedForm';

interface Props {
	i: number;
	expanded: number | false;
	setExpanded: React.Dispatch<React.SetStateAction<number | false>>;
}

const Accordion: React.FunctionComponent<Props> = ({
	i,
	expanded,
	setExpanded,
}) => {
	const isOpen = i === expanded;

	// By using `AnimatePresence` to mount and unmount the contents, we can animate
	// them in and out while also only rendering the contents of open accordions
	return (
		<>
			<motion.header
				initial={false}
				animate={{
					backgroundColor: isOpen ? '#ffcb5b' : '#3b2a37',
					color: isOpen ? '#3b2a37' : 'white',
				}}
				onClick={() => setExpanded(isOpen ? false : i)}
			>
				Sign in with email
			</motion.header>
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.section
						key='content'
						initial='collapsed'
						animate='open'
						exit='collapsed'
						variants={{
							open: { opacity: 1, height: 'auto' },
							collapsed: { opacity: 0, height: 0 },
						}}
						transition={{ duration: 1, ease: [0.04, 0.62, 0.23, 0.98] }}
					>
						<AnimatedForm />
					</motion.section>
				)}
			</AnimatePresence>
		</>
	);
};

export const Example: Function = (): React.ReactElement[] => {
	// This approach is if you only want max one section open at a time. If you want multiple
	// sections to potentially be open simultaneously, they can all be given their own `useState`.
	const [expanded, setExpanded] = useState<false | number>(1);

	// return {options.map(opt => opt)}</>

	return accordionIds.map((i) => (
		<Accordion
			i={0}
			key={i.toString()}
			expanded={expanded}
			setExpanded={setExpanded}
		/>
	));
};

const accordionIds = [0];
