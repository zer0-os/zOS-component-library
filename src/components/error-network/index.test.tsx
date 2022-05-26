import React from 'react';
import { shallow } from 'enzyme';

import { ErrorNetwork } from '../error-network';

describe('ErrorNetwork', () => {
  const subject = (props: any = {}) => {
    const allProps = {
      supportedChainId: '',
      ...props,
    };
    return shallow(<ErrorNetwork {...allProps}/>);
  };

  it('it displays error network', () => {
    const supportedChainId = 2;

    const wrapper = subject({ supportedChainId });

    expect(wrapper.find('.error-network__chainId').text().trim()).toBe(
      'Please switch to Supported Network 2 in your wallet before connecting'
    );
  });

  it('it adds supportedChainId as title', () => {
    const supportedChainId = 2;

    const wrapper = subject({ supportedChainId });
    
    expect(wrapper.find('.error-network__chainId').prop('title')).toBe(
      supportedChainId
    );
  });
});
