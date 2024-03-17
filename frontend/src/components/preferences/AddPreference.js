import React, { useState } from 'react';
import MainHome from '../home/MainHome';
import { AddPreferenceForm } from '../form/AddPreferenceForm';
import ApiService from '../../services/ApiService';
import { Navigate } from 'react-router-dom';

function getMonth(dateTime) {
  const month = dateTime.getMonth() + 1;
  return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
}

function getHours(dateTime) {
  const hours = dateTime.getHours();
  return hours < 10 ? '0' + hours : '' + hours; // ('' + month) for string result
}

function getMinutes(dateTime) {
  const minutes = dateTime.getMinutes();
  return minutes < 10 ? '0' + minutes : '' + minutes; // ('' + month) for string result
}

const AddPreference = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data) => {
    const date = new Date(data.dateTime);
    const dateStr = `${date.getUTCFullYear()}-${getMonth(date)}-${date.getUTCDate()} ${getHours(
      date
    )}:${getMinutes(date)}`;

    const payload = {
      selections: [
        {
          slot: {
            date: dateStr
          },
          sport_selection: {
            branch_name: data.branchName,
            pitch_id: data.pitchId,
            complex_name: data.complexName
          }
        }
      ]
    };
    await ApiService.addPreference(payload);
    setIsSuccess(true);
  };

  return (
    <MainHome pageTitle="Add Preference">
      <AddPreferenceForm onSubmit={onSubmit} />
      {isSuccess && <Navigate replace to="/preferences" />}
    </MainHome>
  );
};

export default AddPreference;
