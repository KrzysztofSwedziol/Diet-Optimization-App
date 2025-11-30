import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import * as Ui from './Modal.styles';

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
};

const Modal = ({ open, onClose, children, className }: Props) => {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(
    <Ui.Backdrop onClick={onClose}>
      <Ui.Modal onClick={e => e.stopPropagation()} className={className}>
        {children}
      </Ui.Modal>
    </Ui.Backdrop>,
    modalRoot,
  );
};

export default Modal;
