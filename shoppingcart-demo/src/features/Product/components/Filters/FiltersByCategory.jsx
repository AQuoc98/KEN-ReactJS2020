import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import categoryApi from '../../../../api/categoryApi';

FiltersByCategory.propTypes = {
    onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding:theme.spacing(2)
    },
    menu: {
        padding:0,
        margin:0,
        listStyleType:'none',
        '& > li': {
            marginTop:theme.spacing(1),
            transition:"all .25s",
            '&:hover': {
                cursor:'pointer',
                color:theme.palette.primary.main
            }
        }
    }
}))

function FiltersByCategory(props) {
    const { onChange } = props
    const [categoryList, setCategoryList] = useState([])
    const classes = useStyles()

    useEffect(() => {
        (async () => {
            try {
                const list = await categoryApi.getAll()
                setCategoryList(list.map(x => ({
                    id: x.id,
                    name: x.name
                })))
            } catch (error) {
                console.log("failed to fetch")
            }
        })()
    }, [])


    const handleCategoryClick = (category) => {
        if (onChange) {
            onChange(category.id)
        }
    }

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">Danh mục sản phẩm</Typography>
            <ul className={classes.menu}>
                {categoryList.map(category => (
                    <li key={category.id} onClick={() => handleCategoryClick(category)}>
                        <Typography variant="body2">
                            {category.name}
                        </Typography>
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FiltersByCategory;