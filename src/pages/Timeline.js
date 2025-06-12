// src/pages/Timeline.js
import React, { useEffect, useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './Timeline.css';

const Timeline = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/timeline_events.json')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  return (
    <div className="timeline-wrapper">
      <VerticalTimeline>
        {events.map((event, index) => (
          <VerticalTimelineElement
            key={index}
            date={event.date}
            iconStyle={{ background: '#8e4a49', color: '#fff' }}
            contentStyle={{ background: '#1c1c1c', color: '#fff' }}
          >
            <h3 className="timeline-title">{event.title}</h3>
            <p>{event.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Timeline;
