import Demographics from './StandaloneDemographics.jsx';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useState } from 'react';
function College() {
  const isBinary = true;
  const axislabel = 'label';

  const overall = [
    {
      y: 69.16679268108271,
      question_rec: 'High school grades',
    },
    {
      y: 46.47076643441381,
      question_rec: 'Scores on standardized tests, such as the SAT or ACT',
    },
    {
      y: 24.553706505295008,
      question_rec: 'Being the first person in the family to go to college',
    },
    {
      y: 24.225011341297446,
      question_rec: 'Involvement in community service',
    },
    {
      y: 9.650582362728786,
      question_rec: 'Race or ethnicity',
    },
    {
      y: 8.730518989257073,
      question_rec: 'Athletic ability',
    },
    {
      y: 7.801632899909283,
      question_rec: 'Whether a relative attended the school',
    },
    {
      y: 5.3714631563020125,
      question_rec: 'Gender',
    },
  ];

  const demos = [
    {
      demometum: {
        color1: 'green',
        demographics: 'income2',
        dmeta: 'Income',
      },
      level: 'High Income',
      y: 77.97427652733118,
      question_rec: 'High school grades',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'income2',
        dmeta: 'Income',
      },
      level: 'Low Income',
      y: 63.25259515570934,
      question_rec: 'High school grades',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'income2',
        dmeta: 'Income',
      },
      level: 'High Income',
      y: 50.80385852090033,
      question_rec: 'Scores on standardized tests, such as the SAT or ACT',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'income2',
        dmeta: 'Income',
      },
      level: 'Low Income',
      y: 44.23611111111111,
      question_rec: 'Scores on standardized tests, such as the SAT or ACT',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'income2',
        dmeta: 'Income',
      },
      level: 'High Income',
      y: 27.375201288244767,
      question_rec: 'Involvement in community service',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'income2',
        dmeta: 'Income',
      },
      level: 'Low Income',
      y: 26.523545706371195,
      question_rec: 'Being the first person in the family to go to college',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'income2',
        dmeta: 'Income',
      },
      level: 'Low Income',
      y: 23.130193905817176,
      question_rec: 'Involvement in community service',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'income2',
        dmeta: 'Income',
      },
      level: 'High Income',
      y: 20.481927710843372,
      question_rec: 'Being the first person in the family to go to college',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'income2',
        dmeta: 'Income',
      },
      level: 'Low Income',
      y: 11.28808864265928,
      question_rec: 'Athletic ability',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'income2',
        dmeta: 'Income',
      },
      level: 'Low Income',
      y: 10.235131396957122,
      question_rec: 'Race or ethnicity',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'income2',
        dmeta: 'Income',
      },
      level: 'Low Income',
      y: 9.626038781163434,
      question_rec: 'Whether a relative attended the school',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'income2',
        dmeta: 'Income',
      },
      level: 'High Income',
      y: 9.010458567980692,
      question_rec: 'Race or ethnicity',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'income2',
        dmeta: 'Income',
      },
      level: 'High Income',
      y: 6.827309236947792,
      question_rec: 'Athletic ability',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'income2',
        dmeta: 'Income',
      },
      level: 'Low Income',
      y: 6.77731673582296,
      question_rec: 'Gender',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'income2',
        dmeta: 'Income',
      },
      level: 'High Income',
      y: 4.421221864951769,
      question_rec: 'Whether a relative attended the school',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'income2',
        dmeta: 'Income',
      },
      level: 'High Income',
      y: 3.3789219629927594,
      question_rec: 'Gender',
    },
    {
      demometum: {
        color1: 'purple',
        demographics: 'F_EDUCCAT',
        dmeta: 'Education Level',
      },
      level: 'College graduate+',
      y: 77.06495589414595,
      question_rec: 'High school grades',
    },
    {
      demometum: {
        color1: 'purple',
        demographics: 'F_EDUCCAT',
        dmeta: 'Education Level',
      },
      level: 'H.S. graduate or less',
      y: 64.32406051732552,
      question_rec: 'High school grades',
    },
    {
      demometum: {
        color1: 'purple',
        demographics: 'F_EDUCCAT',
        dmeta: 'Education Level',
      },
      level: 'H.S. graduate or less',
      y: 47.56756756756757,
      question_rec: 'Scores on standardized tests, such as the SAT or ACT',
    },
    {
      demometum: {
        color1: 'purple',
        demographics: 'F_EDUCCAT',
        dmeta: 'Education Level',
      },
      level: 'College graduate+',
      y: 46.957566052842274,
      question_rec: 'Scores on standardized tests, such as the SAT or ACT',
    },
    {
      demometum: {
        color1: 'purple',
        demographics: 'F_EDUCCAT',
        dmeta: 'Education Level',
      },
      level: 'College graduate+',
      y: 30.008012820512818,
      question_rec: 'Involvement in community service',
    },
    {
      demometum: {
        color1: 'purple',
        demographics: 'F_EDUCCAT',
        dmeta: 'Education Level',
      },
      level: 'College graduate+',
      y: 27.02161729383507,
      question_rec: 'Being the first person in the family to go to college',
    },
    {
      demometum: {
        color1: 'purple',
        demographics: 'F_EDUCCAT',
        dmeta: 'Education Level',
      },
      level: 'H.S. graduate or less',
      y: 20.880195599022006,
      question_rec: 'Being the first person in the family to go to college',
    },
    {
      demometum: {
        color1: 'purple',
        demographics: 'F_EDUCCAT',
        dmeta: 'Education Level',
      },
      level: 'H.S. graduate or less',
      y: 19.716935090287947,
      question_rec: 'Involvement in community service',
    },
    {
      demometum: {
        color1: 'purple',
        demographics: 'F_EDUCCAT',
        dmeta: 'Education Level',
      },
      level: 'H.S. graduate or less',
      y: 11.23046875,
      question_rec: 'Whether a relative attended the school',
    },
    {
      demometum: {
        color1: 'purple',
        demographics: 'F_EDUCCAT',
        dmeta: 'Education Level',
      },
      level: 'College graduate+',
      y: 10.688550840672537,
      question_rec: 'Race or ethnicity',
    },
    {
      demometum: {
        color1: 'purple',
        demographics: 'F_EDUCCAT',
        dmeta: 'Education Level',
      },
      level: 'H.S. graduate or less',
      y: 10.600879335613092,
      question_rec: 'Athletic ability',
    },
    {
      demometum: {
        color1: 'purple',
        demographics: 'F_EDUCCAT',
        dmeta: 'Education Level',
      },
      level: 'H.S. graduate or less',
      y: 8.748778103616814,
      question_rec: 'Race or ethnicity',
    },
    {
      demometum: {
        color1: 'purple',
        demographics: 'F_EDUCCAT',
        dmeta: 'Education Level',
      },
      level: 'College graduate+',
      y: 7.260328920978741,
      question_rec: 'Athletic ability',
    },
    {
      demometum: {
        color1: 'purple',
        demographics: 'F_EDUCCAT',
        dmeta: 'Education Level',
      },
      level: 'H.S. graduate or less',
      y: 6.405867970660147,
      question_rec: 'Gender',
    },
    {
      demometum: {
        color1: 'purple',
        demographics: 'F_EDUCCAT',
        dmeta: 'Education Level',
      },
      level: 'College graduate+',
      y: 5.3642914331465175,
      question_rec: 'Whether a relative attended the school',
    },
    {
      demometum: {
        color1: 'purple',
        demographics: 'F_EDUCCAT',
        dmeta: 'Education Level',
      },
      level: 'College graduate+',
      y: 4.733253108704372,
      question_rec: 'Gender',
    },
    {
      demometum: {
        color1: 'yellow',
        demographics: 'Churchattend',
        dmeta: 'Church Attendance',
      },
      level: 'Weekly+',
      y: 71.22351332877649,
      question_rec: 'High school grades',
    },
    {
      demometum: {
        color1: 'yellow',
        demographics: 'Churchattend',
        dmeta: 'Church Attendance',
      },
      level: 'Rarely',
      y: 68.03189561435302,
      question_rec: 'High school grades',
    },
    {
      demometum: {
        color1: 'yellow',
        demographics: 'Churchattend',
        dmeta: 'Church Attendance',
      },
      level: 'Rarely',
      y: 46.38838475499092,
      question_rec: 'Scores on standardized tests, such as the SAT or ACT',
    },
    {
      demometum: {
        color1: 'yellow',
        demographics: 'Churchattend',
        dmeta: 'Church Attendance',
      },
      level: 'Weekly+',
      y: 46.22770919067216,
      question_rec: 'Scores on standardized tests, such as the SAT or ACT',
    },
    {
      demometum: {
        color1: 'yellow',
        demographics: 'Churchattend',
        dmeta: 'Church Attendance',
      },
      level: 'Weekly+',
      y: 26.607387140902873,
      question_rec: 'Involvement in community service',
    },
    {
      demometum: {
        color1: 'yellow',
        demographics: 'Churchattend',
        dmeta: 'Church Attendance',
      },
      level: 'Weekly+',
      y: 24.52054794520548,
      question_rec: 'Being the first person in the family to go to college',
    },
    {
      demometum: {
        color1: 'yellow',
        demographics: 'Churchattend',
        dmeta: 'Church Attendance',
      },
      level: 'Rarely',
      y: 21.996370235934666,
      question_rec: 'Involvement in community service',
    },
    {
      demometum: {
        color1: 'yellow',
        demographics: 'Churchattend',
        dmeta: 'Church Attendance',
      },
      level: 'Rarely',
      y: 21.39231327048586,
      question_rec: 'Being the first person in the family to go to college',
    },
    {
      demometum: {
        color1: 'yellow',
        demographics: 'Churchattend',
        dmeta: 'Church Attendance',
      },
      level: 'Weekly+',
      y: 8.891928864569083,
      question_rec: 'Race or ethnicity',
    },
    {
      demometum: {
        color1: 'yellow',
        demographics: 'Churchattend',
        dmeta: 'Church Attendance',
      },
      level: 'Weekly+',
      y: 8.481532147742818,
      question_rec: 'Athletic ability',
    },
    {
      demometum: {
        color1: 'yellow',
        demographics: 'Churchattend',
        dmeta: 'Church Attendance',
      },
      level: 'Rarely',
      y: 8.118883653497644,
      question_rec: 'Race or ethnicity',
    },
    {
      demometum: {
        color1: 'yellow',
        demographics: 'Churchattend',
        dmeta: 'Church Attendance',
      },
      level: 'Weekly+',
      y: 7.059629883481837,
      question_rec: 'Whether a relative attended the school',
    },
    {
      demometum: {
        color1: 'yellow',
        demographics: 'Churchattend',
        dmeta: 'Church Attendance',
      },
      level: 'Rarely',
      y: 6.393025790047221,
      question_rec: 'Athletic ability',
    },
    {
      demometum: {
        color1: 'yellow',
        demographics: 'Churchattend',
        dmeta: 'Church Attendance',
      },
      level: 'Weekly+',
      y: 4.849726775956284,
      question_rec: 'Gender',
    },
    {
      demometum: {
        color1: 'yellow',
        demographics: 'Churchattend',
        dmeta: 'Church Attendance',
      },
      level: 'Rarely',
      y: 4.278462654097172,
      question_rec: 'Whether a relative attended the school',
    },
    {
      demometum: {
        color1: 'yellow',
        demographics: 'Churchattend',
        dmeta: 'Church Attendance',
      },
      level: 'Rarely',
      y: 3.922993098438068,
      question_rec: 'Gender',
    },
    {
      demometum: {
        color1: 'orange',
        demographics: 'F_AGECAT',
        dmeta: 'Age Group',
      },
      level: '65+',
      y: 74.66367713004485,
      question_rec: 'High school grades',
    },
    {
      demometum: {
        color1: 'orange',
        demographics: 'F_AGECAT',
        dmeta: 'Age Group',
      },
      level: '18-29',
      y: 67.56756756756756,
      question_rec: 'High school grades',
    },
    {
      demometum: {
        color1: 'orange',
        demographics: 'F_AGECAT',
        dmeta: 'Age Group',
      },
      level: '65+',
      y: 53.064275037369214,
      question_rec: 'Scores on standardized tests, such as the SAT or ACT',
    },
    {
      demometum: {
        color1: 'orange',
        demographics: 'F_AGECAT',
        dmeta: 'Age Group',
      },
      level: '18-29',
      y: 44.064748201438846,
      question_rec: 'Scores on standardized tests, such as the SAT or ACT',
    },
    {
      demometum: {
        color1: 'orange',
        demographics: 'F_AGECAT',
        dmeta: 'Age Group',
      },
      level: '18-29',
      y: 31.384892086330936,
      question_rec: 'Being the first person in the family to go to college',
    },
    {
      demometum: {
        color1: 'orange',
        demographics: 'F_AGECAT',
        dmeta: 'Age Group',
      },
      level: '18-29',
      y: 28.1981981981982,
      question_rec: 'Involvement in community service',
    },
    {
      demometum: {
        color1: 'orange',
        demographics: 'F_AGECAT',
        dmeta: 'Age Group',
      },
      level: '65+',
      y: 22.404779686333086,
      question_rec: 'Involvement in community service',
    },
    {
      demometum: {
        color1: 'orange',
        demographics: 'F_AGECAT',
        dmeta: 'Age Group',
      },
      level: '65+',
      y: 17.752808988764045,
      question_rec: 'Being the first person in the family to go to college',
    },
    {
      demometum: {
        color1: 'orange',
        demographics: 'F_AGECAT',
        dmeta: 'Age Group',
      },
      level: '18-29',
      y: 12.758310871518418,
      question_rec: 'Race or ethnicity',
    },
    {
      demometum: {
        color1: 'orange',
        demographics: 'F_AGECAT',
        dmeta: 'Age Group',
      },
      level: '18-29',
      y: 11.420863309352518,
      question_rec: 'Athletic ability',
    },
    {
      demometum: {
        color1: 'orange',
        demographics: 'F_AGECAT',
        dmeta: 'Age Group',
      },
      level: '18-29',
      y: 8.64086408640864,
      question_rec: 'Whether a relative attended the school',
    },
    {
      demometum: {
        color1: 'orange',
        demographics: 'F_AGECAT',
        dmeta: 'Age Group',
      },
      level: '65+',
      y: 7.335329341317365,
      question_rec: 'Race or ethnicity',
    },
    {
      demometum: {
        color1: 'orange',
        demographics: 'F_AGECAT',
        dmeta: 'Age Group',
      },
      level: '18-29',
      y: 6.126126126126126,
      question_rec: 'Gender',
    },
    {
      demometum: {
        color1: 'orange',
        demographics: 'F_AGECAT',
        dmeta: 'Age Group',
      },
      level: '65+',
      y: 5.7057057057057055,
      question_rec: 'Athletic ability',
    },
    {
      demometum: {
        color1: 'orange',
        demographics: 'F_AGECAT',
        dmeta: 'Age Group',
      },
      level: '65+',
      y: 5.164670658682635,
      question_rec: 'Whether a relative attended the school',
    },
    {
      demometum: {
        color1: 'orange',
        demographics: 'F_AGECAT',
        dmeta: 'Age Group',
      },
      level: '65+',
      y: 3.523238380809595,
      question_rec: 'Gender',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'ideology',
        dmeta: 'Ideology',
      },
      level: 'Liberal',
      y: 70.2558001189768,
      question_rec: 'High school grades',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'ideology',
        dmeta: 'Ideology',
      },
      level: 'Conservative',
      y: 69.29936305732484,
      question_rec: 'High school grades',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'ideology',
        dmeta: 'Ideology',
      },
      level: 'Conservative',
      y: 51.91326530612245,
      question_rec: 'Scores on standardized tests, such as the SAT or ACT',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'ideology',
        dmeta: 'Ideology',
      },
      level: 'Liberal',
      y: 41.22546103509816,
      question_rec: 'Scores on standardized tests, such as the SAT or ACT',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'ideology',
        dmeta: 'Ideology',
      },
      level: 'Liberal',
      y: 31.093935790725325,
      question_rec: 'Involvement in community service',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'ideology',
        dmeta: 'Ideology',
      },
      level: 'Liberal',
      y: 31.016042780748666,
      question_rec: 'Being the first person in the family to go to college',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'ideology',
        dmeta: 'Ideology',
      },
      level: 'Conservative',
      y: 17.938931297709924,
      question_rec: 'Involvement in community service',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'ideology',
        dmeta: 'Ideology',
      },
      level: 'Conservative',
      y: 15.350318471337578,
      question_rec: 'Being the first person in the family to go to college',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'ideology',
        dmeta: 'Ideology',
      },
      level: 'Liberal',
      y: 13.131313131313133,
      question_rec: 'Race or ethnicity',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'ideology',
        dmeta: 'Ideology',
      },
      level: 'Conservative',
      y: 8.158062460165711,
      question_rec: 'Athletic ability',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'ideology',
        dmeta: 'Ideology',
      },
      level: 'Liberal',
      y: 6.1309523809523805,
      question_rec: 'Athletic ability',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'ideology',
        dmeta: 'Ideology',
      },
      level: 'Conservative',
      y: 6.050955414012739,
      question_rec: 'Whether a relative attended the school',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'ideology',
        dmeta: 'Ideology',
      },
      level: 'Liberal',
      y: 5.344418052256532,
      question_rec: 'Whether a relative attended the school',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'ideology',
        dmeta: 'Ideology',
      },
      level: 'Conservative',
      y: 5.089058524173027,
      question_rec: 'Race or ethnicity',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'ideology',
        dmeta: 'Ideology',
      },
      level: 'Liberal',
      y: 4.98812351543943,
      question_rec: 'Gender',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'ideology',
        dmeta: 'Ideology',
      },
      level: 'Conservative',
      y: 3.8853503184713376,
      question_rec: 'Gender',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'polparty',
        dmeta: 'Political Party',
      },
      level: 'Republican',
      y: 70.35040431266847,
      question_rec: 'High school grades',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'polparty',
        dmeta: 'Political Party',
      },
      level: 'Democrat',
      y: 69.24216242902988,
      question_rec: 'High school grades',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'polparty',
        dmeta: 'Political Party',
      },
      level: 'Republican',
      y: 51.75359712230215,
      question_rec: 'Scores on standardized tests, such as the SAT or ACT',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'polparty',
        dmeta: 'Political Party',
      },
      level: 'Democrat',
      y: 43.763892319091134,
      question_rec: 'Scores on standardized tests, such as the SAT or ACT',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'polparty',
        dmeta: 'Political Party',
      },
      level: 'Democrat',
      y: 30.07648655317049,
      question_rec: 'Being the first person in the family to go to college',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'polparty',
        dmeta: 'Political Party',
      },
      level: 'Democrat',
      y: 28.268376911692155,
      question_rec: 'Involvement in community service',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'polparty',
        dmeta: 'Political Party',
      },
      level: 'Republican',
      y: 17.559657811796487,
      question_rec: 'Involvement in community service',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'polparty',
        dmeta: 'Political Party',
      },
      level: 'Republican',
      y: 15.256525652565255,
      question_rec: 'Being the first person in the family to go to college',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'polparty',
        dmeta: 'Political Party',
      },
      level: 'Democrat',
      y: 12.721893491124261,
      question_rec: 'Race or ethnicity',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'polparty',
        dmeta: 'Political Party',
      },
      level: 'Democrat',
      y: 8.666666666666668,
      question_rec: 'Athletic ability',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'polparty',
        dmeta: 'Political Party',
      },
      level: 'Republican',
      y: 8.63697705802969,
      question_rec: 'Athletic ability',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'polparty',
        dmeta: 'Political Party',
      },
      level: 'Democrat',
      y: 8.604536489151874,
      question_rec: 'Whether a relative attended the school',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'polparty',
        dmeta: 'Political Party',
      },
      level: 'Democrat',
      y: 6.538366641993584,
      question_rec: 'Gender',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'polparty',
        dmeta: 'Political Party',
      },
      level: 'Republican',
      y: 6.115107913669065,
      question_rec: 'Whether a relative attended the school',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'polparty',
        dmeta: 'Political Party',
      },
      level: 'Republican',
      y: 4.314606741573034,
      question_rec: 'Race or ethnicity',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'polparty',
        dmeta: 'Political Party',
      },
      level: 'Republican',
      y: 3.1517334533993697,
      question_rec: 'Gender',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'F_METRO',
        dmeta: 'Metro vs. Urban',
      },
      level: 'Metropolitan',
      y: 69.77338558527858,
      question_rec: 'High school grades',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'F_METRO',
        dmeta: 'Metro vs. Urban',
      },
      level: 'Non-metropolitan',
      y: 64.38172043010752,
      question_rec: 'High school grades',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'F_METRO',
        dmeta: 'Metro vs. Urban',
      },
      level: 'Metropolitan',
      y: 46.576745774287176,
      question_rec: 'Scores on standardized tests, such as the SAT or ACT',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'F_METRO',
        dmeta: 'Metro vs. Urban',
      },
      level: 'Non-metropolitan',
      y: 45.63758389261745,
      question_rec: 'Scores on standardized tests, such as the SAT or ACT',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'F_METRO',
        dmeta: 'Metro vs. Urban',
      },
      level: 'Metropolitan',
      y: 25.166240409207163,
      question_rec: 'Being the first person in the family to go to college',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'F_METRO',
        dmeta: 'Metro vs. Urban',
      },
      level: 'Metropolitan',
      y: 24.919038690983466,
      question_rec: 'Involvement in community service',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'F_METRO',
        dmeta: 'Metro vs. Urban',
      },
      level: 'Non-metropolitan',
      y: 19.731543624161073,
      question_rec: 'Being the first person in the family to go to college',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'F_METRO',
        dmeta: 'Metro vs. Urban',
      },
      level: 'Non-metropolitan',
      y: 18.766756032171582,
      question_rec: 'Involvement in community service',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'F_METRO',
        dmeta: 'Metro vs. Urban',
      },
      level: 'Metropolitan',
      y: 10.09377664109122,
      question_rec: 'Race or ethnicity',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'F_METRO',
        dmeta: 'Metro vs. Urban',
      },
      level: 'Metropolitan',
      y: 8.935879945429742,
      question_rec: 'Athletic ability',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'F_METRO',
        dmeta: 'Metro vs. Urban',
      },
      level: 'Metropolitan',
      y: 7.991139887544726,
      question_rec: 'Whether a relative attended the school',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'F_METRO',
        dmeta: 'Metro vs. Urban',
      },
      level: 'Non-metropolitan',
      y: 7.114093959731544,
      question_rec: 'Athletic ability',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'F_METRO',
        dmeta: 'Metro vs. Urban',
      },
      level: 'Non-metropolitan',
      y: 6.308724832214765,
      question_rec: 'Whether a relative attended the school',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'F_METRO',
        dmeta: 'Metro vs. Urban',
      },
      level: 'Non-metropolitan',
      y: 6.166219839142091,
      question_rec: 'Race or ethnicity',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'F_METRO',
        dmeta: 'Metro vs. Urban',
      },
      level: 'Metropolitan',
      y: 5.558397271952259,
      question_rec: 'Gender',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'F_METRO',
        dmeta: 'Metro vs. Urban',
      },
      level: 'Non-metropolitan',
      y: 3.8978494623655915,
      question_rec: 'Gender',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'F_SEX',
        dmeta: 'Gender',
      },
      level: 'Male',
      y: 71.69220055710306,
      question_rec: 'High school grades',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'F_SEX',
        dmeta: 'Gender',
      },
      level: 'Female',
      y: 67.21969494246723,
      question_rec: 'High school grades',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'F_SEX',
        dmeta: 'Gender',
      },
      level: 'Male',
      y: 51.72654342518312,
      question_rec: 'Scores on standardized tests, such as the SAT or ACT',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'F_SEX',
        dmeta: 'Gender',
      },
      level: 'Female',
      y: 42.45510586974002,
      question_rec: 'Scores on standardized tests, such as the SAT or ACT',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'F_SEX',
        dmeta: 'Gender',
      },
      level: 'Female',
      y: 26.39892904953146,
      question_rec: 'Being the first person in the family to go to college',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'F_SEX',
        dmeta: 'Gender',
      },
      level: 'Female',
      y: 26.0427807486631,
      question_rec: 'Involvement in community service',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'F_SEX',
        dmeta: 'Gender',
      },
      level: 'Male',
      y: 22.117729014280737,
      question_rec: 'Being the first person in the family to go to college',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'F_SEX',
        dmeta: 'Gender',
      },
      level: 'Male',
      y: 21.85430463576159,
      question_rec: 'Involvement in community service',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'F_SEX',
        dmeta: 'Gender',
      },
      level: 'Female',
      y: 9.81808453718566,
      question_rec: 'Race or ethnicity',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'F_SEX',
        dmeta: 'Gender',
      },
      level: 'Male',
      y: 9.445799930289299,
      question_rec: 'Race or ethnicity',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'F_SEX',
        dmeta: 'Gender',
      },
      level: 'Female',
      y: 8.820375335120643,
      question_rec: 'Athletic ability',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'F_SEX',
        dmeta: 'Gender',
      },
      level: 'Male',
      y: 8.626086956521739,
      question_rec: 'Athletic ability',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'F_SEX',
        dmeta: 'Gender',
      },
      level: 'Female',
      y: 8.585183204065258,
      question_rec: 'Whether a relative attended the school',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'F_SEX',
        dmeta: 'Gender',
      },
      level: 'Male',
      y: 6.792058516196447,
      question_rec: 'Whether a relative attended the school',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'F_SEX',
        dmeta: 'Gender',
      },
      level: 'Female',
      y: 5.542168674698795,
      question_rec: 'Gender',
    },
    {
      demometum: {
        color1: 'blue',
        demographics: 'F_SEX',
        dmeta: 'Gender',
      },
      level: 'Male',
      y: 5.156794425087108,
      question_rec: 'Gender',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'Marital_status',
        dmeta: 'Marital Status',
      },
      level: 'Married',
      y: 69.93620414673046,
      question_rec: 'High school grades',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'Marital_status',
        dmeta: 'Marital Status',
      },
      level: 'Never been married',
      y: 68.72069658405894,
      question_rec: 'High school grades',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'Marital_status',
        dmeta: 'Marital Status',
      },
      level: 'Married',
      y: 47.54797441364605,
      question_rec: 'Scores on standardized tests, such as the SAT or ACT',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'Marital_status',
        dmeta: 'Marital Status',
      },
      level: 'Never been married',
      y: 45.08361204013378,
      question_rec: 'Scores on standardized tests, such as the SAT or ACT',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'Marital_status',
        dmeta: 'Marital Status',
      },
      level: 'Never been married',
      y: 29.966555183946486,
      question_rec: 'Being the first person in the family to go to college',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'Marital_status',
        dmeta: 'Marital Status',
      },
      level: 'Never been married',
      y: 25.88628762541806,
      question_rec: 'Involvement in community service',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'Marital_status',
        dmeta: 'Marital Status',
      },
      level: 'Married',
      y: 23.72340425531915,
      question_rec: 'Involvement in community service',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'Marital_status',
        dmeta: 'Marital Status',
      },
      level: 'Married',
      y: 22.523961661341854,
      question_rec: 'Being the first person in the family to go to college',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'Marital_status',
        dmeta: 'Marital Status',
      },
      level: 'Never been married',
      y: 13.502673796791445,
      question_rec: 'Race or ethnicity',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'Marital_status',
        dmeta: 'Marital Status',
      },
      level: 'Never been married',
      y: 9.979906229068987,
      question_rec: 'Athletic ability',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'Marital_status',
        dmeta: 'Marital Status',
      },
      level: 'Married',
      y: 8.297872340425531,
      question_rec: 'Athletic ability',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'Marital_status',
        dmeta: 'Marital Status',
      },
      level: 'Married',
      y: 7.987220447284344,
      question_rec: 'Race or ethnicity',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'Marital_status',
        dmeta: 'Marital Status',
      },
      level: 'Never been married',
      y: 7.954545454545454,
      question_rec: 'Whether a relative attended the school',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'Marital_status',
        dmeta: 'Marital Status',
      },
      level: 'Married',
      y: 7.501995211492418,
      question_rec: 'Whether a relative attended the school',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'Marital_status',
        dmeta: 'Marital Status',
      },
      level: 'Never been married',
      y: 6.354515050167224,
      question_rec: 'Gender',
    },
    {
      demometum: {
        color1: 'red',
        demographics: 'Marital_status',
        dmeta: 'Marital Status',
      },
      level: 'Married',
      y: 4.948124501197127,
      question_rec: 'Gender',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'race',
        dmeta: 'Race',
      },
      level: 'White',
      y: 70.21063189568706,
      question_rec: 'High school grades',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'race',
        dmeta: 'Race',
      },
      level: 'Non-white',
      y: 68.51851851851852,
      question_rec: 'High school grades',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'race',
        dmeta: 'Race',
      },
      level: 'White',
      y: 48.110999665663655,
      question_rec: 'Scores on standardized tests, such as the SAT or ACT',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'race',
        dmeta: 'Race',
      },
      level: 'Non-white',
      y: 45.372714486638536,
      question_rec: 'Scores on standardized tests, such as the SAT or ACT',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'race',
        dmeta: 'Race',
      },
      level: 'Non-white',
      y: 32.16390682009542,
      question_rec: 'Being the first person in the family to go to college',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'race',
        dmeta: 'Race',
      },
      level: 'Non-white',
      y: 27.79803646563815,
      question_rec: 'Involvement in community service',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'race',
        dmeta: 'Race',
      },
      level: 'White',
      y: 19.89301237044467,
      question_rec: 'Involvement in community service',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'race',
        dmeta: 'Race',
      },
      level: 'White',
      y: 15.724322515891604,
      question_rec: 'Being the first person in the family to go to college',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'race',
        dmeta: 'Race',
      },
      level: 'Non-white',
      y: 14.606741573033707,
      question_rec: 'Race or ethnicity',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'race',
        dmeta: 'Race',
      },
      level: 'Non-white',
      y: 11.855381165919281,
      question_rec: 'Whether a relative attended the school',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'race',
        dmeta: 'Race',
      },
      level: 'Non-white',
      y: 11.64421997755331,
      question_rec: 'Athletic ability',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'race',
        dmeta: 'Race',
      },
      level: 'Non-white',
      y: 8.223407241088971,
      question_rec: 'Gender',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'race',
        dmeta: 'Race',
      },
      level: 'White',
      y: 5.323066622028792,
      question_rec: 'Athletic ability',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'race',
        dmeta: 'Race',
      },
      level: 'White',
      y: 3.942532576010692,
      question_rec: 'Race or ethnicity',
    },
    {
      demometum: {
        color1: 'green',
        demographics: 'race',
        dmeta: 'Race',
      },
      level: 'White',
      y: 3.0779524924723987,
      question_rec: 'Whether a relative attended the school',
    },
    {
      demometum: {
        color1: '#000000',
        demographics: 'race',
        dmeta: 'Race',
      },
      level: 'White',
      y: 2.0414993306559572,
      question_rec: 'Gender',
    },
  ];

  const levelmeta = {
    'High Income': '#55af6e',
    'Low Income': '#000000',
    'College graduate+': '#af00c7',
    'H.S. graduate or less': '#000000',
    'Weekly+': '#a7c700',
    Rarely: '#000000',
    '65+': '#000000',
    '18-29': '#e69f00',
    Liberal: '#0000ff',
    Conservative: '#ee0303',
    Republican: '#ee0303',
    Democrat: '#0000ff',
    Metropolitan: '#000000',
    'Non-metropolitan': '#55af6e',
    Male: '#000000',
    Female: '#e69f00',
    Married: '#ee0303',
    'Never been married': '#000000',
    White: '#000000',
    'Non-white': '#e69f00',
  };
  const chartOptions = {
    credits: { enabled: false },
    exporting: { enabled: false },
    legend: {
      itemStyle: { fontSize: 10 },
      title: {
        style: { fontSize: 12 },
        text: null,
      },
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'top',
      margin: 0,
      padding: 0,
      itemMarginTop: 0,
      itemMarginBottom: 10,
    },

    plotOptions: {
      bar: {
        pointPadding: 0,
        pointWidth: 15,
        groupPadding: 0.5,
        borderWidth: 0.25,
      },

      bubble: {
        maxSize: 24,
      },

      series: {
        states: {
          inactive: {
            opacity: 1,
          },
        },
        label: { enabled: false },
        turboThreshold: 0,
        showInLegend: true,
      },
    },

    chart: {
      height: '550px',
      backgroundColor: 'transparent',
      type: 'bar',
      style: {
        width: '100%',
        fontFamily: 'Georgia',
      },
    },

    series: [
      {
        name: 'Overall Average',
        data: overall.map(d => ({
          ...d,
          name: d.question_rec,
        })),
        type: 'column',
        color: '#e7e7e7',
        borderColor: 'transparent',
      },
    ],

    title: {
      margin: 2,
      text: 'Title',
    },

    yAxis: {
      title: {
        text: isBinary ? axislabel : 'Average ',
      },
      labels: {
        enabled: !isBinary,
      },
      startOnTick: false,
      tickInterval: 1,
      gridLineColor: 'transparent',
    },
    xAxis: {
      gridLineColor: 'transparent',
      lineWidth: 0,
      minorGridLineWidth: 0,
      tickWidth: 1,
      lineColor: 'transparent',
      tickColor: '#737373',
      title: { text: ' ' },
      type: 'category',
    },
    tooltip: {
      valueDecimals: 2,
      useHTML: true,
    },
  };
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{
          width: '100%',
        }}
      />
    </div>
  );
}

export default College;
