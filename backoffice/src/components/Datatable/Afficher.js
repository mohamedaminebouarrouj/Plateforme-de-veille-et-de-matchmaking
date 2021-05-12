import DataTable from 'react-data-table-component';
import React, { Component } from 'react';

const data = [{ id: 1, title: 'Conan the Barbarian', year: '1980' },
    { id: 1, title: 'Conan the Barbarian', year: '1985' },
    { id: 1, title: 'Conan the Barbarian', year: '1981' },
    { id: 1, title: 'Conan the Barbarian', year: '1989' },
    { id: 1, title: 'Conan the Barbarian', year: '1982' }];
const columns = [
    {
        name: 'Title',
        selector: 'title',
        sortable: true,
    },
    {
        name: 'Year',
        selector: 'year',
        sortable: true,
        right: true,
    },
];

export default  class AfficherDataTable extends Component {
    render() {
        return (
            <DataTable
                title="Arnold Movies"
                columns={columns}
                data={data}
            />
        )
    }
};