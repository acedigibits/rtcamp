import 'jsdom-global/register';
import React from 'react';
import EventDetails from '../EventDetails';
import { configure, shallow, mount } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { sample_event, sample_event_with_no_featured_image } from './constants';
//import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });


it('Renders Empty Event', () => {
    const event = {};
    const wrapper = shallow(<EventDetails event_details={event} />);
    expect(wrapper.exists()).toBe(true);
});
describe('Renders Sample Event', () => {
    it('Checks featured Image Loaded', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ "media_details": { "sizes": { "large": { "source_url": "https://central.wordcamp.org/files/2021/07/WordCamp-Sao-Paulo-2021-1024x166.png" } } } })
        }));
        await act(async () => { render(<EventDetails event_details={sample_event} />) });

        await waitFor(() => {
            expect(screen.getByRole('img')).toHaveAttribute('src', 'https://central.wordcamp.org/files/2021/07/WordCamp-Sao-Paulo-2021-1024x166.png');
        });

    });
})

it('Checks Empty featured Image Loaded', async () => {
    await act(async () => { render(<EventDetails event_details={sample_event_with_no_featured_image} />) });

    await waitFor(() => {
        expect(screen.getByRole('img')).toHaveAttribute('src', '');
    });

});

