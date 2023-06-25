import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants, Variant } from 'framer-motion';
import { ReactComponent as CloseIcon } from '@assets/icons/close--modifier.svg';
import { CustomButton } from '.';

interface VisibilityVariants extends Variants {
  hidden: Variant;
  visible: Variant;
}

export interface IModalProps {
  title?: string;
  isOpen: boolean;
  isVisible?: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  width?: number | string;
  customContentAnimations?: VisibilityVariants;
}

const SModalWrapper = styled(motion.div)<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  pointer-events: none;

  & > * {
    pointer-events: all;
  }
`;

const SBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
`;

const SContent = styled(motion.div)`
  max-height: 100%;
  max-width: 100%;
  padding: 25px;
  background: #1d1d1d;
  border-radius: 28px;

  position: relative;
  overflow-y: auto;
  z-index: 2;

  // Scrollbar
  scrollbar-width: 0;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const STitle = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  margin-bottom: 15px;

  h3 {
    font-weight: 400;
    font-size: 32px;
    line-height: 37px;
  }
`;

const SCloseButton = styled(CustomButton)`
  margin-left: auto;
`;
const SCloseIcon = styled(CloseIcon)`
  ${SCloseButton}:hover & {
    --color: ${({ theme }) => theme.colors.main};
  }
`;

const bgAnimations: VisibilityVariants = {
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
  visible: {
    opacity: 1,
    pointerEvents: 'all',
  },
};

const contentAnimations: VisibilityVariants = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.5)',
  },
  visible: {
    opacity: 1,
    transform: 'scale(1)',
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 100,
    },
  },
};

const Modal = ({
  title,
  onClose,
  isOpen,
  isVisible = true,
  children,
  customContentAnimations,
  width = 412,
}: IModalProps) => {
  const handleClose: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    onClose();
  };

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal');
    } else {
      document.body.classList.remove('modal');
    }

    return () => {
      document.body.classList.remove('modal');
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <SModalWrapper isVisible={isVisible}>
          <SBackground
            variants={bgAnimations}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleClose}
          />
          <SContent
            variants={customContentAnimations || contentAnimations}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ width }}
          >
            <STitle>
              {title && <h3>{title}</h3>}
              <SCloseButton onClick={onClose}>
                <SCloseIcon />
              </SCloseButton>
            </STitle>
            {children}
          </SContent>
        </SModalWrapper>
      )}
    </AnimatePresence>
  );
};

export default Modal;
