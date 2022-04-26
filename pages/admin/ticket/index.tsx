import { Container, Typography } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";

const Ticket: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>LVQ - Ticket</title>
      </Head>
      <Container component="main" maxWidth="lg">
        <Typography
          component="h1"
          variant="h5"
          sx={{
            marginTop: 4,
          }}
        >
          Account Settings
        </Typography>
      </Container>
    </Fragment>
  );
};

export default Ticket;
