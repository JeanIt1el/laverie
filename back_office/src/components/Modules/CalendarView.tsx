import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { PointageType } from '../../types';

interface CalendarViewProps {
  events: PointageType[];
}

export default function CalendarView({ events }: CalendarViewProps) {
  const calendarEvents = events.map(p => ({
    title: `${p.employe?.nom} ${p.employe?.prenom}`,
    start: new Date(p.heure_debut),
    end: new Date(p.heure_fin),
    extendedProps: {
      remarque: p.remarque,
      employe: p.employe,
    },
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="dayGridMonth"
      locale="fr"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      events={calendarEvents}
      eventContent={(info) => (
        <div className="text-xs">
          <strong>{info.event.title}</strong>
          <br />
          {info.timeText}
          <br />
          {info.event.extendedProps.remarque && (
            <span className="italic">({info.event.extendedProps.remarque})</span>
          )}
        </div>
      )}
    />
  );
}