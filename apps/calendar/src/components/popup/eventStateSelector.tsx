import { h } from 'preact';

import { PopupSection } from '@src/components/popup/popupSection';
import { StateDropdownMenu } from '@src/components/popup/stateDropdownMenu';
import { Template } from '@src/components/template';
import { cls } from '@src/helpers/css';
import { useDropdownState } from '@src/hooks/common/useDropdownState';
import type { FormStateDispatcher } from '@src/hooks/popup/useFormState';
import { FormStateActionType } from '@src/hooks/popup/useFormState';

import type { EventState } from '@t/events';

interface Props {
  eventState?: EventState;
  formStateDispatch: FormStateDispatcher;
}

const classNames = {
  popupSection: ['dropdown-section', 'state-section'],
  popupSectionItem: cls('popup-section-item', 'popup-button'),
  statePaidIcon: cls('icon', 'ic-state-paid'),
  stateUnpaidIcon: cls('icon', 'ic-state-unpaid'),
  arrowIcon: cls('icon', 'ic-dropdown-arrow'),
  content: cls('content', 'event-state'),
};

export function EventStateSelector({ eventState = 'Unpaid', formStateDispatch }: Props) {
  const { isOpened, setOpened, toggleDropdown } = useDropdownState();

  const handleChangeEventState = (state: EventState) =>
    formStateDispatch({ type: FormStateActionType.setState, state });

  return (
    <PopupSection onClick={toggleDropdown} classNames={classNames.popupSection}>
      <button type="button" className={classNames.popupSectionItem}>
        <span className={eventState === 'Unpaid' ? classNames.stateUnpaidIcon : classNames.statePaidIcon} />
        <span className={classNames.content}>
          {eventState === 'Unpaid' ? (
            <Template template="popupStateUnpaid" />
          ) : (
            <Template template="popupStatePaid" />
          )}
        </span>
        <span className={classNames.arrowIcon} />
      </button>
      {isOpened && (
        <StateDropdownMenu setOpened={setOpened} setEventState={handleChangeEventState} />
      )}
    </PopupSection>
  );
}
