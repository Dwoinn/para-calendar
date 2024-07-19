import { Fragment, h } from 'preact';

import type { Story } from '@storybook/preact';

import { EventFormPopup } from '@src/components/popup/eventFormPopup';
import { useDispatch } from '@src/contexts/calendarStore';
import TZDate from '@src/time/date';

import { calendars as mockCalendars } from '@stories/util/mockCalendars';
import { ProviderWrapper } from '@stories/util/providerWrapper';

import type { PropsWithChildren } from '@t/components/common';
import type { CalendarInfo } from '@t/options';
import type { EventFormPopupParam } from '@t/store';

export default {
  component: EventFormPopup,
  title: 'Popups/EventFormPopup',
};

interface EventFormPopupStoryProps extends EventFormPopupParam {
  calendars?: CalendarInfo[];
}

function Wrapper({
  children,
  title,
  location,
  start,
  end,
  isAllday,
  isPrivate,
  isCreationPopup,
  isPayable,
  eventState,
}: PropsWithChildren<EventFormPopupParam>) {
  const { showFormPopup } = useDispatch('popup');
  showFormPopup({
    isCreationPopup,
    title,
    location,
    start,
    end,
    isAllday,
    isPrivate,
    isPayable,
    eventState,
  });

  return <Fragment>{children}</Fragment>;
}

const Template: Story<EventFormPopupStoryProps> = ({
  calendars,
  title,
  location,
  start,
  end,
  isPayable,
  isAllday = true,
  isPrivate = false
}) => (
  <ProviderWrapper options={{ calendars }}>
    <Wrapper
      title={title}
      location={location}
      start={start}
      end={end}
      isAllday={isAllday}
      isPrivate={isPrivate}
      isPayable={isPayable}
      isCreationPopup={true}
    >
      <EventFormPopup />
    </Wrapper>
  </ProviderWrapper>
);

export const EventFormPopupWithCalendars = Template.bind({});
EventFormPopupWithCalendars.args = {
  start: new TZDate(),
  end: new TZDate(),
  calendars: mockCalendars,
  isPayable: false
};

export const EventFormPopupWithState = Template.bind({});
EventFormPopupWithState.args = {
  start: new TZDate('2024-07-06T08:00:00'),
  end: new TZDate(),
  calendars: mockCalendars,
  isPayable: true
};

export const EventFormPopupWithoutCalendars = Template.bind({});
EventFormPopupWithoutCalendars.args = {
  start: new TZDate(),
  end: new TZDate(),
};
