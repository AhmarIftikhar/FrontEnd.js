// component
import SvgColor from "../../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "product",
    path: "/dashboard/product",
    icon: icon("ic_cart"),
  },
  {
    title: "tabledata",
    path: "/dashboard/tableData",
    icon: icon("ic_user"),
  },
  {
    title: "createtabledata",
    path: "/dashboard/createTableData",
    icon: icon("ic_blog"),
  },
];

export default navConfig;
