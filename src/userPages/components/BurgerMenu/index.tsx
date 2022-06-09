import styled from "@emotion/styled";
import { useHistory } from "react-router";
import { Grid, Typography } from "@mui/material";
import nwLogo from "../../static/images/logo.png";
import React from "react";

const StyledMenu = styled.nav`
  flex-direction: column;
  //justify-content: center;
  background: rgb(241, 245, 255);
  display: ${({ open }: any) => (open ? "flex" : "none")};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  max-width: 455px;
  width: 455px;
  right: 0;
  padding-top: 50%;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 576px) {
    width: 100%;
  }

  p {
    margin: 0;
    text-transform: uppercase;
    padding: 15px 0;
    letter-spacing: 0.5rem;
    text-decoration: none;
    transition: color 0.3s linear;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 10px;

    color: #0e4a66;

    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: #343078;
    }
  }
`;

export const Menu = ({ cohortId, open, close }: any) => {
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    window.location.href = "/user-login";
  };

  return (
    // @ts-ignore
    <StyledMenu open={open}>
      <p
        onClick={() => {
          close(false);
          history.push(`/user-dashboard/${cohortId}`);
        }}
      >
        Dashboard
      </p>
      {/*<p*/}
      {/*  onClick={() => {*/}
      {/*    close(false);*/}
      {/*    history.push("/user-programmes");*/}
      {/*  }}*/}
      {/*>*/}
      {/*  Programmes*/}
      {/*</p>*/}
      <p
        onClick={() => {
          close(false);
          logout();
        }}
      >
        Logout
      </p>
    </StyledMenu>
  );
};

const StyledBurger: any = styled.button`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  top: 35px;
  right: 20px;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ open }: any) => (open ? "black" : "black")};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-of-type {
      transform: ${({ open }: any) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-of-type(2) {
      opacity: ${({ open }: any) => (open ? "0" : "1")};
      transform: ${({ open }: any) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-of-type(3) {
      transform: ${({ open }: any) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

export const Burger = ({ open, setOpen }: any) => {
  return (
    <Grid sx={{ marginTop: "50px" }}>
      {open ? (
        <Typography
          sx={{
            position: "absolute",
            zIndex: 1,
            left: "40%",
            top: "3%",
          }}
        >
          <img src={nwLogo} width="89px" height="52px" alt="New Wave Learning Logo" />
        </Typography>
      ) : (
        ""
      )}

      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
    </Grid>
  );
};
