import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import burgerIcon from "../../../static/images/burger-icon.svg";
import ArrowWhiteIcon from "../../../static/images/arrow-white.png";
import { useParams } from "react-router";
import { getProgrammeDetails, getProgrammeSections } from "../../../../services/common";
import { SectionData } from "../../../../common/types";
import { useSnackbar } from "notistack";
import "./style.scss";

interface ProgrammePageParams {
  programmeId: string;
}

const ProgrammeSection = () => {
  const [programme, setProgramme] = useState<any>(null);
  const { programmeId } = useParams<ProgrammePageParams>();
  const { enqueueSnackbar } = useSnackbar();

  const [sections, setSections] = useState<SectionData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProgrammeSections(Number(programmeId));
        const programmeDetails: any = await getProgrammeDetails(programmeId);
        setProgramme(programmeDetails.data);
        let arr: any = [];
        programmeDetails.data.section_order.filter(function (order: any) {
          return response.data.forEach(function (list: any) {
            if (order === list.id) {
              arr.push(list);
            }
          });
        });
        setSections(arr);
      } catch (error) {
        enqueueSnackbar("Could not fetch sections", { variant: "error" });
      }
    };
    fetchData();
  }, [programmeId, enqueueSnackbar]);

  return (
    <Grid
      className="programmes-section"
      container
      style={{
        backgroundColor: "#F1F5FF",
        maxWidth: "420px",
        margin: "auto",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Grid item container direction="column">
        <Grid
          item
          sx={{
            padding: "6% 5%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2%",
          }}
        >
          <Typography sx={{ fontWeight: "500" }} variant="h6" gutterBottom component="p">
            Learning Journey
          </Typography>
          <img
            style={{ cursor: "pointer" }}
            src={burgerIcon}
            width="50px"
            height="27px"
            alt="New Wave Learning Logo"
          />
        </Grid>

        <Grid className="section">
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "0 13px",
              marginBottom: "20px !important",
            }}
          >
            <img width="68px" src={programme?.image} alt="programme img" />
            <p className={"programmes-title"}>{programme?.name}</p>
          </Grid>
          <Grid className="footer programme-footer">
            <Typography
              sx={{
                fontWeight: "700",
                margin: "0",
                fontSize: "18px !important",
                color: "white",
              }}
              variant="h5"
              gutterBottom
              component="p"
            >
              Get Started
            </Typography>
            <img
              style={{ marginRight: "20px", objectFit: "cover", borderRadius: "4px" }}
              src={ArrowWhiteIcon}
              width="12px"
              height="23px"
              alt="arrow icon"
            />
          </Grid>
        </Grid>

        {sections &&
          sections.map((item: any, index: number) => {
            return (
              <Grid key={index} className="section">
                <p className={"section-title"}>{item.title}</p>
                <p className={"section-step"}>0/{item.steps} Steps completed</p>
                <Grid className="footer">
                  <Typography
                    sx={{
                      fontWeight: "700",
                      margin: "0",
                      fontSize: "18px !important",
                      color: "white",
                    }}
                    variant="h5"
                    gutterBottom
                    component="p"
                  >
                    Continue
                  </Typography>
                  <img
                    style={{ marginRight: "20px", objectFit: "cover", borderRadius: "4px" }}
                    src={ArrowWhiteIcon}
                    width="12px"
                    height="23px"
                    alt="arrow icon"
                  />
                </Grid>
              </Grid>
            );
          })}
      </Grid>
    </Grid>
  );
};

export default ProgrammeSection;
