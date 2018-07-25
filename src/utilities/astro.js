export const calcJD = (now, t_zero = false ) => {
  const current = {
    year: now.get('year'),
    month: now.get('month') + 1,
    dayOfMonth: now.get('date'),
    hour: now.get('hour'),
    minute: now.get('minute'),
    second: now.get('second')
  };
  let A, B;
  let DD, JD;

  if (!t_zero)
    DD = current.dayOfMonth + ((current.hour + current.minute / 60.0 + current.second / 3600.0) / 24.0);
  else
    DD = current.dayOfMonth;

  if (current.month < 3) {
    current.year -= 1;
    current.month += 12;
  }

  A = Math.floor(current.year / 100);
  B = 2 - A + A / 4;
  JD = Math.floor(365.25 * current.year) + Math.floor(30.6001 * (current.month + 1.0)) + DD + 1720994.5 + B;
  return JD;
};
