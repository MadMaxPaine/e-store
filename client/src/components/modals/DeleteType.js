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
import { deleteType, fetchTypes } from "../../http/deviceAPI";
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

export const DeleteType = observer(({ show, onHide }) => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

 
  useEffect(() => {
    if (show) {
      fetchTypes().then((data) => setTypes(data));
    }
  }, [show]);

  const removeType = async () => {
    if (selectedType) {
      const confirmDelete = window.confirm(`Are you sure you want to delete the type "${selectedType}"?`);
      if (!confirmDelete) return;

      try {
        await deleteType({ name: selectedType });
        alert("Type deleted successfully!");

        
        const updatedTypes = await fetchTypes();
        setTypes(updatedTypes);

        setSelectedType(""); 
        onHide(); 
      } catch (error) {
        console.error("Error deleting type:", error);
        alert("Failed to delete the type. Please try again.");
      }
    } else {
      alert("Choose a type!");
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
          <Typography id="transition-modal-title" variant="h6" component="h2" textAlign="center">
            Delete Type
          </Typography>
          <Divider sx={{ my: 1 }} />

          <InputLabel id="type-select-label">Select Type</InputLabel>
          <Select
            labelId="type-select-label"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            fullWidth
          >
            {types.map((type) => (
              <MenuItem value={type.name} key={type.id}>
                {type.name}
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
              onClick={removeType}
              disabled={!selectedType}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
});
