import React from 'react';
import ReactDOM from 'react-dom';
import InstallButton from './src/components/InstallButton';

export const onClientEntry = () => {
  const root = document.createElement('div');
  root.id = 'install-button-root';
  document.body.appendChild(root);
  ReactDOM.render(<InstallButton />, root);
};