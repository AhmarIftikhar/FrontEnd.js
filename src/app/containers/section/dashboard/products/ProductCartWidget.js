// @mui
import { styled } from "@mui/material/styles";
import { Badge } from "@mui/material";
// component
import Iconify from "../../../../components/iconify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: "flex",
  cursor: "pointer",
  position: "fixed",
  alignItems: "center",
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create("opacity"),
  "&:hover": { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function CartWidget() {
  const cart = useSelector((state) => state.products.cart);

  // Get the cart count from the cart array's length
  const cartCount = cart.length;

  return (
    <Link to="/dashboard/cart" className="nav-link">
      <StyledRoot>
        <Badge showZero badgeContent={cartCount} color="error" max={99}>
          <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
        </Badge>
      </StyledRoot>
    </Link>
  );
}
