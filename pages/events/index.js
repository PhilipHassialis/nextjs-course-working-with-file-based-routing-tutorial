import React from "react";
import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import { getAllEvents } from "../../helpers/api-util";
import EventSearch from "../../components/events/EventSearch";
import Head from 'next/head'

const AllEventsPage = (props) => {
  const { events } = props;
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <Head>
        <title>All Events</title>
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
