import SpicyDataTable from "spicy-datatable";
import "./DataTable";

export default class DataTable extends Components {
  render() {
    return (
      <SpicyDataTable
        tableKey={this.props.tableKey}
        columns={this.props.columns}
        rows={this.props.data}
      />
    );
  }
}
