import moment from "moment";
const projectDefaults = {
    baseURL: 'https://central.wordcamp.org/wp-json/wp/v2',
    correctEventsDataForFullCalendar: (data) => {
        for (var i in data) {
            data[i].title = data[i].title.rendered;
            data[i].start = (data[i]['Start Date (YYYY-mm-dd)'] * 1000);
            data[i].end = (data[i]['End Date (YYYY-mm-dd)'] * 1000);
            delete data[i].date;
        }
        return data;
    },
    getMapLink: (lat_lng_array) => {
        /* https://stackoverflow.com/questions/2660201/what-parameters-should-i-use-in-a-google-maps-url-to-go-to-a-lat-lon */
        let lat = lat_lng_array.latitude;
        let lng = lat_lng_array.longitude;
        return `http://maps.google.com/maps?z=12&t=m&q=loc:${lat}+${lng}`;
    },
    dateFormat: (unixTimestamp) => {
        return moment.unix(unixTimestamp).format("YYYY-MM-DD");
    },
    getFeaturedMedia: async (media_id) => {
        if (!media_id || media_id == 0 || media_id == '0') return '';
        //return fetch(`${projectDefaults.baseURL}/media/${media_id}`).then(res => res.json()).then(res => res.media_details.sizes.large.source_url);

        let res = await fetch(`${projectDefaults.baseURL}/media/${media_id}`);
        res = await res.json();
        return res.media_details.sizes.large.source_url;

    }
}
export default projectDefaults;