import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/events/ErrorAlert";
import { getFilteredEvents } from "../../helpers/api-util";
import useSWR from "swr";
import Head from "next/head";

const FilteredEventsPage = (props) => {
  const router = useRouter();
  const [loadedEvents, setLoadedEvents] = useState();
  const filterData = router.query.slug;

  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data, error } = useSWR("https://page-prerendering-data-fetch-default-rtdb.firebaseio.com/events.json", fetcher)

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data])


  let pageHeadData = (<Head>
    <title>Filtered Events</title>
    <meta name="description" content={`Filtered events`} />
  </Head>)

  if (!loadedEvents) {
    return <>{pageHeadData}<p className="center">Loading...</p></>;
  }

  const [filteredYear, filteredMonth] = filterData;
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  pageHeadData = (<Head>
    <title>Filtered Events</title>
    <meta name="description" content={`All events for ${numMonth}/${numYear}`} />
  </Head>)

  if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2019 || error) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filters</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

// export const getServerSideProps = async (context) => {
//   const { params } = context;
//   const filterData = params.slug;
//   const [filteredYear, filteredMonth] = filterData;
//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;
//
//   if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2019) {
//     return {
//       props: {
//         hasError: true
//       }
//       // notFound: true,
//       // redirect: {
//       //   destination:
//       // }
//     };
//   }
//
//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });
//
//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth
//       }
//     }
//   }
// }

export default FilteredEventsPage;
