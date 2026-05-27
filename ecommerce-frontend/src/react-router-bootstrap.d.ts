declare module 'react-router-bootstrap' {
  import { ComponentType } from 'react';
  import { LinkProps } from 'react-router-dom';

  export interface LinkContainerProps extends Omit<LinkProps, 'to'> {
    to: string;
    children: React.ReactNode;
  }

  export const LinkContainer: ComponentType<LinkContainerProps>;
}