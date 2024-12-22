import React, { useState } from 'react';
import { Container, Typography, Box, Button, TextField, Grid, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const KYS = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    mentalState: '',
    symptoms: '',
    activityLevel: '',
    diet: '',
    sleep: '',
    smoking: '',
    alcohol: '',
  });

  const [report, setReport] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Generate a health report based on the form data
    const healthReport = generateHealthReport(formData);
    setReport(healthReport.report);
    setAccuracy(healthReport.accuracy);
    setOpenDialog(true);
  };

  const generateHealthReport = (data) => {
    // Placeholder logic for generating a health report
    const bmi = (data.weight / ((data.height / 100) ** 2)).toFixed(2);
    let mentalState = 'Normal';
    let healthCondition = 'Healthy';
    let accuracy = 90;

    if (data.mentalState.toLowerCase().includes('depressed') || data.mentalState.toLowerCase().includes('sad')) {
      mentalState = 'Depressed';
      accuracy -= 10;
    } else if (data.mentalState.toLowerCase().includes('happy')) {
      mentalState = 'Happy';
    } else if (data.mentalState.toLowerCase().includes('lonely')) {
      mentalState = 'Lonely';
      accuracy -= 5;
    }

    if (data.symptoms.toLowerCase().includes('fever') || data.symptoms.toLowerCase().includes('cold') || data.symptoms.toLowerCase().includes('body pain')) {
      healthCondition = 'Unwell';
      accuracy -= 15;
    }

    if (data.activityLevel === 'Low') {
      healthCondition = 'Inactive';
      accuracy -= 10;
    } else if (data.activityLevel === 'High') {
      healthCondition = 'Active';
    }

    if (data.diet === 'Unhealthy') {
      healthCondition = 'Poor Diet';
      accuracy -= 10;
    }

    if (data.sleep === 'Poor') {
      healthCondition = 'Poor Sleep';
      accuracy -= 10;
    }

    if (data.smoking === 'Yes') {
      healthCondition = 'Smoker';
      accuracy -= 10;
    }

    if (data.alcohol === 'Yes') {
      healthCondition = 'Alcohol Consumer';
      accuracy -= 10;
    }

    return {
      report: `Health Report for ${data.name}:
      - Age: ${data.age}
      - Height: ${data.height} cm
      - Weight: ${data.weight} kg
      - BMI: ${bmi}
      - Mental State: ${mentalState}
      - Health Condition: ${healthCondition}
      
      Please consult with a healthcare provider for a detailed analysis.`,
      accuracy: accuracy,
    };
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container style={{ marginTop: '20px', maxWidth: '800px' }}>
      <Typography variant="h4" gutterBottom>
        Know Your Self (KYS)
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please fill out the following information to get a basic health condition report.
      </Typography>

      <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="age"
              label="Age"
              name="age"
              type="number"
              autoComplete="age"
              value={formData.age}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="height"
              label="Height (cm)"
              name="height"
              type="number"
              autoComplete="height"
              value={formData.height}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="weight"
              label="Weight (kg)"
              name="weight"
              type="number"
              autoComplete="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              id="mentalState"
              label="Mental State"
              name="mentalState"
              autoComplete="mentalState"
              value={formData.mentalState}
              onChange={handleChange}
            >
              <MenuItem value="Happy">Happy</MenuItem>
              <MenuItem value="Sad">Sad</MenuItem>
              <MenuItem value="Depressed">Depressed</MenuItem>
              <MenuItem value="Lonely">Lonely</MenuItem>
              <MenuItem value="Normal">Normal</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              id="symptoms"
              label="Health Symptoms"
              name="symptoms"
              autoComplete="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
            >
              <MenuItem value="None">None</MenuItem>
              <MenuItem value="Fever">Fever</MenuItem>
              <MenuItem value="Cold">Cold</MenuItem>
              <MenuItem value="Body Pain">Body Pain</MenuItem>
              <MenuItem value="Headache">Headache</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              id="activityLevel"
              label="Activity Level"
              name="activityLevel"
              autoComplete="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Moderate">Moderate</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              id="diet"
              label="Diet"
              name="diet"
              autoComplete="diet"
              value={formData.diet}
              onChange={handleChange}
            >
              <MenuItem value="Healthy">Healthy</MenuItem>
              <MenuItem value="Unhealthy">Unhealthy</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              id="sleep"
              label="Sleep Quality"
              name="sleep"
              autoComplete="sleep"
              value={formData.sleep}
              onChange={handleChange}
            >
              <MenuItem value="Good">Good</MenuItem>
              <MenuItem value="Poor">Poor</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              id="smoking"
              label="Smoking"
              name="smoking"
              autoComplete="smoking"
              value={formData.smoking}
              onChange={handleChange}
            >
              <MenuItem value="No">No</MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              id="alcohol"
              label="Alcohol Consumption"
              name="alcohol"
              autoComplete="alcohol"
              value={formData.alcohol}
              onChange={handleChange}
            >
              <MenuItem value="No">No</MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Get Report
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Health Report</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ whiteSpace: 'pre-line' }}>
            {report}
          </DialogContentText>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Accuracy: {accuracy}%
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/appointment')}
          >
            Contact Doctor
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default KYS;