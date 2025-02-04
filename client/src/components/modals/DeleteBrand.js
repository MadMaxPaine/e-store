import React, { useState, useEffect } from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  Divider,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { deleteBrand, fetchBrands } from "../../http/deviceAPI";
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

export const DeleteBrand = observer(({ show, onHide }) => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  
  useEffect(() => {
    if (show) {
      fetchBrands().then((data) => setBrands(data));
    }
  }, [show]);

  const removeBrand = async () => {
    if (selectedBrand) {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete the brand "${selectedBrand}"?`
      );
      if (!confirmDelete) return;

      try {
        await deleteBrand({ name: selectedBrand });
        alert("Brand deleted successfully!");

        
        const updatedBrands = await fetchBrands();
        setBrands(updatedBrands);

        setSelectedBrand(""); 
        onHide(); 
      } catch (error) {
        console.error("Error deleting brand:", error);
        alert("Failed to delete the brand. Please try again.");
      }
    } else {
      alert("Choose a brand!");
    }
  };

  return (
    <Modal
      aria-labelledby="delete-brand-modal"
      aria-describedby="delete-brand-description"
      open={show}
      onClose={onHide}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={show}>
        <Box sx={style}>
          <Typography
            id="delete-brand-modal"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            Delete Brand
          </Typography>
          <Divider sx={{ my: 1 }} />

          <InputLabel id="brand-select-label">Select Brand</InputLabel>
          <Select
            labelId="brand-select-label"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            fullWidth
          >
            {brands.map((brand) => (
              <MenuItem value={brand.name} key={brand.id}>
                {brand.name}
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
              onClick={removeBrand}
              disabled={!selectedBrand}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
});
