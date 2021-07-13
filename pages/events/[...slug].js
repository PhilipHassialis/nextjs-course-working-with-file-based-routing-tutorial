import { useRouter } from "next/router";
import React from "react";
import { getFilteredEvents } from "../../dummy-data";

const FilteredEventsPage = () => {
    const router = useRouter();
    const filterData = router.query.slug;

    if (!filterData) {
        return <p className="center">Loading...</p>;
    }

    const [filteredYear, filteredMonth] = filterData;
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2019) {
        return <p className="center">Invalid filters</p>;
    }

    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth,
    });

    if (!filteredEvents || filteredEvents.length === 0) {
        return <p className="center">No events found</p>;
    }

    return (
        <div>
            <h4>Filtered Events</h4>
        </div>
    );
};

export default FilteredEventsPage;
