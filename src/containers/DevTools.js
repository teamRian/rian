import React from 'react';
import { createDevTools } from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';
import SliderMonitor from 'redux-slider-monitor';

export default createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'
    defaultPosition='bottom'
    defaultSize={0.2}
    defaultIsVisible={false}
    changeMonitorKey='ctrl-m'
  >
  	<SliderMonitor keyboardEnabled />
  	<LogMonitor />
  </DockMonitor>
);

//NOTE: Press ctrl-h to show monitors