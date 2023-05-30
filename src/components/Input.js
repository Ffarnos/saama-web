import * as React from "react"
import {TextField} from "@mui/material";


const Input = ({valor, onChange}) => {
    return (
        <input type="text" value={valor} onChange={handleChange} />
    );
};




export default Input;