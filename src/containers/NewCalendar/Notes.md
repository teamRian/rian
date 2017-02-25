function getStartTime(schedules, duration) {
  const toMinutes = s => s.split(':').reduce((h, m) => +h * 60 + +m);
  
  return schedules.reduce((p, n) => p.concat(n),
  [['19:00', '24:00']]).sort().reduce(function(p, n) {
    if (!p.start && toMinutes(p.last) + duration <= toMinutes(n[0])) {
      p.start = p.last;
    }
    p.last = p.last < n[1] ? n[1] : p.last;
    return p;
  }, {last: '09:00', start: null}).start;
}

