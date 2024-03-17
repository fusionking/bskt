import React, { useState } from 'react';
import { InputForm } from '../form/InputForm';
import ApiService from '../../services/ApiService';
import { SlotCard } from '../ui/SlotCard';
import { HourglassEmpty } from '@mui/icons-material';
import MainHome from '../home/MainHome';
import Progress from '../ui/Progress';

const SlotsHome = () => {
  const [slots, setSlots] = useState({});
  const [isWaiting, setIsWaiting] = useState(false);

  const onSubmit = async (courtSelection) => {
    setIsWaiting(true);
    const res = await ApiService.getSlots(courtSelection);
    setSlots(res);
    setIsWaiting(false);
  };

  const displaySlots = () => {
    if (Object.keys(slots).length !== 0) {
      return <SlotCard slotsResult={slots} />;
    } else {
      return <HourglassEmpty></HourglassEmpty>;
    }
  };

  return (
    <MainHome pageTitle="Slots">
      {!isWaiting && Object.keys(slots).length === 0 && <InputForm onSubmit={onSubmit} />}
      {Object.keys(slots).length !== 0 && displaySlots()}
      {isWaiting && <Progress />}
    </MainHome>
  );
};

export default SlotsHome;
