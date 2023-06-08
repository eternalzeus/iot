import React, { useState } from 'react';
import * as Font from 'expo-font';
import  AppLoading  from 'expo';
import Navigator from './routes/homeStack';

export default function App() {

    return (
      <Navigator />
    );


}