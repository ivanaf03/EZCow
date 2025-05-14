import React from "react";

import EventCalendar from "../../../components/calendar/event-calendar";
import { getAllHealthEventsByUserId } from "../../../model/health-events";

const Health = () => (
  <EventCalendar
    title="Salud"
    buttonText="Añadir un evento de salud"
    formRoute="health-form"
    fetchEventsFunction={getAllHealthEventsByUserId}
  />
);

export default Health;
