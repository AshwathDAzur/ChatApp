import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const steps = [
  {
    label: "Name the Squad with suitable name",
  },
  {
    label: "Give a brief description of your squad",
  },
  {
    label: "Leave a initiating message",
  },
];

export default function AddSquad() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    squadId: 0,
    title: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    calculateSquadId();
  }, []);

  const calculateSquadId = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7105/api/Squads/LastSquad`
      );
      const lastSquadId = response.data;
      const nextSquadId = lastSquadId + 1;
      setFormData((prevFormData) => ({
        ...prevFormData,
        squadId: nextSquadId,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    }
  };

  const performPostOperation = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    if (formData.title != "" && formData.description != "") {
      try {
        const response = await axios.post("https://localhost:7105/api/Squads", {
          ...formData,
          createdAt: formattedDate,
          deadLine: formattedDate,
        });
        console.log("POST response:", response.data);
        setOpen(true);
        window.location.reload();
      } catch (error) {
        console.error("Error performing POST:", error);
      }
    } else {
      setError("Please fill in all the required fields");
      setOpen(true);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: 700 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Box sx={{ mb: 2 }}>
                {index === 0 && (
                  <TextField
                    sx={{ width: 500 }}
                    label="Name Your Squad"
                    variant="outlined"
                    fullWidth
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                )}
                {index === 1 && (
                  <TextField
                    sx={{ width: 500 }}
                    label="Describe your Squad"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                )}
                {index === 2 && (
                  <TextField
                    sx={{ width: 500 }}
                    label="Leave a note"
                    variant="outlined"
                    fullWidth
                  />
                )}
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={performPostOperation} sx={{ mt: 1, mr: 1 }}>
            Initiate Squad
          </Button>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Squad initiated !!!
        </Alert>
      </Snackbar>
      {error && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert
            onClose={() => setError(null)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}
