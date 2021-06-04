import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Checkbox, FormControlLabel, makeStyles, TextField, Typography } from '@material-ui/core';

FiltersByService.propTypes = {
    onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        borderTop: `1px solid ${theme.palette.grey[300]}`
    },
    range: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        '& > span': {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        }
    }
}))

function FiltersByService({ onChange, filters = {} }) {
    const classes = useStyles()
    const [values, setValues] = useState({
        isPromotion: Boolean(filters.isPromotion),
        isFreeShip: Boolean(filters.isFreeShip)
    })

    const handleChange = (e) => {
        if (!onChange) return
        const { name, checked } = e.target
        onChange({ [name]: checked })
    }


    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">Dịch vụ</Typography>
            <ul>
                {['isPromotion', 'isFreeShip'].map(service => (
                    <li key={service}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={values[service]}
                                    onChange={handleChange}
                                    name={service}
                                    color="primary"
                                />
                            }
                            label="Primary"
                        />
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FiltersByService;