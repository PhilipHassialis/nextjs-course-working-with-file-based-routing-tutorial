import React from "react";
import EventList from "../../components/events/EventList";
import { getAllEvents } from "../../dummy-data";
import EventSearch from "../../components/events/EventSearch";

const AllEventsPage = () => {
    const events = getAllEvents();

    return (
        <>
            <EventSearch />
            <EventList items={events} />
        </>
    );
};

export default AllEventsPage;
