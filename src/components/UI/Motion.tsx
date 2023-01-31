import { motion } from 'framer-motion';
import styled from 'styled-components';

interface MotionProps {
	className: string;
}

const Motion: React.FunctionComponent<MotionProps> = ({ className }) => (
	<motion.div
		className={className}
		initial={{ opacity: 0, scale: 0.5 }}
		animate={{ opacity: 1, scale: 1 }}
		transition={{ duration: 0.5 }}
	/>
);

const StyledMotion = styled(Motion)`
	width: 200px;
	height: 200px;
	border-radius: 5px;
`;

export default StyledMotion;
