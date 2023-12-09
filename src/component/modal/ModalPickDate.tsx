import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {checknumberdayval} from '../../data/checkday';

export default function ModalPickDate({
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
      mode="date"
      onConfirm={(ab: Date) => {
        let a = checknumberdayval(ab);

        setValue(a);

        setShow(false);
      }}
      onCancel={() => setShow(false)}
    />
  );
}
