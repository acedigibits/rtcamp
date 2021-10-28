import React, { render } from 'react';
import projectDefaults from '../projectDefaults';
import { configure, shallow, mount } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
//import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

it('Test correctEventsDataForFullCalendar', () => {
    const input_data = [{ title: { rendered: 'Test1' }, 'Start Date (YYYY-mm-dd)': 123, 'End Date (YYYY-mm-dd)': 456, date: 111 }];
    const output_data = [{ title: 'Test1', 'Start Date (YYYY-mm-dd)': 123, 'End Date (YYYY-mm-dd)': 456, start: 123000, end: 456000 }];
    expect(projectDefaults.correctEventsDataForFullCalendar(input_data)).toEqual(output_data);
});
it('Test getMapLink', () => {
    expect(projectDefaults.getMapLink({ "latitude": -23.5557714, "longitude": -46.6395571 })).toBe('http://maps.google.com/maps?z=12&t=m&q=loc:-23.5557714+-46.6395571');
});

it('Test dateFormat', () => {
    expect(projectDefaults.dateFormat(1637971200)).toBe('2021-11-27');
});

it('Test getFeaturedMedia', () => {
    global.fetch = jest.fn(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ "media_details": { "sizes": { "large": { "source_url": "https://central.wordcamp.org/files/2021/07/WordCamp-Sao-Paulo-2021-1024x166.png" } } } })
    }));

    return expect(projectDefaults.getFeaturedMedia(3142126)).resolves.toBe('https://central.wordcamp.org/files/2021/07/WordCamp-Sao-Paulo-2021-1024x166.png');

});

it('Test getFeaturedMedia when no media_id', () => {

    return expect(projectDefaults.getFeaturedMedia(undefined)).resolves.toBe('');

});
