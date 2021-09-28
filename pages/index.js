import React from "react";
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/EventList";
import Head from 'next/head'

const HomePage = (props) => {
  return (
    <div>
      <Head>
        <title>NextJS Events Application</title>
        <meta name="description" content="A NextJS application to handle events" />
      </Head>
      <EventList items={props.events} />
    </div>
  );
};

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
};

export default HomePage;
