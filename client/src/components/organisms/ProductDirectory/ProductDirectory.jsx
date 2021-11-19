import { createUseStyles, useTheme } from "react-jss";
import { RiSeedlingLine } from "react-icons/ri";
import { BiChip, BiAtom } from "react-icons/bi";

import ProductCategoryCard from "../../molecules/cards/ProductCategoryCard/ProductCategoryCard";

function ProductDirectory() {
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <h1 className={classes.title}>Productos</h1>
      </header>
      <div className={classes.productList}>
        <ProductCategoryCard 
          categoryName="Cultivos" 
          Icon={({ className, color }) => <RiSeedlingLine className={className} color={color} />} 
          data={null} 
          isEnable
        />
        <ProductCategoryCard 
          categoryName="Tecnologías" 
          Icon={({ className, color }) => <BiChip className={className} color={color} />} 
          data={null} 
        />
        <ProductCategoryCard 
          categoryName="Características tecnológicas" 
          Icon={({ className, color }) => <BiAtom className={className} color={color} />} 
          data={null} 
        />
      </div>
    </div>
  )
}

export default ProductDirectory;

const useStyles = createUseStyles({
  root: {
    flex: 1,
    display: "flex",
    flexFlow: "column nowrap",
    padding: "10px 20px",
  },
  
  header: {
    display: "flex",
    marginBottom: 10,
  },
  
  title: ({ theme }) => ({
    fontWeight: 700,
    letterSpacing: 1,
    color: theme.colors.bodyText.base
  }),

  productList: {
    display: "grid",
    grid: {
      templateRows: "repeat(3, minmax(10px, 120px))",
      gap: 20,
    },
  },
  
  divider: {
    width: "100%",
    borderBottom: {
      style: "solid",
      width: 1,
      color: "#7A7A7A",
    }
  },
});