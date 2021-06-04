import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import FiltersByCategory from './Filters/FiltersByCategory';
import FiltersByPrice from './Filters/FiltersByPrice';
import FiltersByService from './Filters/FiltersByService';

ProductFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func,
};

function ProductFilters(props) {
    const { filters, onChange } = props
    const handleCategoryChange = (newCategoryId) => {
        if (!onChange) return
        const newFilters = {
            ...filters,
            "category.id": newCategoryId
        }
        onChange(newFilters)
    }

    const handleChange = (values) => {
        if(onChange) onChange(values)
    }
    return (
        <Box>
            <FiltersByCategory onChange={handleCategoryChange} />
            <FiltersByPrice onChange={handleChange}/>
            <FiltersByService filters={filters} onChange={handleChange}/>
        </Box>
    );
}

export default ProductFilters;