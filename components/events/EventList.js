import React from "react";
import EventItem from "./EventItem";

const EventList = (props) => {
    const { items } = props;
    return (
        <ul>
            {items.map((event) => (
                <EventItem></EventItem>
            ))}
        </ul>
    );
};

export default EventList;
