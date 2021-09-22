// https://page-prerendering-data-fetch-default-rtdb.firebaseio.com/events.json?orderBy=%22isFeatured%22&startAt=true

export async function getAllEvents() {
  const response = await fetch(
    "https://page-prerendering-data-fetch-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const response = await fetch(
    "https://page-prerendering-data-fetch-default-rtdb.firebaseio.com/events.json?orderBy=%22isFeatured%22&startAt=true"
  );
  const data = await response.json();

  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;

  // or
  // const allEvents = getAllEvents();
  // return allEvents.filter(event => event.isFeatured)
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}
