import './App.css';
import Share from './Share.jsx';
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Blurb from './Blurb.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Button, Typography, MenuItem, Select, FormControl, Container, Box, Grid } from '@mui/material';
import Confetti from 'react-confetti';
import { Spring } from 'react-spring';
import ResultsCards from './ResultsCards';


const App = () => {


  useEffect(() => {
    fetch('./carbondata.csv')
      .then(response => response.blob())
      .then(blob => {
        Papa.parse(blob, {
          header: true,
          complete: function (results) {
            setCarData(results.data);
          }
        });
      });
  }, []);

  const [carData, setCarData] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [avg, setAvg] = useState(null);
  const [increase, setIncrease] = useState(0);
  const [prevIncrease, setPrevIncrease] = useState(0);
  const [historicalIncrease, setHistoricalIncrease] = useState(0);
  const [yearsPassed, setYearsPassed] = useState(0);
  const [difference, setDifference] = useState(0);
  const [trend, setTrend] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false);
  const [showRain, setShowRain] = useState(false);


  const current = new Date();

  let months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

    let obj = {
      1959: 21.38,
      1960: 22.17,
      1961: 22.43,
      1962: 22.23,
      1963: 22.08,
      1964: 21.65,
      1965: 21.43,
      1966: 21.89,
      1967: 21.71,
      1968: 21.74,
      1969: 22.63,
      1970: 23.14,
      1971: 23.42,
      1972: 23.75,
      1973: 24.93,
      1974: 24.91,
      1975: 25.16,
      1976: 24.72,
      1977: 25.73,
      1978: 26.52,
      1979: 27.40,
      1980: 28.39,
      1981: 29.16,
      1982: 30.57,
      1983: 32.03,
      1984: 33.94,
      1985: 35.32,
      1986: 36.25,
      1987: 37.13,
      1988: 38.87,
      1989: 39.45,
      1990: 39.49,
      1991: 39.50,
      1992: 38.69,
      1993: 38.05,
      1994: 38.38,
      1995: 38.36,
      1996: 38.35,
      1997: 37.06,
      1998: 36.84,
      1999: 37.02,
      2000: 35.91,
      2001: 34.05,
      2002: 32.79,
      2003: 33.11,
      2004: 31.72,
      2005: 30.53,
      2006: 28.44,
      2007: 27.69,
      2008: 28.33,
      2009: 26.28,
      2010: 25.73,
      2011: 22.77,
      2012: 23.21,
      2013: 21.62,
      2014: 19.74,
      2015: 17.66,
      2016: 17.45,
      2017: 16.14,
      2018: 11.92,
      2019: 11.17,
      2020: 6.79,
      2021: 4.23,
      2022: 4.23,
      2023: 4.23
    };


  let startYear = 1959;
  let endYear = 2023;

  let years = [];
  for (let i = startYear; i <= endYear; i++) {
    years.push(i);
  }

  const handleMonthClick = (e) => {
    e.preventDefault();
    setMonth(e.target.value);
  };

  const handleYearClick = (e) => {
    e.preventDefault();
    setYear(e.target.value);
  };

  const handleAvgClick = (event) => {
    let yearNumber = Number(year);
    let monthNumber = months.indexOf(month) + 1;

    if (month === '' || year === '') {
      alert('Please complete the drop-down items');
      return;
    }

    const currentYear = current.getFullYear();
    const currentMonth = current.getMonth() + 1;
    const yearsPassed = currentYear - yearNumber;
    const monthsPassed = currentMonth - monthNumber;

    if (monthsPassed < 0) {
      setDifference(yearsPassed - 1);
    } else {
      setDifference(yearsPassed);
    }

    for (let i = 0; i < carData.length; i++) {
      if (Number(carData[i].Year) === yearNumber && Number(carData[i].Month) === monthNumber) {
        setAvg(Number(carData[i].Average));
      }
    }

    setHistoricalIncrease(yearNumber - yearsPassed);

    for (let j = 0; j < carData.length; j++) {
      if (Number(carData[j].Year) === historicalIncrease && Number(carData[j].Month) === monthNumber) {
        setHistoricalIncrease(avg - Number(carData[j].Average));
      }
    }


    //confetti
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setShowRain(true);
    }, 8000);

  };

  useEffect(() => {
    setTrend(obj[year])
  }, [year, obj])

  useEffect(() => {
    if (avg !== null) {
      const calculatedIncrease = 423.68 - avg;
      const numb = calculatedIncrease.toFixed(2);
      setIncrease(numb);
    }
  }, [prevIncrease]);

  useEffect(() => {
    if (increase !== null) {
      const calculatedIncrease = 423.68 - avg;
      const numb = calculatedIncrease.toFixed(2);
      setIncrease(numb);
    }
  }, [avg]);

  return (
    <>
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <Typography variant="h4" sx={{ p: '8px' }}>What's your Carbon Dioxide Birth Number?</Typography>
        <Typography variant="h5" sx={{ mb: '32px' }}>Select your birth information to find out!</Typography>

        <div className="month">
          <FormControl sx={{ m: 1, width: 300 }}>
            <Select
              value={month}
              onChange={handleMonthClick}
              displayEmpty
              inputProps={{ 'aria-label': 'Month' }}
              sx={{
                fontSize: "1rem",
                ":hover": { bgcolor: "lightgrey" },
              }}
            >
              <MenuItem value="" disabled>Month</MenuItem>
              {months.map((month) => (
                <MenuItem key={month} value={month}>{month}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="year">
          <FormControl sx={{ m: 1, width: 300 }}>
            <Select
              value={year}
              onChange={handleYearClick}
              displayEmpty
              inputProps={{ 'aria-label': 'Year' }}
              sx={{
                fontSize: "1rem",
                mb: '16px',
                ":hover": { bgcolor: "lightgrey" },
              }}
            >
              <MenuItem value="" disabled>Year</MenuItem>
              {years.map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <Button
          variant="contained"
          onClick={handleAvgClick}
          sx={{
            width: "fit-content",
            fontSize: "1rem",
            ":hover": { bgcolor: "lightBlue" }
          }}
        >
          GET MY RESULTS
        </Button>

        {showConfetti && (
          <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              numberOfPieces={200}
          />
        )}

        {avg && (
          <>
            <Typography  className="results" variant="h4" sx={{ textAlign: 'center', pt: '40px', pb: '30px', mt: '50px' }}>Your Results</Typography>
            <ResultsCards month={month} year={year} avg={avg} increase={increase} difference={difference} trend={trend}/>
            <Share setShowConfetti={setShowConfetti} />
            <Blurb />
          </>
        )}
      </Box>
    </Container>
    </>
  );
}

export default App;
