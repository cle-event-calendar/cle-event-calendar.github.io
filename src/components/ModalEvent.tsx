import React, { ReactNode, Fragment } from 'react';
import { Layer, Box, Text, Button, Anchor } from 'grommet';
import { FormClose, Globe } from 'grommet-icons';
import { format } from 'date-fns';
import getEventType from '../utils/getEventType';

type Props = ModalData & {
  onClose: () => void;
};

const ModalEvent = ({ onClose, date, events }: Props) => (
  <Layer position="center" onClickOutside={onClose} onEsc={onClose} modal>
    <Header onClick={onClose}>{format(date, 'cccc d, MMMM')}</Header>
    <Box direction="column" align="center" tag="section" margin="small">
      {events.map((event, i, arr) => (
        <Fragment key={event.id}>
          <EventDescription event={event} />
          {i !== arr.length - 1 && (
            <Box
              margin={{ vertical: 'small' }}
              background="calendar-modal-separator"
              height="3px"
              width="100%"
              style={{ borderRadius: '50%' }}
            />
          )}
        </Fragment>
      ))}
    </Box>
  </Layer>
);

type HeaderProps = {
  children: ReactNode;
  onClick: () => void;
};

const Header = ({ onClick, children }: HeaderProps) => (
  <Box
    direction="row"
    align="center"
    tag="header"
    elevation="small"
    justify="between"
  >
    <Text
      margin={{ left: 'small' }}
      color="calendar-modal-text"
      a11yTitle="Selected day"
    >
      <b>{children}</b>
    </Text>
    <Button
      icon={<FormClose />}
      a11yTitle="Close popup button"
      onClick={onClick}
    />
  </Box>
);

const EventDescription = ({ event }: { event: EventInfo }) => {
  const eventType = getEventType(event.eventtype);
  return (
    <Box
      direction="row"
      fill="horizontal"
      background="calendar-modal-background"
      justify="center"
    >
      <Text a11yTitle="Event time" margin="small" color="calendar-modal-text">
        {event.eventtime}
      </Text>
      <Box margin="small" width="medium">
        <Text
          a11yTitle="Event name"
          weight="bold"
          size="large"
          color="calendar-modal-text"
        >
          {event.eventname}
        </Text>

        {event.location && (
          <Text
            a11yTitle="Event location"
            color="calendar-modal-text"
            margin={{ top: 'medium' }}
          >
            <strong>Location:</strong> {event.location}
          </Text>
        )}
        <Text
          color="calendar-modal-text"
          a11yTitle="Event Type"
          margin={{ top: 'medium' }}
        >
          <strong>Type:</strong> {event.eventtype}
        </Text>

        <Box margin={{ top: 'medium' }}>
          <Button
            href={`/event/${event.id}/`}
            label="Read More"
            a11yTitle="Read More"
            alignSelf="end"
            target="_blank"
            primary
            color={`calendar-type-${eventType}-background`}
          />
        </Box>
        {event.eventlink && (
          <Box margin={{ top: 'medium' }}>
            <Button
              href={event.eventlink}
              label="External Link"
              alignSelf="end"
              a11yTitle="External Event link"
              target="_blank"
              color={`calendar-type-${eventType}-background`}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ModalEvent;
