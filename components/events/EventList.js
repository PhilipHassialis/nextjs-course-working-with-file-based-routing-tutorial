import React from "react";
import EventItem from "./EventItem";

const EventList = (props) => {
    const { items } = props;
    return (
        <ul>
            {items.map((event) => (
                <EventItem key={event.id} {...event}></EventItem>
            ))}
        </ul>
    );
};

export default EventList;
