import "./styles.scss";
import App from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";
import { Breakpoints } from "react-device-breakpoints";
import { ThemeProvider as MaterialThemeProvider } from "@rmwc/theme";

const theme = {
  colors: {
    primary: "white",
  },
};

const breakpoints = {
  isDesktop: "(min-width: 1024px)",
  isTablet: "(max-width: 1023px) and (min-width: 768px)",
  isMobile: "(max-width: 767px)",
};

const materialTheme: Record<string, string> = {
  topAppBarFillColor: "FFFFFF",
};

export default class CovidCurveApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <MaterialThemeProvider options={materialTheme}>
        <ThemeProvider theme={theme}>
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Poppins&display=swap"
            rel="stylesheet"
          />
          <Breakpoints {...breakpoints}>
            <Component {...pageProps} />
          </Breakpoints>
        </ThemeProvider>
      </MaterialThemeProvider>
    );
  }
}
