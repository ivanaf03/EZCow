import React from "react";

import { ScrollView, View, Text } from "react-native";
import { router, useFocusEffect } from "expo-router";

import CustomCalendar from "../basic/custom-calendar";
import CustomButton from "../basic/custom-button";
import TabTitle from "../tabs/tab-title";
import CalendarCard from "./calendar-card";
import { useUser } from "../../store/user-provider";

const EventCalendar = ({
  title,
  buttonText,
  formRoute,
  fetchEventsFunction,
}) => {
  const [date, setDate] = React.useState(new Date());
  const [eventsByDay, setEventsByDay] = React.useState({});
  const { user } = useUser();

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
  };

  const groupByWeeks = (days) => {
    const weeks = [];
    let week = [];

    const firstDayOfWeek = days[0].getDay();
    for (let i = 0; i < firstDayOfWeek; i++) week.push(null);

    days.forEach((day) => {
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
      week.push(day);
    });

    while (week.length < 7) week.push(null);
    weeks.push(week);
    return weeks;
  };

  const formatDay = (d) => d.toLocaleDateString("es-ES");

  useFocusEffect(
    React.useCallback(() => {
      const fetchEvents = async () => {
        const allEvents = await fetchEventsFunction(user.id);
        const days = getDaysInMonth(date);
        const results = {};

        days.forEach((day) => {
          const formatted = formatDay(day);
          const events = allEvents.filter(
            (event) => formatDay(new Date(event.date)) === formatted
          );
          results[formatted] = events;
        });

        setEventsByDay(results);
      };
      fetchEvents();
    }, [date, user.id])
  );

  const allDays = getDaysInMonth(date);
  const weeks = groupByWeeks(allDays);

  return (
    <ScrollView className="flex-1 bg-c_dark_gray">
      <TabTitle text={title} />
      <View className="my-8 w-[90%] self-center">
        <CustomButton
          text={buttonText}
          onPress={() => router.push(formRoute)}
          buttonTestID={formRoute + "-button"}
        />
        <View className="mt-4">
          <CustomCalendar text="Selecciona un día" date={date} onChange={setDate} />
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-4 px-2 mx-4"
      >
        <View className="p-2">
          <View className="flex-row justify-around">
            {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day, i) => (
              <Text
                key={i}
                className="text-c_white text-2xl font-Nunito_Bold w-60 text-center"
              >
                {day}
              </Text>
            ))}
          </View>
          <View className="flex-col">
            {weeks.map((week, i) => (
              <View key={i} className="flex-row">
                {week.map((day, j) => (
                  <View key={j} className="w-60 flex-1">
                    {day ? (
                      <CalendarCard
                        date={formatDay(day)}
                        events={eventsByDay[formatDay(day)] || []}
                        isSelected={
                          day.getDate() === date.getDate() &&
                          day.getMonth() === date.getMonth() &&
                          day.getFullYear() === date.getFullYear()
                        }
                      />
                    ) : (
                      <View className="flex-1" />
                    )}
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default EventCalendar;
