import React from "react";
import { Grid, TextField, IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Input({
    half,
    name,
    handleChange,
    label,
    autoFocus,
    type,
    handleShowPassword,
}) {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                InputProps={
                    name === "password"
                        ? {
                              endAdornment: (
                                  <InputAdornment position="end">
                                      <IconButton onClick={handleShowPassword}>
                                          {type === "password" ? (
                                              <VisibilityOffIcon />
                                          ) : (
                                              <VisibilityIcon />
                                          )}
                                      </IconButton>
                                  </InputAdornment>
                              ),
                          }
                        : {}
                }
            />
        </Grid>
    );
}

export default Input;
