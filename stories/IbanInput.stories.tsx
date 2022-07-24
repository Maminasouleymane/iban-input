import { Meta, Story } from '@storybook/react';

import IbanInput from '../src/index';
import React from 'react';

export default {
    title: '/IbanInput',
    component: IbanInput
} as Meta;

const Template: Story<any> = (args) => <IbanInput {...args} />;

export const Default = Template.bind({});
Default.args = {
    ibanFormat: 'FRXX-XXX-XXXX-XXX'
};

// export const Disabled = Template.bind({});
// Disabled.args = {
//     disabled: true,
//     ibanFormat: 'FRXX-XXX-XXXX-XX'
// };

