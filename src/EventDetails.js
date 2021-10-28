import React, { useState, useEffect } from 'react';

import projectDefaults from './projectDefaults';

const EventDetails = ({ event_details }) => {
	const [event, setEvent] = useState(event_details);
	//console.log(event_details);
	useEffect(async () => {
		if (Object.keys(event_details).length != 0) {
			if (event_details.featured_media && event_details.featured_media != 0) {
				let link = await projectDefaults.getFeaturedMedia(event_details.featured_media);
				setEvent({ ...event_details, featured_media_link: link });
			} else {
				setEvent({ ...event_details, featured_media_link: '' });
			}
		}
	}, [event_details]);

	return (

		<div className="event_details float_left">
			{Object.keys(event).length == 0 ? <h3 className="center">CLICK ON EVENT FOR DETAILS</h3> :
				<div>
					<h3 className="center">Event Details</h3>
					<table>
						<tbody>
							<tr><td colSpan="2"><img src={event.featured_media_link} /></td></tr>
							<tr><td>Event Name</td><td>{event.title.rendered}</td></tr>
							<tr><td>Event Details</td><td><span dangerouslySetInnerHTML={{ __html: event.content.rendered }}></span></td></tr>
							<tr><td>Location</td><td>{event['Location']} <a href={projectDefaults.getMapLink(event['_host_coordinates'])} target="_blank">View Map</a></td></tr>
							<tr><td>Organizer Name</td><td>{event['Organizer Name']}</td></tr>
							<tr><td>Website</td><td><a href={event['URL']} target="_blank">{event['URL']}</a></td></tr>
							<tr><td>Start Date</td><td>{projectDefaults.dateFormat(event['Start Date (YYYY-mm-dd)'])}</td></tr>
							<tr><td>End Date</td><td>{projectDefaults.dateFormat(event['End Date (YYYY-mm-dd)'])}</td></tr>
							<tr><td></td><td></td></tr>
						</tbody>
					</table>
				</div>
			}
		</div>

	)
}

export default EventDetails;