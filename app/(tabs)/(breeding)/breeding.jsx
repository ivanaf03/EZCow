import React from "react";

import EventCalendar from "../../../components/calendar/event-calendar";
import { getAllBreedingEventsByUserId } from "../../../model/breeding-events";

const Breeding = () => (
  <EventCalendar
    title="Crianza"
    buttonText="Añadir un evento de reproducción"
    formRoute="breeding-form"
    fetchEventsFunction={getAllBreedingEventsByUserId}
  />
);

export default Breeding;
