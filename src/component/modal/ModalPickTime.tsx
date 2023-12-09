import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {gettimesss} from '../../data/checkday';

export default function ModalPickTime({
  show,
  setShow,
  setValue,
}: {
  show: boolean;
  setShow: (val: boolean) => void;
  setValue: (val: string) => void;
}) {
  return (
    <DateTimePickerModal
      isVisible={show}
      mode="time"
      onConfirm={(ab: Date) => {
        let a = gettimesss(ab);

        setValue(a);

        setShow(false);
      }}
      onCancel={() => setShow(false)}
    />
  );
}
