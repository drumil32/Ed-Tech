import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "./style.scss";

interface ModalProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  container?: HTMLElement | null;
}

export const Modal: React.FC<ModalProps> = ({ children, className, style, container }) => {
  return (
    <Dialog.Root open={true}>
      <Dialog.Portal container={container || document.body}>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content
          className={`DialogContent ${className}`}
          style={{
            ...style,
          }}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
