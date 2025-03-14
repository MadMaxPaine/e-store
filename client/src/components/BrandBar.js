import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { ctx } from "../store/context";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

export const BrandBar = observer(({ onChange }) => {
  const { device } = useContext(ctx);
  const [brand, setBrand] = React.useState("");  // Переконайтесь, що значення початково порожнє

  const handleChange = (event) => {
    const selectedBrand = event.target.value;
    setBrand(selectedBrand);
    device.setSelectedBrand(
      device.brands.find((b) => b.name === selectedBrand)
    );
    if (onChange) onChange(selectedBrand);
  };

  return (
    <Box
      sx={{
        minWidth: 200,
        maxWidth: "100%",
        mt: 1,
        textOverflow: "ellipsis",
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="brand-simple-select-label">Brands</InputLabel>
        <Select
          labelId="brand-simple-select-label" // Вказуємо правильний labelId
          id="brand-simple-select"
          name="brand" // Підтримка автозаповнення
          value={brand} // Контрольоване значення
          label="Brands"  // Мітка для поля
          onChange={handleChange}
        >
          {device.brands.map((brand) => (
            <MenuItem value={brand.name} key={brand.id}>
              {brand.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
});
