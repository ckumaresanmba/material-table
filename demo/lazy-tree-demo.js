import { Grid, MuiThemeProvider, Button } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from '../src';
import Typography from "@material-ui/core/Typography";

class App extends React.Component {
  constructor(){
    super();
    this.state={
      data: [
        {
          id: 1,
          name: 'a',
          surname: 'Baran',
          birthYear: 1987,
          birthCity: 63,
          sex: 'Male',
          type: 'adult',
          isParent: true
        },
        {
          id: 2,
          name: 'b',
          surname: 'Baran',
          birthYear: 1987,
          birthCity: 34,
          sex: 'Female',
          type: 'adult',
          isParent: true
        },
        
      ]
    }
  }

  onTreeExpandChange = (row, isExpanded) => {
    const data = [
      {
        id: 3,
        name: 'c',
        surname: 'Baran',
        birthYear: 1987,
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        parentId: 1,
        isParent: true
      },
      {
        id: 4,
        name: 'd',
        surname: 'Baran',
        birthYear: 1987,
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        parentId: 3,
        isParent: true
      },
      {
        id: 5,
        name: 'e',
        surname: 'Baran',
        birthYear: 1987,
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        parentId: 4,
        isParent: true
      },
      {
        id: 6,
        name: 'f',
        surname: 'Baran',
        birthYear: 1987,
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        parentId: 5,
      }];
      if(isExpanded){
        setTimeout(() => {
          this.setState({data: [...this.state.data, ...data.filter(d=>d.parentId === row.id )]})
        },1000);
      }

  }

  render() {
    return (
      <MaterialTable
        title="Basic Tree Data Preview"
        data={this.state.data}
        columns={[
          { title: 'Adı', field: 'name' },
          { title: 'Soyadı', field: 'surname' },
          { title: 'Cinsiyet', field: 'sex' },
          { title: 'Tipi', field: 'type', removable: false },
          { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
          {
            title: 'Doğum Yeri',
            field: 'birthCity',
            lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
          },
        ]}
        parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
        lazyParent = {(row) => row.isParent}
        options={{
          selection: true,
          filtering:true,
          sorting:true
        }}
        onTreeExpandChange = {this.onTreeExpandChange}
      />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();
