import React from 'react';
import {Button, CardBody, Table} from 'reactstrap';

export default class TableHover extends React.Component {
  render() {
    return (
      <Table hover className="mb-0">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom du Thèmes</th>
            <th>Description</th>
            <th>Nombre de secteurs affectés</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Industries agro-alimentaires</td>
            <td>Le secteur  Industries agro-alimentaires compte 1 081 entreprises employant 10 personnes et plus. Parmi elles 211 produisent totalement pour l’exportation. </td>
            <td><center>3</center></td>
            <td>
              <Button outline className="mb-2 mr-2 btn-transition" color="info">Modifier</Button>
            </td>
            <td>
              <Button outline className="mb-2 mr-2 btn-transition" color="danger">Supprimer</Button>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Industries chimiques</td>
            <td>Le secteur  Industries chimiques compte 562 entreprises employant 10 personnes et plus. Parmi elles 140 produisent totalement pour l’exportation. </td>
            <td><center>2</center></td>
            <td>
              <Button outline className="mb-2 mr-2 btn-transition" color="info">Modifier</Button>
            </td>
            <td>
              <Button outline className="mb-2 mr-2 btn-transition" color="danger">Supprimer</Button>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Industries textiles et habillement</td>
            <td>Le secteur  Industries textiles et habillement compte 1 582 entreprises employant 10 personnes et plus. Parmi elles 1 294 produisent totalement pour l’exportation. </td>
            <td><center>0</center></td>
            <td>
              <Button outline className="mb-2 mr-2 btn-transition" color="info">Modifier</Button>
            </td>
            <td>
              <Button outline className="mb-2 mr-2 btn-transition" color="danger">Supprimer</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
}
