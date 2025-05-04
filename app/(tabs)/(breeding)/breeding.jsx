import React from "react";
import { ScrollView, View, Text } from "react-native";
import { router, useFocusEffect } from "expo-router";

import CustomCalendar from "../../../components/basic/custom-calendar";
import BreedingDay from "./breeding-day";
import { getAllBreedingEventsByUserId } from "../../model/breeding-events";
import { useUser } from "../../../store/user-provider";
import CustomButton from "../../../components/basic/custom-button";
import TabTitle from "../../../components/tabs/tab-title";

const Breeding = () => {
  const [date, setDate] = React.useState(new Date());
  const [eventsByDay, setEventsByDay] = React.useState({});
  const { user } = useUser();

  useFocusEffect(
    React.useCallback(() => {
      const fetchEvents = async () => {
        const allEvents = await getAllBreedingEventsByUserId(user.id);
        const days = getDaysInMonth(date);
        const results = {};

        const formatDate = (d) => new Date(d).toLocaleDateString("es-ES");
        const formatDay = (d) => d.toLocaleDateString("es-ES");

        days.forEach((day) => {
          const formattedDay = formatDay(day);

          const dayEvents = allEvents.filter((event) => {
            const eventDate = formatDate(event.date);
            return eventDate === formattedDay;
          });
          results[formattedDay] = dayEvents;
        });

        setEventsByDay(results);
      };
      fetchEvents();
    }, [date, user.id])
  );

  const handleChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const groupByWeeks = (days) => {
    const weeks = [];
    let week = [];

    const firstDayOfWeek = days[0].getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      week.push(null);
    }

    days.forEach((day) => {
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
      week.push(day);
    });

    while (week.length < 7) {
      week.push(null);
    }

    weeks.push(week);
    return weeks;
  };

  const formatDay = (d) => d.toLocaleDateString("es-ES");

  const allDays = getDaysInMonth(date);
  const weeks = groupByWeeks(allDays);

  return (
    <ScrollView className="flex-1 bg-c_dark_gray">
      <TabTitle text="Crianza" />
      <View className="my-8 w-[90%] self-center">
        <CustomButton
          text="Añadir un evento de reproducción"
          onPress={() => router.push("breeding-form")}
          buttonTestID="breeding-form-button"
        />
        <View className="mt-4">
          <CustomCalendar
            text="Selecciona un día"
            date={date}
            onChange={handleChange}
          />
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-4 px-2 mx-4"
      >
        <View>
          <View className="flex-row gap-4 mb-2 px-4">
            {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(
              (day, index) => (
                <Text
                  key={index}
                  className="text-c_white text-2xl font-Nunito_Bold w-60 text-center"
                >
                  {day}
                </Text>
              )
            )}
          </View>
          <View className="flex-col gap-2">
            {weeks.map((week, i) => (
              <View key={i} className="flex-row gap-4">
                {week.map((day, j) => (
                  <View key={j} className="w-60">
                    {day ? (
                      <View
                        className={`rounded-lg ${
                          day.getDate() === date.getDate() &&
                          day.getMonth() === date.getMonth() &&
                          day.getFullYear() === date.getFullYear()
                            ? "p-2 border-2 border-c_light_blue rounded-2xl"
                            : ""
                        }`}
                      >
                        <BreedingDay
                          date={day.toLocaleDateString("es-ES")}
                          events={eventsByDay[formatDay(day)] || []}
                        />
                      </View>
                    ) : (
                      <View className="h-16" />
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

export default Breeding;
