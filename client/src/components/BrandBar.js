import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { ctx } from "../index";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

export const BrandBar = observer(({ onChange }) => {
  const { device } = useContext(ctx);
  const [brand, setBrand] = React.useState("");
  const handleChange = (event) => {
    const selectedBrand = event.target.value;
    setBrand(selectedBrand);
    device.setSelectedBrand(
      device.brands.find((b) => b.name === selectedBrand)
    ); // Оновлення MobX store
    if (onChange) onChange(selectedBrand); 
  };
  return (
    <Box
      sx={{
        minWidth: 200,
        maxWidth: "100%",
        mt: 1,
        textOverflow: "ellipsis",
        bgcolor: "background.paper",
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="brand-simple-select">Brands</InputLabel>
        <Select
          labelId="brand-simple-select"
          id="brand-simple-select"
          label="Brands"
          value={brand}
          sx={{ overflow: "hidden", textOverflow: "ellipsis", mr: 1 }}
          onChange={handleChange}
        >
          {device.brands.map((brand) => (
            <MenuItem
              value={brand.name}
              key={brand.id}
              onClick={() => device.setSelectedBrand(brand)}
            >
              {brand.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
});
