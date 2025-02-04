import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import {
  deleteDevice,
  /*fetchDevices,*/ fetchDevicesAll,
} from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  maxWidth: "100%",
  borderRadius: "8px",
};

export const DeleteDevice = observer(({ show, onHide }) => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");

  useEffect(() => {
    if (show) {
      fetchDevicesAll().then((data) => setDevices(data.rows));
    }
  }, [show]);

  const removeDevice = async () => {
    if (selectedDevice) {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete the device "${selectedDevice.name}"?`
      );
      if (!confirmDelete) return;

      try {
        await deleteDevice({ name: selectedDevice.name });
        alert("Device deleted successfully!");

        const updatedDevices = await fetchDevicesAll();
        setDevices(updatedDevices.rows);

        setSelectedDevice("");
        onHide();
      } catch (error) {
        console.error("Error deleting device:", error);
        alert("Failed to delete the device. Please try again.");
      }
    } else {
      alert("Choose a device!");
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={show}
      onClose={onHide}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={show}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            Delete Device
          </Typography>
          <Divider sx={{ my: 1 }} />

          <InputLabel id="device-select-label">Select Device</InputLabel>
          <Select
            labelId="device-select-label"
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
            fullWidth
          >
            {devices.map((device) => (
              <MenuItem value={device} key={device.id}>
                {device.name}
              </MenuItem>
            ))}
          </Select>

          <Divider sx={{ my: 1 }} />

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={onHide}>
              Close
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={removeDevice}
              disabled={!selectedDevice}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
});
