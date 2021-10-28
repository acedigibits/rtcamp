import 'jsdom-global/register';
import React from "React";
import App from '../App';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom'
import { configure, shallow } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import enableHooks from 'jest-react-hooks-shallow';
enableHooks(jest);
import { sample_event } from './constants';
//import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });



it('Renders without Crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
});
it('Renders Calendar Events', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve([sample_event])
    }));
    await act(async () => { render(<App />) });
    expect(screen.getByText('today')).toBeInTheDocument();

    //console.log(wrapper.html());
    //expect(wrapper.find(<button type="button" title="This month" aria-pressed="false" class="fc-today-button fc-button fc-button-primary" disabled="">today</button>).exists()).toBe(true);
    //console.log(wrapper.html());
});