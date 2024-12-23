import React from "react";
import { render } from "react-dom";
import {
  Button,
  Checkbox,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell
} from "carbon-components-react";
import Status from "./status";

import "./styles.scss";

const headerData = [
  { header: "Queue manager name", key: "qm" },
  { header: "Version", key: "version" },
  { header: "Status", key: "status" }
];

let rowData = [
  { id: "1", qm: "qm1", version: "9.1.5", status: "Starting" },
  { id: "2", qm: "qm2", version: "9.1.1", status: "Running" },
  { id: "3", qm: "qm3", version: "9.1.4", status: "Retrying" },
  { id: "4", qm: "qm4", version: "9.1.3", status: "Stopping" },
  { id: "5", qm: "qm5", version: "9.1.0", status: "Stopped" },
  { id: "6", qm: "qm6", version: "9.1.2", status: "Unavailable" }
];

const statuses = [
  "Starting",
  "Running",
  "Retrying",
  "Stopping",
  "Stopped",
  "Unavailable"
];

const refreshData = rowId => {
  const tempData = [];
  rowData.forEach((row, index) => {
    if ((rowId && row.id === rowId) || (!rowId && Math.random() < 0.25)) {
      tempData[index] = Object.assign({}, row, {
        status: statuses[(statuses.indexOf(row.status) + 1) % statuses.length]
      });
    } else {
      tempData[index] = rowData[index];
    }
  });
  rowData = tempData;
  appRef.current.setState({});
};

const appRef = React.createRef();

class StatusTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animated: true
    };
  }

  render = () => (
    <div className="main">
      <div className="top">
        <Checkbox
          id="animate-checkbox"
          defaultChecked
          labelText="Animated"
          onChange={checked => {
            this.setState({ animated: checked });
          }}
        />
        <Button
          onClick={() => {
            refreshData();
          }}
        >
          Update random statuses
        </Button>
      </div>

      <DataTable
        rows={rowData}
        headers={headerData}
        isSortable
        render={({ rows, headers, getHeaderProps }) => (
          <TableContainer title="Status Table">
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map(header => (
                    <TableHeader
                      {...getHeaderProps({
                        header,
                        onClick: () => {}
                      })}
                    >
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow
                    key={row.id}
                    onClick={() => {
                      refreshData(row.id);
                    }}
                  >
                    {row.cells.map(cell => (
                      <TableCell key={cell.id}>
                        {cell.info.header === "status" ? (
                          <Status
                            animated={this.state.animated} // If true the status icon will animate with a 'ping' when the status changes from its initial value. Does not animate for the intitial status.
                            key={cell.id + ":status-icon"} // Identifies this status component as belonging to this cell in this row.
                            status={cell.value}
                          />
                        ) : (
                          cell.value
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      />
    </div>
  );
}

render(<App ref={appRef} />, document.getElementById("root"));
